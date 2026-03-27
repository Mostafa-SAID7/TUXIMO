# GitHub Configuration

This directory contains all GitHub-specific configuration files for the Ambition project.

## 📁 Directory Structure

```
.github/
├── ISSUE_TEMPLATE/          # Issue templates
│   ├── bug_report.yml       # Bug report template
│   ├── feature_request.yml  # Feature request template
│   └── config.yml           # Issue template configuration
├── scripts/                 # Automation scripts
│   ├── update-structure.js
│   ├── update-features.js
│   ├── update-changelog.js
│   ├── update-technologies.js
│   ├── update-readme.js
│   ├── update-sitemap.js
│   └── README.md
├── workflows/               # GitHub Actions workflows
│   ├── ci.yml              # Continuous Integration
│   ├── deploy.yml          # Deployment pipeline
│   ├── security.yml        # Security scanning
│   ├── docs-update.yml     # Documentation automation
│   ├── sitemap-update.yml  # Sitemap automation
│   ├── labeler.yml         # Auto-labeling PRs
│   ├── stale.yml           # Stale issue management
│   ├── code-quality.yml    # Code quality checks
│   └── release.yml         # Release automation
├── CODEOWNERS              # Code ownership rules
├── dependabot.yml          # Dependency updates
├── FUNDING.yml             # Funding information
├── labeler.yml             # PR labeling rules
├── pull_request_template.md # PR template
├── CHECKLIST.md            # Project checklist
├── SETUP_COMPLETE.md       # Setup completion guide
└── README.md               # This file
```

## 🔄 Workflows

### CI Pipeline (ci.yml)
**Triggers**: Push to main/develop, Pull requests

**Jobs**:
- **Lint**: Code quality checks with ESLint
- **Test**: Unit tests with coverage
- **Build**: Production build
- **Security**: npm audit
- **Notify**: Status notifications

**Status**: ✅ Active

### Deployment (deploy.yml)
**Triggers**: Push to main, Tags (v*), Manual dispatch

**Jobs**:
- **Build**: Production build
- **Vercel**: Deploy to Vercel
- **Smoke Test**: Post-deployment validation
- **Notify**: Deployment status

**Status**: ✅ Active

### Security Scan (security.yml)
**Triggers**: Weekly schedule, Push to main, Pull requests, Manual

**Jobs**:
- **Dependency Scan**: npm audit
- **CodeQL**: Code analysis
- **License Check**: License compliance
- **Report**: Generate security summary

**Status**: ✅ Active

### Documentation Update (docs-update.yml)
**Triggers**: Push to main/develop, Changes to src/**, package.json

**Jobs**:
- **Structure**: Update STRUCTURE.md
- **Features**: Update FEATURES.md
- **Changelog**: Update CHANGELOG.md
- **README**: Update README.md

**Status**: ✅ Active

### Code Quality (code-quality.yml)
**Triggers**: Pull requests, Push to main

**Jobs**:
- **Lint**: ESLint checks
- **Type Check**: TypeScript validation
- **Format**: Code formatting checks

**Status**: ✅ Active

## 📝 Issue Templates

### Bug Report (bug_report.yml)
Structured form for reporting bugs with:
- Description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots
- Browser/device information
- Additional context

### Feature Request (feature_request.yml)
Structured form for suggesting features with:
- Problem statement
- Proposed solution
- Alternatives considered
- Priority level
- Category

## 🏷️ Labels

Automatic labels applied by `labeler.yml`:

| Label | Applied When |
|-------|-------------|
| `documentation` | Changes to docs/ or *.md files |
| `source` | Changes to src/ files |
| `components` | Changes to component files |
| `styles` | Changes to CSS files |
| `typescript` | Changes to *.ts/*.tsx files |
| `configuration` | Changes to config files |
| `github-actions` | Changes to workflows |
| `dependencies` | Changes to package files |
| `assets` | Changes to assets |

## 🤖 Dependabot

Configured in `dependabot.yml`:

### npm Dependencies
- **Schedule**: Weekly (Monday 9:00 AM)
- **Limit**: 10 open PRs
- **Groups**: React packages, development dependencies

### GitHub Actions
- **Schedule**: Weekly (Monday 9:00 AM)
- **Limit**: 5 open PRs

## 🔧 Scripts

All automation scripts are in `.github/scripts/`:

| Script | Purpose |
|--------|---------|
| `update-structure.js` | Update project structure docs |
| `update-features.js` | Update component inventory |
| `update-changelog.js` | Update changelog with commits |
| `update-technologies.js` | Update tech stack docs |
| `update-readme.js` | Update README badges |
| `update-sitemap.js` | Regenerate sitemap |

See [scripts/README.md](scripts/README.md) for details.

## 📋 Pull Request Template

Located in `pull_request_template.md`:

**Sections**:
- Description
- Type of change
- Related issues
- Changes made
- Screenshots (before/after)
- Testing checklist
- Code quality checklist
- Breaking changes
- Reviewer checklist

## 🚀 Usage

### Running Workflows Manually

```bash
# Trigger documentation update
gh workflow run docs-update.yml

# Trigger security scan
gh workflow run security.yml

# Trigger deployment
gh workflow run deploy.yml

# Create a release
gh workflow run release.yml -f version=v1.0.0
```

### Creating Issues

Use the issue templates:
1. Go to Issues → New Issue
2. Select template (Bug Report or Feature Request)
3. Fill out the form
4. Submit

### Creating Pull Requests

1. Create a branch
2. Make changes
3. Push to GitHub
4. Create PR (template auto-fills)
5. Fill out all sections
6. Request review

## 🔒 Security

### Secrets Required

For full functionality, configure these secrets:

| Secret | Purpose | Required For |
|--------|---------|-------------|
| `GITHUB_TOKEN` | GitHub API | All workflows (auto-provided) |
| `VERCEL_TOKEN` | Vercel deployment | Deployment |
| `VERCEL_ORG_ID` | Vercel org | Deployment |
| `VERCEL_PROJECT_ID` | Vercel project | Deployment |

### Setting Secrets

```bash
# Using GitHub CLI
gh secret set SECRET_NAME

# Or via GitHub UI
Settings → Secrets and variables → Actions → New repository secret
```

## 📊 Monitoring

### Workflow Status

Check workflow status:
```bash
# List workflow runs
gh run list

# View specific run
gh run view <run-id>

# Watch a running workflow
gh run watch
```

### Badges

Add workflow badges to README:

```markdown
![CI](https://github.com/Mostafa-SAID7/ambition/workflows/CI%20Pipeline/badge.svg)
![Deploy](https://github.com/Mostafa-SAID7/ambition/workflows/Deploy/badge.svg)
![Security](https://github.com/Mostafa-SAID7/ambition/workflows/Security%20Scan/badge.svg)
```

## 🛠️ Maintenance

### Updating Workflows

1. Edit workflow file in `.github/workflows/`
2. Test locally if possible
3. Commit and push
4. Monitor first run
5. Adjust as needed

### Updating Scripts

1. Edit script in `.github/scripts/`
2. Test locally: `node .github/scripts/script-name.js`
3. Update documentation if needed
4. Commit and push

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [Issue Templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests)

## 🤝 Contributing

When contributing to GitHub configuration:

1. Test changes thoroughly
2. Document new workflows/scripts
3. Update this README
4. Follow existing patterns
5. Consider security implications

## 📞 Support

For issues with GitHub configuration:
1. Check workflow logs
2. Review documentation
3. Test locally when possible
4. Open an issue with details

---

**Project**: Ambition - Background Library  
**URL**: https://ambition-nine.vercel.app  
**Repository**: https://github.com/Mostafa-SAID7/ambition  
**Last Updated**: 2026-03-27  
**Status**: Active and Maintained
