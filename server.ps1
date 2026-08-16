# ============================================================
#  Berrehail Oswalt - Website Server (PowerShell, no installs)
#  Run: double-click start.bat  ->  open http://localhost:8080
# ============================================================

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
if (-not $root) { $root = Split-Path -Parent $MyInvocation.MyCommand.Path }
$publicDir = Join-Path $root 'public'
$dataDir   = Join-Path $root 'data'
$messagesFile = Join-Path $dataDir 'messages.json'
$configFile = Join-Path $root 'config.json'

# ---------- config ----------
$cfg = @{
    port = 8080
    brand = 'Ali Berrehail'
    brandTag = 'B2B · Food Sourcing'
    owner = 'Ali Berrehail'
    siteEmail = 'a.ecommerce@outlook.fr'
    whatsappNumber = '213555231119'
    whatsappDisplay = '+213 555 23 11 19'
    directPhone = '+213 664 58 28 45'
    registrationId = '109404******6109'
    location = 'Algeria'
    adminKey = 'admin2026'
}
if (Test-Path $configFile) {
    try {
        $user = Get-Content $configFile -Raw -Encoding UTF8 | ConvertFrom-Json
        if ($user) {
            foreach ($k in @($cfg.Keys)) {
                $v = $user.PSObject.Properties[$k]
                if ($v -and $null -ne $v.Value) { $cfg[$k] = $v.Value }
            }
        }
    } catch { Write-Host "[warn] config.json could not be read: $($_.Exception.Message)" }
}

if (-not (Test-Path $dataDir)) { New-Item -ItemType Directory -Path $dataDir | Out-Null }
if (-not (Test-Path $messagesFile)) { [System.IO.File]::WriteAllText($messagesFile, '[]', (New-Object System.Text.UTF8Encoding($false))) }

# ---------- helpers ----------
function Read-CrlfLine([System.IO.Stream]$s) {
    $sb = New-Object System.Text.StringBuilder
    while ($true) {
        $b = $s.ReadByte()
        if ($b -lt 0) { break }
        if ($b -eq 10) { break }
        if ($b -ne 13) { [void]$sb.Append([char]$b) }
    }
    return $sb.ToString()
}

function Send-Response([System.IO.Stream]$s, $code, $contentType, $bytes) {
    $reason = 'OK'
    if ($code -eq 404) { $reason = 'Not Found' }
    elseif ($code -eq 405) { $reason = 'Method Not Allowed' }
    elseif ($code -eq 403) { $reason = 'Forbidden' }
    elseif ($code -eq 400) { $reason = 'Bad Request' }
    $head = "HTTP/1.1 $code $reason`r`nContent-Type: $contentType`r`nContent-Length: $($bytes.Length)`r`nCache-Control: no-cache`r`nConnection: close`r`n`r`n"
    $hb = [System.Text.Encoding]::ASCII.GetBytes($head)
    $s.Write($hb, 0, $hb.Length)
    $s.Write($bytes, 0, $bytes.Length)
    $s.Flush()
}

function Get-Mime($path) {
    $ext = [System.IO.Path]::GetExtension($path).ToLower()
    switch ($ext) {
        '.html' { 'text/html; charset=utf-8' }
        '.css'  { 'text/css; charset=utf-8' }
        '.js'   { 'application/javascript; charset=utf-8' }
        '.json' { 'application/json; charset=utf-8' }
        '.svg'  { 'image/svg+xml' }
        '.png'  { 'image/png' }
        '.jpg'  { 'image/jpeg' }
        '.jpeg' { 'image/jpeg' }
        '.gif'  { 'image/gif' }
        '.webp' { 'image/webp' }
        '.mp4'  { 'video/mp4' }
        '.ico'  { 'image/x-icon' }
        '.woff2'{ 'font/woff2' }
        '.woff' { 'font/woff' }
        '.ttf'  { 'font/ttf' }
        '.txt'  { 'text/plain; charset=utf-8' }
        '.pdf'  { 'application/pdf' }
        default { 'application/octet-stream' }
    }
}

function Read-Body([System.IO.Stream]$s, $contentLength) {
    if (-not $contentLength -or $contentLength -le 0) { return '' }
    $buf = New-Object byte[] $contentLength
    $read = 0
    while ($read -lt $contentLength) {
        $n = $s.Read($buf, $read, $contentLength - $read)
        if ($n -le 0) { break }
        $read += $n
    }
    return [System.Text.Encoding]::UTF8.GetString($buf, 0, $read)
}

function Get-Query($rawQuery) {
    $q = @{}
    if (-not $rawQuery) { return $q }
    foreach ($pair in $rawQuery.Split('&')) {
        if ($pair -eq '') { continue }
        $kv = $pair.Split('=', 2)
        if ($kv.Count -eq 2) {
            $q[[System.Uri]::UnescapeDataString($kv[0])] = [System.Uri]::UnescapeDataString($kv[1])
        }
    }
    return $q
}

# ---------- server ----------
$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, [int]$cfg.port)
$listener.Start()

Write-Host ''
Write-Host '======================================================'
Write-Host "  $($cfg.brand) - Website is running"
Write-Host "  Open in browser:  http://localhost:$($cfg.port)"
Write-Host '  Stop:  close this window or press Ctrl+C'
Write-Host '  Edit site settings in:  config.json'
Write-Host "  Messages saved in:  data\messages.json"
Write-Host '======================================================'
Write-Host ''

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        try {
            $stream = $client.GetStream()
            $requestLine = Read-CrlfLine $stream
            if (-not $requestLine) { $client.Close(); continue }

            $parts = $requestLine.Split(' ')
            $method = $parts[0]
            $target = $parts[1]

            $headers = @{}
            while ($true) {
                $h = Read-CrlfLine $stream
                if ($h -eq '') { break }
                $idx = $h.IndexOf(':')
                if ($idx -gt 0) { $headers[$h.Substring(0, $idx).Trim()] = $h.Substring($idx + 1).Trim() }
            }

            $pathPart = $target
            $queryPart = $null
            $qIdx = $target.IndexOf('?')
            if ($qIdx -ge 0) { $pathPart = $target.Substring(0, $qIdx); $queryPart = $target.Substring($qIdx + 1) }
            $pathPart = [System.Uri]::UnescapeDataString($pathPart)

            # ---------- API: GET /api/config ----------
            if ($pathPart -eq '/api/config' -and $method -eq 'GET') {
                $json = @{
                    brand = $cfg.brand
                    brandTag = $cfg.brandTag
                    owner = $cfg.owner
                    siteEmail = $cfg.siteEmail
                    whatsappNumber = $cfg.whatsappNumber
                    whatsappDisplay = $cfg.whatsappDisplay
                    directPhone = $cfg.directPhone
                    registrationId = $cfg.registrationId
                    location = $cfg.location
                } | ConvertTo-Json -Compress
                Send-Response $stream 200 'application/json; charset=utf-8' ([System.Text.Encoding]::UTF8.GetBytes($json))
                $client.Close()
                continue
            }

            # ---------- API: GET /api/messages ----------
            if ($pathPart -eq '/api/messages' -and $method -eq 'GET') {
                $q = Get-Query $queryPart
                if ($q['key'] -ne $cfg.adminKey) {
                    $err = '{"ok":false,"error":"Forbidden"}'
                    Send-Response $stream 403 'application/json; charset=utf-8' ([System.Text.Encoding]::UTF8.GetBytes($err))
                } else {
                    if (-not (Test-Path $messagesFile)) { [System.IO.File]::WriteAllText($messagesFile, '[]', (New-Object System.Text.UTF8Encoding($false))) }
                    $data = [System.IO.File]::ReadAllBytes($messagesFile)
                    Send-Response $stream 200 'application/json; charset=utf-8' $data
                }
                $client.Close()
                continue
            }

            # ---------- API: POST /api/contact | /api/quote | /api/wholesale ----------
            if (($pathPart -eq '/api/contact' -or $pathPart -eq '/api/quote' -or $pathPart -eq '/api/wholesale') -and $method -eq 'POST') {
                $type = switch ($pathPart) {
                    '/api/contact' { 'contact' }
                    '/api/quote' { 'quote' }
                    '/api/wholesale' { 'wholesale' }
                }
                $len = 0
                if ($headers.ContainsKey('Content-Length')) { $len = [int]$headers['Content-Length'] }
                $body = Read-Body $stream $len
                $ok = $false
                try {
                    $obj = $body | ConvertFrom-Json
                    if ($obj) {
                        if (-not (Test-Path $messagesFile)) { [System.IO.File]::WriteAllText($messagesFile, '[]', (New-Object System.Text.UTF8Encoding($false))) }
                        $record = [ordered]@{
                            type = $type
                            timestamp = (Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
                            data = $obj
                        }
                        $existing = Get-Content $messagesFile -Raw -Encoding UTF8 | ConvertFrom-Json
                        if (-not $existing) { $existing = @() }
                        $list = @($existing) + $record
                        $out = $list | ConvertTo-Json -Depth 8
                        $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
                        [System.IO.File]::WriteAllText($messagesFile, $out, $utf8NoBom)
                        $ok = $true
                    }
                } catch { $ok = $false }
                if ($ok) {
                    $resp = '{"ok":true,"message":"Received. You will be contacted shortly."}'
                    Send-Response $stream 200 'application/json; charset=utf-8' ([System.Text.Encoding]::UTF8.GetBytes($resp))
                    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] New $type inquiry received -> data\messages.json"
                } else {
                    $resp = '{"ok":false,"error":"Invalid payload"}'
                    Send-Response $stream 400 'application/json; charset=utf-8' ([System.Text.Encoding]::UTF8.GetBytes($resp))
                }
                $client.Close()
                continue
            }

            # ---------- static files ----------
            if ($method -ne 'GET' -and $method -ne 'HEAD') {
                $resp = '{"ok":false,"error":"Method not allowed"}'
                Send-Response $stream 405 'application/json; charset=utf-8' ([System.Text.Encoding]::UTF8.GetBytes($resp))
                $client.Close()
                continue
            }

            $rel = $pathPart.TrimStart('/')
            if ($rel -eq '') { $rel = 'index.html' }
            $file = Join-Path $publicDir $rel
            $full = [System.IO.Path]::GetFullPath($file)
            if (-not $full.StartsWith([System.IO.Path]::GetFullPath($publicDir))) {
                Send-Response $stream 403 'text/plain; charset=utf-8' ([System.Text.Encoding]::UTF8.GetBytes('Forbidden'))
                $client.Close()
                continue
            }
            if (Test-Path $full -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($full)
                Send-Response $stream 200 (Get-Mime $full) $bytes
            } else {
                $nf = '<html><body style="background:#0a0a0a;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0"><div><h1>404</h1><p>Page not found. <a href="/" style="color:#F0E05C">Back to home</a></p></div></body></html>'
                Send-Response $stream 404 'text/html; charset=utf-8' ([System.Text.Encoding]::UTF8.GetBytes($nf))
            }
            $client.Close()
        } catch {
            try { $client.Close() } catch {}
        }
    }
} finally {
    $listener.Stop()
}