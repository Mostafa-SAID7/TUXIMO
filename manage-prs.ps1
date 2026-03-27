# PowerShell Script to create labels and manage open PRs for TUXIMO repository

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "TUXIMO PR Management Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create GitHub Labels
Write-Host "Step 1: Creating GitHub Labels..." -ForegroundColor Yellow
Write-Host "------------------------------------------"

$labels = @(
    @{name="dependencies"; color="0366d6"; description="Dependency updates"},
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
    @{name="ui"; color="e99695"; description="UI component changes"}
)

foreach ($label in $labels) {
    gh label create $label.name --color $label.color --description $label.description --force
}

Write-Host ""
Write-Host "✅ Labels created successfully!" -ForegroundColor Green
Write-Host ""

# Step 2: List all open PRs
Write-Host "Step 2: Listing all open PRs..." -ForegroundColor Yellow
Write-Host "------------------------------------------"
gh pr list --limit 20

Write-Host ""
Write-Host ""

# Step 3: Check PR status and provide recommendations
Write-Host "Step 3: Checking PR status..." -ForegroundColor Yellow
Write-Host "------------------------------------------"

# Get all open PR numbers
$prList = gh pr list --json number | ConvertFrom-Json
$prNumbers = $prList | ForEach-Object { $_.number }

foreach ($prNum in $prNumbers) {
    Write-Host ""
    Write-Host "PR #${prNum}:" -ForegroundColor Cyan
    Write-Host "---"
    
    # Get PR details
    $prDetails = gh pr view $prNum --json title,state,statusCheckRollup | ConvertFrom-Json
    
    Write-Host "  Title: $($prDetails.title)"
    Write-Host "  State: $($prDetails.state)"
    Write-Host "  Checks:"
    
    # Count checks
    $passing = 0
    $failing = 0
    $pending = 0
    
    foreach ($check in $prDetails.statusCheckRollup) {
        if ($check.conclusion -eq "SUCCESS") {
            $passing++
        } elseif ($check.conclusion -eq "FAILURE") {
            $failing++
            Write-Host "    ❌ $($check.name)" -ForegroundColor Red
        } elseif ($check.status -eq "IN_PROGRESS" -or $check.status -eq "PENDING") {
            $pending++
        }
    }
    
    Write-Host "  Summary: $passing passing, $failing failing, $pending pending"
    
    # Provide recommendation
    if ($failing -eq 0 -and $passing -gt 0) {
        Write-Host "  ✅ RECOMMENDATION: MERGE (all checks passing)" -ForegroundColor Green
    } elseif ($failing -gt 0) {
        Write-Host "  ⚠️  RECOMMENDATION: REVIEW (some checks failing)" -ForegroundColor Yellow
    } else {
        Write-Host "  ⏳ RECOMMENDATION: WAIT (checks pending)" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To merge a PR:"
Write-Host "  gh pr merge <PR_NUMBER> --squash --auto"
Write-Host ""
Write-Host "To close a PR without merging:"
Write-Host "  gh pr close <PR_NUMBER>"
Write-Host ""
Write-Host "To merge all passing PRs:"
Write-Host "  See output above for PRs marked with ✅"
Write-Host ""
