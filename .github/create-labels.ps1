# PowerShell script to create GitHub labels for TUXIMO repository
# Requires: GitHub CLI (gh) installed and authenticated

# Repository: https://github.com/Mostafa-SAID7/TUXIMO

Write-Host "Creating GitHub labels for TUXIMO repository..." -ForegroundColor Cyan
Write-Host ""

# Check if gh CLI is installed
$ghCommand = Get-Command gh -ErrorAction SilentlyContinue
if (-not $ghCommand) {
    Write-Host "ERROR: GitHub CLI (gh) is not installed." -ForegroundColor Red
    Write-Host "Please install it from: https://cli.github.com/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or create labels manually at:" -ForegroundColor Yellow
    Write-Host "https://github.com/Mostafa-SAID7/TUXIMO/labels" -ForegroundColor Yellow
    exit 1
}

# Check if authenticated
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Not authenticated with GitHub CLI." -ForegroundColor Red
    Write-Host "Please run: gh auth login" -ForegroundColor Yellow
    exit 1
}

# Set repository
$repo = "Mostafa-SAID7/TUXIMO"

Write-Host "Creating labels in repository: $repo" -ForegroundColor Green
Write-Host ""

# Define labels
$labels = @(
    @{name="documentation"; color="0075ca"; description="Documentation changes"},
    @{name="source"; color="1d76db"; description="Source code changes"},
    @{name="components"; color="5319e7"; description="Component changes"},
    @{name="styles"; color="d876e3"; description="Style/CSS changes"},
    @{name="typescript"; color="0052cc"; description="TypeScript changes"},
    @{name="configuration"; color="fbca04"; description="Configuration file changes"},
    @{name="github-actions"; color="000000"; description="GitHub Actions workflow changes"},
    @{name="scripts"; color="c5def5"; description="Script changes"},
    @{name="assets"; color="bfdadc"; description="Asset file changes"},
    @{name="tests"; color="d4c5f9"; description="Test file changes"},
    @{name="seo"; color="0e8a16"; description="SEO related changes"},
    @{name="security"; color="b60205"; description="Security related changes"},
    @{name="data"; color="fef2c0"; description="Data file changes"},
    @{name="hooks"; color="c2e0c6"; description="React hooks changes"},
    @{name="ui"; color="e99695"; description="UI component changes"},
    @{name="dependencies"; color="0366d6"; description="Dependency updates"}
)

# Create each label
$successCount = 0
foreach ($label in $labels) {
    Write-Host "Creating label: $($label.name)..." -NoNewline
    $result = gh label create $label.name --repo $repo --color $label.color --description $label.description --force 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host " ✓" -ForegroundColor Green
        $successCount++
    } else {
        Write-Host " ✗" -ForegroundColor Red
        Write-Host "  Error: $result" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✓ Created $successCount of $($labels.Count) labels successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "You can view them at: https://github.com/$repo/labels" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Verify labels exist in GitHub UI"
Write-Host "2. Re-enable labels in .github/dependabot.yml"
Write-Host "3. Test labeler workflow on a PR"
