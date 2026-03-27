#!/bin/bash

# Script to create labels and manage open PRs for TUXIMO repository

echo "=========================================="
echo "TUXIMO PR Management Script"
echo "=========================================="
echo ""

# Step 1: Create GitHub Labels
echo "Step 1: Creating GitHub Labels..."
echo "------------------------------------------"

gh label create "dependencies" --color "0366d6" --description "Dependency updates" --force
gh label create "documentation" --color "0075ca" --description "Documentation changes" --force
gh label create "source" --color "1d76db" --description "Source code changes" --force
gh label create "components" --color "5319e7" --description "Component changes" --force
gh label create "styles" --color "d876e3" --description "Style/CSS changes" --force
gh label create "typescript" --color "0052cc" --description "TypeScript changes" --force
gh label create "configuration" --color "fbca04" --description "Configuration file changes" --force
gh label create "github-actions" --color "000000" --description "GitHub Actions workflow changes" --force
gh label create "scripts" --color "c5def5" --description "Script changes" --force
gh label create "assets" --color "bfdadc" --description "Asset file changes" --force
gh label create "tests" --color "d4c5f9" --description "Test file changes" --force
gh label create "seo" --color "0e8a16" --description "SEO related changes" --force
gh label create "security" --color "b60205" --description "Security related changes" --force
gh label create "data" --color "fef2c0" --description "Data file changes" --force
gh label create "hooks" --color "c2e0c6" --description "React hooks changes" --force
gh label create "ui" --color "e99695" --description "UI component changes" --force

echo ""
echo "✅ Labels created successfully!"
echo ""

# Step 2: List all open PRs
echo "Step 2: Listing all open PRs..."
echo "------------------------------------------"
gh pr list --limit 20

echo ""
echo ""

# Step 3: Check PR status and provide recommendations
echo "Step 3: Checking PR status..."
echo "------------------------------------------"

# Get all open PR numbers
PR_NUMBERS=$(gh pr list --json number --jq '.[].number')

for PR_NUM in $PR_NUMBERS; do
    echo ""
    echo "PR #$PR_NUM:"
    echo "---"
    
    # Get PR details
    PR_TITLE=$(gh pr view $PR_NUM --json title --jq '.title')
    PR_STATE=$(gh pr view $PR_NUM --json state --jq '.state')
    PR_CHECKS=$(gh pr view $PR_NUM --json statusCheckRollup --jq '.statusCheckRollup[] | select(.conclusion != null) | .conclusion' | sort | uniq -c)
    
    echo "  Title: $PR_TITLE"
    echo "  State: $PR_STATE"
    echo "  Checks:"
    echo "$PR_CHECKS" | sed 's/^/    /'
    
    # Count passing and failing checks
    PASSING=$(echo "$PR_CHECKS" | grep -c "SUCCESS" || echo "0")
    FAILING=$(echo "$PR_CHECKS" | grep -c "FAILURE" || echo "0")
    
    echo "  Summary: $PASSING passing, $FAILING failing"
    
    # Provide recommendation
    if [ "$FAILING" -eq 0 ] && [ "$PASSING" -gt 0 ]; then
        echo "  ✅ RECOMMENDATION: MERGE (all checks passing)"
    elif [ "$FAILING" -gt 0 ]; then
        echo "  ⚠️  RECOMMENDATION: REVIEW (some checks failing)"
    else
        echo "  ⏳ RECOMMENDATION: WAIT (checks pending)"
    fi
done

echo ""
echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo ""
echo "To merge a PR:"
echo "  gh pr merge <PR_NUMBER> --squash --auto"
echo ""
echo "To close a PR without merging:"
echo "  gh pr close <PR_NUMBER>"
echo ""
echo "To merge all passing PRs automatically:"
echo "  ./merge-passing-prs.sh"
echo ""

