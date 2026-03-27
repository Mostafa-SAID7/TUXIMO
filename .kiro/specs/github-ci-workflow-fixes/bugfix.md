# Bugfix Requirements Document

## Introduction

The GitHub CI workflows and Dependabot PRs are failing due to misconfiguration. The workflows were configured for an Angular project named "lost-yeti" but the actual project is a React/Vite application named "TUXIMO". This causes multiple CI checks to fail including build failures (wrong paths), code quality failures (wrong file patterns), security scan failures (missing Docker configuration and secrets), and labeler failures (missing GitHub labels). As a result, Dependabot PRs cannot be merged, blocking dependency updates including a pending react-router-dom upgrade from v6.30.1 to v7.13.2.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN Dependabot PR #16 (actions/labeler v5 → v6) runs CI checks THEN the labeler workflow fails because the "dependencies" label does not exist in the GitHub repository

1.2 WHEN CI workflows execute build steps THEN the build fails because workflows reference incorrect build paths (dist/lost-yeti instead of dist)

1.3 WHEN security workflows run THEN the Trivy container scan fails because it expects a Dockerfile that doesn't exist in the React/Vite project

1.4 WHEN security workflows run THEN the Snyk scan fails because the SNYK_TOKEN secret is not configured in the repository

1.5 WHEN code quality workflows run THEN the HTML validation step fails because it checks for .html files instead of .tsx React components

1.6 WHEN OWASP dependency check runs THEN it references the wrong project name "tuximo" in lowercase instead of "TUXIMO"

1.7 WHEN workflows use artifact actions THEN they use outdated versions (upload-artifact@v3 instead of v4)

1.8 WHEN CodeQL analysis runs THEN it uses outdated action versions (codeql-action@v2 instead of v3)

1.9 WHEN Dependabot creates PRs THEN they cannot be merged because 20+ CI checks fail due to the above misconfigurations

1.10 WHEN react-router-dom needs to be upgraded from v6.30.1 to v7.13.2 THEN the upgrade is blocked because Dependabot PRs cannot pass CI checks

### Expected Behavior (Correct)

2.1 WHEN Dependabot PR #16 (actions/labeler v5 → v6) runs CI checks THEN the labeler workflow SHALL succeed because the "dependencies" label exists in the GitHub repository

2.2 WHEN CI workflows execute build steps THEN the build SHALL succeed using the correct build path (dist) for the React/Vite project

2.3 WHEN security workflows run THEN the Trivy container scan SHALL be skipped or removed because the project deploys to Vercel without Docker containers

2.4 WHEN security workflows run THEN the Snyk scan SHALL either be skipped gracefully when SNYK_TOKEN is missing or removed from required checks

2.5 WHEN code quality workflows run THEN the HTML validation step SHALL be skipped or removed because React/JSX components (.tsx files) are validated through TypeScript and ESLint

2.6 WHEN OWASP dependency check runs THEN it SHALL reference the correct project name "TUXIMO"

2.7 WHEN workflows use artifact actions THEN they SHALL use current versions (upload-artifact@v4, download-artifact@v4)

2.8 WHEN CodeQL analysis runs THEN it SHALL use current action versions (codeql-action@v3)

2.9 WHEN Dependabot creates PRs THEN they SHALL be mergeable because all CI checks pass with correct project configuration

2.10 WHEN react-router-dom needs to be upgraded from v6.30.1 to v7.13.2 THEN the upgrade SHALL be possible because Dependabot PRs can pass CI checks

### Unchanged Behavior (Regression Prevention)

3.1 WHEN CI workflows run linting checks THEN the system SHALL CONTINUE TO execute ESLint on TypeScript/React files

3.2 WHEN CI workflows run TypeScript compilation checks THEN the system SHALL CONTINUE TO validate type correctness with tsc --noEmit

3.3 WHEN security workflows run npm audit THEN the system SHALL CONTINUE TO scan for dependency vulnerabilities

3.4 WHEN security workflows run TruffleHog secret scanning THEN the system SHALL CONTINUE TO detect exposed secrets in the codebase

3.5 WHEN security workflows run license compliance checks THEN the system SHALL CONTINUE TO validate dependency licenses

3.6 WHEN code quality workflows run Prettier checks THEN the system SHALL CONTINUE TO validate code formatting on .ts, .tsx, .css, and .json files

3.7 WHEN code quality workflows run bundle size checks THEN the system SHALL CONTINUE TO analyze and report JavaScript bundle sizes from the dist/assets directory

3.8 WHEN code quality workflows run accessibility checks THEN the system SHALL CONTINUE TO validate accessibility with axe-core on the built application

3.9 WHEN labeler workflow runs THEN the system SHALL CONTINUE TO automatically apply labels based on changed files according to .github/labeler.yml configuration

3.10 WHEN Dependabot runs weekly THEN the system SHALL CONTINUE TO create PRs for npm and GitHub Actions dependency updates

3.11 WHEN workflows run on pull requests THEN the system SHALL CONTINUE TO post summary comments with check results

3.12 WHEN the application uses React Router THEN the system SHALL CONTINUE TO support routing with components like Navigation, NotFound, and App using react-router-dom
