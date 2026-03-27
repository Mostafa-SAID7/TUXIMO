# Create GitHub Labels

The workflows and dependabot expect certain labels to exist in your GitHub repository. You need to create these labels manually in your GitHub repo settings.

## How to Create Labels

1. Go to your repository on GitHub: https://github.com/Mostafa-SAID7/TUXIMO
2. Click on "Issues" tab
3. Click on "Labels" button
4. Click "New label" button
5. Create each label below

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

## Quick Create (GitHub CLI)

If you have GitHub CLI installed, you can run these commands:

```bash
gh label create "documentation" --color "0075ca" --description "Documentation changes"
gh label create "source" --color "1d76db" --description "Source code changes"
gh label create "components" --color "5319e7" --description "Component changes"
gh label create "styles" --color "d876e3" --description "Style/CSS changes"
gh label create "typescript" --color "0052cc" --description "TypeScript changes"
gh label create "configuration" --color "fbca04" --description "Configuration file changes"
gh label create "github-actions" --color "000000" --description "GitHub Actions workflow changes"
gh label create "scripts" --color "c5def5" --description "Script changes"
gh label create "assets" --color "bfdadc" --description "Asset file changes"
gh label create "tests" --color "d4c5f9" --description "Test file changes"
gh label create "seo" --color "0e8a16" --description "SEO related changes"
gh label create "security" --color "b60205" --description "Security related changes"
gh label create "data" --color "fef2c0" --description "Data file changes"
gh label create "hooks" --color "c2e0c6" --description "React hooks changes"
gh label create "ui" --color "e99695" --description "UI component changes"
gh label create "dependencies" --color "0366d6" --description "Dependency updates"
```

## After Creating Labels

Once you've created the labels, you can re-enable them in `dependabot.yml` by uncommenting the labels sections.
