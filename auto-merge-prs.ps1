# PowerShell Script to automatically merge passing PRs and close failing ones

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Auto-Merge Passing PRs Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Get all open PR numbers
$prList = gh pr list --json number,title,statusCheckRollup | ConvertFrom-Json

$merged = 0
$closed = 0
$skipped = 0

foreach ($pr in $prList) {
    $prNum = $pr.number
    $prTitle = $pr.title
    
    Write-Host "Processing PR #${prNum}: $prTitle" -ForegroundColor Cyan
    
    # Count checks
    $passing = 0
    $failing = 0
    $pending = 0
    
    foreach ($check in $pr.statusCheckRollup) {
        if ($check.conclusion -eq "SUCCESS") {
            $passing++
        } elseif ($check.conclusion -eq "FAILURE") {
            $failing++
        } elseif ($check.status -eq "IN_PROGRESS" -or $check.status -eq "PENDING" -or $null -eq $check.conclusion) {
            $pending++
        }
    }
    
    Write-Host "  Checks: $passing passing, $failing failing, $pending pending"
    
    # Decision logic
    if ($failing -eq 0 -and $passing -gt 0 -and $pending -eq 0) {
        # All checks passed - merge it
        Write-Host "  ✅ Merging PR #${prNum}..." -ForegroundColor Green
        gh pr merge $prNum --squash --auto --delete-branch
        $merged++
    } elseif ($failing -gt 0 -and $pending -eq 0) {
        # Checks failed and no pending - close it
        Write-Host "  ❌ Closing PR #${prNum} (checks failed)..." -ForegroundColor Red
        gh pr close $prNum --comment "Closing this PR as CI checks are failing. Please reopen with fixes if needed."
        $closed++
    } else {
        # Checks pending - skip for now
        Write-Host "  ⏳ Skipping PR #${prNum} (checks pending)..." -ForegroundColor Yellow
        $skipped++
    }
    
    Write-Host ""
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ Merged: $merged PRs" -ForegroundColor Green
Write-Host "❌ Closed: $closed PRs" -ForegroundColor Red
Write-Host "⏳ Skipped: $skipped PRs" -ForegroundColor Yellow
Write-Host ""
