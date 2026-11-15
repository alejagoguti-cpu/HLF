# Publica el contenido de docs/ en la rama gh-pages (la que sirve GitHub Pages).
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

$tmp = Join-Path $env:TEMP "hlf-gh-pages"
if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
New-Item -ItemType Directory -Path $tmp | Out-Null

robocopy docs $tmp /E /NFL /NDL /NJH /NJS /NP | Out-Null

Push-Location $tmp
try {
  git init -q | Out-Null
  git checkout -q -b gh-pages | Out-Null
  git add -A
  git commit -q -m "Sitio publicado: CesiumJS + 3D Tiles de Bogota" | Out-Null
  git remote add origin "https://github.com/alejagoguti-cpu/HLF.git"
  git push -f origin gh-pages 2>&1 | Select-String "gh-pages" | ForEach-Object { $_.Line }
} finally {
  Pop-Location
}
Write-Output "gh-pages actualizado"
