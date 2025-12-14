$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8888/')
$listener.Start()
Write-Host 'Server started at http://localhost:8888'

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $filePath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrEmpty($filePath)) {
        $filePath = '测试.html'
    }
    
    $fullPath = Join-Path (Get-Location) $filePath
    
    if (Test-Path $fullPath -PathType Leaf) {
        $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = 'text/plain'
        
        switch ($extension) {
            '.html' { $contentType = 'text/html' }
            '.css' { $contentType = 'text/css' }
            '.js' { $contentType = 'application/javascript' }
            '.mp3' { $contentType = 'audio/mpeg' }
        }
        
        try {
            $fileContent = [System.IO.File]::ReadAllBytes($fullPath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $fileContent.Length
            $response.OutputStream.Write($fileContent, 0, $fileContent.Length)
        } catch {
            $response.StatusCode = 500
        }
    } else {
        $response.StatusCode = 404
    }
    
    $response.Close()
}
