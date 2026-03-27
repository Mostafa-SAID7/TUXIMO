# PR Management Guide for TUXIMO

Since GitHub CLI is not installed, follow these steps to manage your 14 open PRs.

## Step 1: Create GitHub Labels (CRITICAL - Do This First!)

Go to: https://github.com/Mostafa-SAID7/TUXIMO/labels

Click "New label" and create these 16 labels:

| Label Name | Color (without #) | Description |
|------------|-------------------|-------------|
| dependencies | 0366d6 | Dependency updates |
| documentation | 0075ca | Documentation changes |
| source | 1d76db | Source code changes |
| components | 5319e7 | Component changes |
| styles | d876e3 | Style/CSS changes |
| typescript | 0052cc | TypeScript changes |
| configuration | fbca04 | Configuration file changes |
| github-actions | 000000 | GitHub Actions workflow changes |
| scripts | c5def5 | Script changes |
| assets | bfdadc | Asset file changes |
| tests | d4c5f9 | Test file changes |
| seo | 0e8a16 | SEO related changes |
| security | b60205 | Security related changes |
| data | fef2c0 | Data file changes |
| hooks | c2e0c6 | React hooks changes |
| ui | e99695 | UI component changes |

**Why this is critical**: Without these labels, the labeler workflow will fail on all PRs.

## Step 2: Review Open PRs

Go to: https://github.com/Mostafa-SAID7/TUXIMO/pulls

For each of the 14 open PRs:

### Check 1: Is it a Dependabot PR?
- **If YES**: Check if CI passes after labels are created
  - ✅ **CI Passing**: Merge it (click "Squash and merge")
  - ❌ **CI Failing**: Close it (Dependabot will recreate it next week)

### Check 2: Is it outdated?
- **If PR is more than 1 month old**: Close it
- **If PR conflicts with main**: Close it

### Check 3: Does it still make sense?
- **If PR adds value**: Keep it open or merge if CI passes
- **If PR is no longer relevant**: Close it

## Step 3: Recommended Actions for Common Dependabot PRs

Based on your current setup, here's what to do with typical Dependabot PRs:

### ✅ MERGE These (if CI passes):
- React/React-DOM updates
- TypeScript updates
- Vite updates
- ESLint updates
- Tailwind CSS updates
- Radix UI component updates
- Any minor/patch version updates

### ❌ CLOSE These (will be recreated):
- actions/labeler v5 → v6 (already done manually)
- Any PR that's failing CI
- Any PR that's been open for months

### ⏳ REVIEW These Carefully:
- Major version updates (e.g., React 18 → 19)
- Breaking changes
- Security updates (merge ASAP if CI passes)

## Step 4: Bulk Actions

### To close all failing PRs at once:

1. Go to: https://github.com/Mostafa-SAID7/TUXIMO/pulls
2. Filter by: "Status: Failure"
3. For each failing PR:
   - Click on it
   - Scroll down
   - Click "Close pull request"
   - Add comment: "Closing due to CI failures. Will be recreated by Dependabot."

### To merge all passing PRs at once:

1. Go to: https://github.com/Mostafa-SAID7/TUXIMO/pulls
2. Filter by: "Status: Success"
3. For each passing PR:
   - Click on it
   - Scroll down
   - Click "Squash and merge"
   - Confirm merge

## Step 5: After Cleanup

Once you've handled all PRs:

1. **Verify CI is working**: https://github.com/Mostafa-SAID7/TUXIMO/actions
2. **Check Dependabot**: It will create new PRs next Monday
3. **Monitor new PRs**: They should all pass CI now

## Quick Decision Matrix

| PR Type | CI Status | Age | Action |
|---------|-----------|-----|--------|
| Dependabot | ✅ Pass | Any | MERGE |
| Dependabot | ❌ Fail | Any | CLOSE |
| Dependabot | ⏳ Pending | Any | WAIT |
| Manual | ✅ Pass | <1 month | MERGE |
| Manual | ❌ Fail | Any | REVIEW |
| Manual | Any | >3 months | CLOSE |

## Expected Outcome

After following this guide:
- ✅ All 16 labels created
- ✅ Passing PRs merged
- ✅ Failing PRs closed
- ✅ CI workflows passing
- ✅ Dependabot working correctly
- ✅ 0 open PRs (or only valid ones)

## Need Help?

If you want to install GitHub CLI for easier management:

**Windows**: 
```powershell
winget install --id GitHub.cli
```

Or download from: https://cli.github.com/

After installing, authenticate:
```bash
gh auth login
```

Then you can use the PowerShell scripts I created:
- `manage-prs.ps1` - Review all PRs
- `auto-merge-prs.ps1` - Auto-merge passing PRs

