# Simple HTTP Server in PowerShell
param(
    [int]$Port = 8000
)

# Create HttpListener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()

Write-Host "Server started at http://localhost:$Port"
Write-Host "Press Ctrl+C to stop the server"

# Handle requests
while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    # Get requested file path
    $filePath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrEmpty($filePath)) {
        $filePath = "测试.html"
    }
    
    $fullPath = Join-Path (Get-Location) $filePath
    
    # Check if file exists
    if (Test-Path $fullPath -PathType Leaf) {
        # Determine content type
        $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = "text/plain"
        
        switch ($extension) {
            ".html" { $contentType = "text/html" }
            ".css" { $contentType = "text/css" }
            ".js" { $contentType = "application/javascript" }
            ".mp3" { $contentType = "audio/mpeg" }
            ".jpg" { $contentType = "image/jpeg" }
            ".png" { $contentType = "image/png" }
            ".gif" { $contentType = "image/gif" }
        }
        
        # Read file content
        try {
            $fileContent = [System.IO.File]::ReadAllBytes($fullPath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $fileContent.Length
            $response.OutputStream.Write($fileContent, 0, $fileContent.Length)
        } catch {
            Write-Host "Error reading file: $_"
            $response.StatusCode = 500
        }
    } else {
        $response.StatusCode = 404
    }
    
    $response.Close()
}

# Stop server when exiting
$listener.Stop()
$listener.Close()