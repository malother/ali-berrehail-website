$ErrorActionPreference = "Stop"

$baseUrl = "https://ali-berrehail-website.vercel.app"

$tests = @(
    @{ Name = "Homepage"; Uri = "$baseUrl/" },
    @{ Name = "Config API (GET)"; Uri = "$baseUrl/api/config" },
    @{ Name = "Hero Video"; Uri = "$baseUrl/Mol/hero-background.mp4" },
    @{ Name = "CSS Asset"; Uri = "$baseUrl/assets/index-D6aLmP8U.css" },
    @{ Name = "JS Asset"; Uri = "$baseUrl/assets/index-C9XRbpTD.js" },
    @{ Name = "UniverseCanvas JS"; Uri = "$baseUrl/assets/UniverseCanvas-Dgtu-mK3.js" },
    @{ Name = "Favicon"; Uri = "$baseUrl/favicon.svg" },
    @{ Name = "Icons SVG"; Uri = "$baseUrl/icons.svg" },
    @{ Name = "OG Cover"; Uri = "$baseUrl/assets/og-cover.svg" }
)

Write-Host "=== Static File & API Tests ==="
foreach ($t in $tests) {
    try {
        $r = Invoke-WebRequest -Uri $t.Uri -Method GET -UseBasicParsing -TimeoutSec 30 -MaximumRedirection 5
        Write-Host "PASS  $($t.Name): $($r.StatusCode) - $($r.RawContentLength) bytes"
    } catch {
        $err = $_.Exception
        if ($err.Response) {
            $status = $err.Response.StatusCode.value__
            Write-Host "FAIL  $($t.Name): $status"
        } else {
            Write-Host "ERROR $($t.Name): $($err.Message)"
        }
    }
}

Write-Host ""
Write-Host "=== Sensitive Files Exposure Tests ==="
$sensitive = @(
    @{ Name = "config.json"; Uri = "$baseUrl/config.json" },
    @{ Name = "opencode.json"; Uri = "$baseUrl/opencode.json" },
    @{ Name = "server.ps1"; Uri = "$baseUrl/server.ps1" },
    @{ Name = "start.bat"; Uri = "$baseUrl/start.bat" },
    @{ Name = "run_server.cmd"; Uri = "$baseUrl/run_server.cmd" }
)

foreach ($t in $sensitive) {
    try {
        $r = Invoke-WebRequest -Uri $t.Uri -Method GET -UseBasicParsing -TimeoutSec 10 -MaximumRedirection 0
        Write-Host "WARN  $($t.Name): Exposed (status $($r.StatusCode))"
    } catch {
        $err = $_.Exception
        if ($err.Response) {
            $status = $err.Response.StatusCode.value__
            if ($status -eq 404) {
                Write-Host "PASS  $($t.Name): Not accessible ($status)"
            } else {
                Write-Host "WARN  $($t.Name): status $status"
            }
        } else {
            Write-Host "ERROR $($t.Name): $($err.Message)"
        }
    }
}

Write-Host ""
Write-Host "=== API POST Tests ==="

try {
    $payload = @{
        name = "Test User"
        email = "test@example.com"
        company = "TestCo"
        category = "olive-oil"
        message = "This is a test message for contact form."
        lang = "en"
        ts = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    } | ConvertTo-Json -Compress

    $r = Invoke-WebRequest -Uri "$baseUrl/api/contact" -Method POST -UseBasicParsing -TimeoutSec 30 `
        -ContentType "application/json" -Body $payload
    Write-Host "PASS  Contact API POST: $($r.StatusCode) - $($r.Content)"
} catch {
    $err = $_.Exception
    if ($err.Response) {
        $status = $err.Response.StatusCode.value__
        $body = ""
        try { $body = (Get-Content -Raw -Stream $err.Response.GetResponseStream()).Substring(0, 200) } catch {}
        Write-Host "FAIL  Contact API POST: $status - $body"
    } else {
        Write-Host "ERROR Contact API POST: $($err.Message)"
    }
}

try {
    $payload = @{
        company = "TestCo"
        name = "Test User"
        email = "test@example.com"
        phone = "+213 555 23 11 19"
        quantity = "25kg"
        inquiryType = "wholesale"
        categories = @("olive-oil", "dates", "coffee")
        message = "Test wholesale inquiry."
        lang = "en"
        ts = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    } | ConvertTo-Json -Compress

    $r = Invoke-WebRequest -Uri "$baseUrl/api/wholesale" -Method POST -UseBasicParsing -TimeoutSec 30 `
        -ContentType "application/json" -Body $payload
    Write-Host "PASS  Wholesale API POST: $($r.StatusCode) - $($r.Content)"
} catch {
    $err = $_.Exception
    if ($err.Response) {
        $status = $err.Response.StatusCode.value__
        $body = ""
        try { $body = (Get-Content -Raw -Stream $err.Response.GetResponseStream()).Substring(0, 200) } catch {}
        Write-Host "FAIL  Wholesale API POST: $status - $body"
    } else {
        Write-Host "ERROR Wholesale API POST: $($err.Message)"
    }
}
