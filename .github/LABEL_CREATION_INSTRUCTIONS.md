# GitHub Label Creation Instructions

## Task 3.1: Create GitHub Labels in Repository

This document provides step-by-step instructions to create the 16 required GitHub labels for the TUXIMO repository.

## Repository Information

- **Repository**: https://github.com/Mostafa-SAID7/TUXIMO
- **Labels Page**: https://github.com/Mostafa-SAID7/TUXIMO/labels
- **Required Labels**: 16 labels (see table below)

## Why These Labels Are Needed

The GitHub CI workflows and Dependabot configuration require these labels to function properly:

1. **Labeler Workflow** (`.github/workflows/labeler.yml`): Automatically applies labels to PRs based on changed files
2. **Dependabot** (`.github/dependabot.yml`): Uses the "dependencies" label for automated dependency update PRs
3. **PR Organization**: Helps categorize and filter pull requests by type of change

Without these labels, the labeler workflow fails and Dependabot PRs cannot be properly tagged.

## Required Labels

| Label Name | Color | Description |
|------------|-------|-------------|
| documentation | #0075ca | Documentation changes |
| source | #1d76db | Source code changes |
| components | #5319e7 | Component changes |
| styles | #d876e3 | Style/CSS changes |
| typescript | #0052cc | TypeScript changes |
| configuration | #fbca04 | Configuration file changes |
| github-actions | #000000 | GitHub Actions workflow changes |
| scripts | #c5def5 | Script changes |
| assets | #bfdadc | Asset file changes |
| tests | #d4c5f9 | Test file changes |
| seo | #0e8a16 | SEO related changes |
| security | #b60205 | Security related changes |
| data | #fef2c0 | Data file changes |
| hooks | #c2e0c6 | React hooks changes |
| ui | #e99695 | UI component changes |
| dependencies | #0366d6 | Dependency updates (for Dependabot) |

## Method 1: Using GitHub CLI (Recommended - Fastest)

### Prerequisites

1. Install GitHub CLI: https://cli.github.com/
2. Authenticate with GitHub: `gh auth login`

### Steps

#### On Linux/Mac:

```bash
cd ambition/.github
chmod +x create-labels.sh
./create-labels.sh
```

#### On Windows (PowerShell):

```powershell
cd ambition\.github
.\create-labels.ps1
```

### What the Script Does

- Checks if GitHub CLI is installed and authenticated
- Creates all 16 labels in the TUXIMO repository
- Uses `--force` flag to update labels if they already exist
- Provides success/error feedback for each label

## Method 2: Using GitHub Web UI (Manual)

### Steps

1. **Navigate to Labels Page**
   - Go to: https://github.com/Mostafa-SAID7/TUXIMO/labels
   - Or: Repository → Issues tab → Labels button

2. **Create Each Label**
   - Click "New label" button
   - Enter label name (e.g., "documentation")
   - Enter color code (e.g., "0075ca") - remove the # symbol
   - Enter description (e.g., "Documentation changes")
   - Click "Create label"

3. **Repeat for All 16 Labels**
   - Use the table above for exact names, colors, and descriptions
   - Label names must match exactly (case-sensitive)
   - Colors must match exactly (without # symbol)

### Tips for Manual Creation

- Open the table above in a split screen for easy reference
- Copy-paste label names to avoid typos
- Copy-paste color codes (without #)
- You can edit labels later if you make a mistake

## Method 3: Using GitHub API (Advanced)

If you prefer using the GitHub API directly:

```bash
# Set your GitHub token
export GITHUB_TOKEN="your_personal_access_token"

# Create labels using curl
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/Mostafa-SAID7/TUXIMO/labels \
  -d '{"name":"documentation","color":"0075ca","description":"Documentation changes"}'

# Repeat for each label...
```

## Verification

After creating the labels, verify they exist:

### Using GitHub CLI:

```bash
gh label list --repo Mostafa-SAID7/TUXIMO
```

### Using GitHub Web UI:

1. Go to: https://github.com/Mostafa-SAID7/TUXIMO/labels
2. Verify all 16 labels are listed
3. Check that colors and descriptions match the table above

### Expected Output:

You should see all 16 labels with their correct colors and descriptions.

## Next Steps After Label Creation

Once all labels are created:

1. **Re-enable Labels in Dependabot Configuration**
   - Edit `.github/dependabot.yml`
   - Uncomment the `labels: ["dependencies"]` lines
   - Commit and push the changes

2. **Test Labeler Workflow**
   - Create a test PR with some file changes
   - Verify the labeler workflow runs successfully
   - Verify appropriate labels are automatically applied

3. **Verify Dependabot PRs**
   - Wait for next Dependabot run (weekly schedule)
   - Or manually trigger Dependabot
   - Verify Dependabot PRs include the "dependencies" label

## Troubleshooting

### GitHub CLI Not Installed

**Error**: `gh: command not found` or `The term 'gh' is not recognized`

**Solution**: Install GitHub CLI from https://cli.github.com/

### Not Authenticated

**Error**: `gh auth status` fails

**Solution**: Run `gh auth login` and follow the prompts

### Permission Denied

**Error**: `Resource not accessible by integration` or `403 Forbidden`

**Solution**: Ensure you have admin or write access to the repository

### Label Already Exists

**Error**: `Label already exists`

**Solution**: The scripts use `--force` flag to update existing labels. If creating manually, you can edit the existing label instead.

### Wrong Repository

**Error**: Labels created in wrong repository

**Solution**: Double-check you're working with https://github.com/Mostafa-SAID7/TUXIMO

## Task Completion Checklist

- [ ] All 16 labels created in GitHub repository
- [ ] Labels verified at https://github.com/Mostafa-SAID7/TUXIMO/labels
- [ ] Label names match exactly (case-sensitive)
- [ ] Label colors match exactly
- [ ] Label descriptions are set correctly
- [ ] Ready to proceed to Task 3.2 (re-enable labels in dependabot.yml)

## References

- GitHub Labels Documentation: https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels
- GitHub CLI Documentation: https://cli.github.com/manual/
- CREATE_LABELS.md: Original label reference document
- Task 3.1 in tasks.md: This task in the bugfix spec

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify repository access permissions
3. Try the manual method (GitHub Web UI) if CLI fails
4. Ensure you're authenticated with the correct GitHub account
