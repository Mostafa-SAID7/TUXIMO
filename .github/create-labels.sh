#!/bin/bash
# Script to create GitHub labels for TUXIMO repository
# Requires: GitHub CLI (gh) installed and authenticated

# Repository: https://github.com/Mostafa-SAID7/TUXIMO

echo "Creating GitHub labels for TUXIMO repository..."
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "ERROR: GitHub CLI (gh) is not installed."
    echo "Please install it from: https://cli.github.com/"
    echo ""
    echo "Or create labels manually at:"
    echo "https://github.com/Mostafa-SAID7/TUXIMO/labels"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "ERROR: Not authenticated with GitHub CLI."
    echo "Please run: gh auth login"
    exit 1
fi

# Set repository
REPO="Mostafa-SAID7/TUXIMO"

echo "Creating labels in repository: $REPO"
echo ""

# Create labels
gh label create "documentation" --repo "$REPO" --color "0075ca" --description "Documentation changes" --force
gh label create "source" --repo "$REPO" --color "1d76db" --description "Source code changes" --force
gh label create "components" --repo "$REPO" --color "5319e7" --description "Component changes" --force
gh label create "styles" --repo "$REPO" --color "d876e3" --description "Style/CSS changes" --force
gh label create "typescript" --repo "$REPO" --color "0052cc" --description "TypeScript changes" --force
gh label create "configuration" --repo "$REPO" --color "fbca04" --description "Configuration file changes" --force
gh label create "github-actions" --repo "$REPO" --color "000000" --description "GitHub Actions workflow changes" --force
gh label create "scripts" --repo "$REPO" --color "c5def5" --description "Script changes" --force
gh label create "assets" --repo "$REPO" --color "bfdadc" --description "Asset file changes" --force
gh label create "tests" --repo "$REPO" --color "d4c5f9" --description "Test file changes" --force
gh label create "seo" --repo "$REPO" --color "0e8a16" --description "SEO related changes" --force
gh label create "security" --repo "$REPO" --color "b60205" --description "Security related changes" --force
gh label create "data" --repo "$REPO" --color "fef2c0" --description "Data file changes" --force
gh label create "hooks" --repo "$REPO" --color "c2e0c6" --description "React hooks changes" --force
gh label create "ui" --repo "$REPO" --color "e99695" --description "UI component changes" --force
gh label create "dependencies" --repo "$REPO" --color "0366d6" --description "Dependency updates" --force

echo ""
echo "✓ All 16 labels created successfully!"
echo ""
echo "You can view them at: https://github.com/$REPO/labels"
echo ""
echo "Next steps:"
echo "1. Verify labels exist in GitHub UI"
echo "2. Re-enable labels in .github/dependabot.yml"
echo "3. Test labeler workflow on a PR"
