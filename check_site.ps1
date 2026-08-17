$ErrorActionPreference = "Stop"

# Use the DIRECT deployment URL first (not the alias)
$baseUrl = "https://ali-berrehail-website-j8m5qb0sx-allaedine501-3303s-projects.vercel.app"

$tests = @(
    @{ Name = "Homepage"; Uri = "$baseUrl/" },
    @{ Name = "Config API (GET)"; Uri = "$baseUrl/api/config" },
    @{ Name = "Hero Video"; Uri = "$baseUrl/Mol/hero-background.mp4" },
    @{ Name = "CSS Asset"; Uri = "$baseUrl/assets/index-CxjI7lmv.css" },
    @{ Name = "JS Asset"; Uri = "$baseUrl/assets/index-C9XRbpTD.js" },
    @{ Name = "UniverseCanvas JS"; Uri = "$baseUrl/assets/UniverseCanvas-Dgtu-mK3.js" },
    @{ Name = "Favicon"; Uri = "$baseUrl/favicon.svg" },
    @{ Name = "Icons SVG"; Uri = "$baseUrl/icons.svg" },
    @{ Name = "OG Cover"; Uri = "$baseUrl/assets/og-cover.svg" }
)

Write-Host "=== Static File & API Tests (Direct Deployment URL) ==="
Write-Host "Base: $baseUrl"
Write-Host ""

foreach ($t in $tests) {
    try {
        $r = Invoke-WebRequest -Uri $t.Uri -Method GET -UseBasicParsing -TimeoutSec 30 -MaximumRedirection 0
        Write-Host "PASS  $($t.Name): $($r.StatusCode) - $($r.RawContentLength) bytes"
        if ($t.Name -eq "Config API (GET)") {
            Write-Host "      Body: $($r.Content)"
        }
    } catch {
        $err = $_.Exception
        if ($err.Response) {
            $status = $err.Response.StatusCode.value__
            Write-Host "FAIL  $($t.Name): $status"
            if ($t.Name -eq "Config API (GET)" -and $status -eq 405) {
                Write-Host "      Expected 405 (API expects POST only or GET works) - checking..."
            }
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
    @{ Name = "run_server.cmd"; Uri = "$baseUrl/run_server.cmd" },
    @{ Name = "data/messages.json"; Uri = "$baseUrl/data/messages.json" }
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
    Write-Host "      Headers:" ($r.Headers | Where-Object { $_ -like "X-Admin-Key*" }) -join ", "
} catch {
    $err = $_.Exception
    if ($err.Response) {
        $status = $err.Response.StatusCode.value__
        $body = ""
        try { $sr = New-Object System.IO.StreamReader($err.Response.GetResponseStream()); $body = $sr.ReadToEnd().Substring(0, 300) } catch {}
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
        try { $sr = New-Object System.IO.StreamReader($err.Response.GetResponseStream()); $body = $sr.ReadToEnd().Substring(0, 300) } catch {}
        Write-Host "FAIL  Wholesale API POST: $status - $body"
    } else {
        Write-Host "ERROR Wholesale API POST: $($err.Message)"
    }
}
