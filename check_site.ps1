$ErrorActionPreference = "Stop"

$urls = @(
    @{ Name = "Homepage"; Uri = "https://ali-berrehail-website.vercel.app" },
    @{ Name = "Hero Video"; Uri = "https://ali-berrehail-website.vercel.app/Mol/hero-background.mp4" },
    @{ Name = "Config API"; Uri = "https://ali-berrehail-website.vercel.app/api/config" },
    @{ Name = "Contact API (GET, should 405)"; Uri = "https://ali-berrehail-website.vercel.app/api/contact" },
    @{ Name = "Wholesale API (GET, should 405)"; Uri = "https://ali-berrehail-website.vercel.app/api/wholesale" }
)

foreach ($u in $urls) {
    try {
        $r = Invoke-WebRequest -Uri $u.Uri -Method GET -UseBasicParsing -TimeoutSec 30 -MaximumRedirection 5
        Write-Host "$($u.Name): $($r.StatusCode) - Size: $($r.RawContentLength) bytes"
        if ($u.Name -eq "Config API") {
            Write-Host "Config body: $($r.Content)"
        }
    } catch {
        $err = $_.Exception
        if ($err.Response) {
            $status = $err.Response.StatusCode.value__
            Write-Host "$($u.Name): $status (non-success)"
            if ($status -eq 405) { Write-Host "  Expected 405 (Method Not Allowed) - API route is active" }
        } else {
            Write-Host "$($u.Name): ERROR - $($err.Message)"
        }
    }
}
