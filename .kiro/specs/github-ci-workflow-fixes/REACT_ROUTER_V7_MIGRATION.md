# React Router v7 Migration Plan

## Overview

This document outlines the breaking changes and required code modifications for upgrading `react-router-dom` from v6.30.1 to v7.13.2 in the TUXIMO project.

## Current Implementation Analysis

### Current Version
- **Package**: `react-router-dom@6.30.1`
- **Router Type**: `BrowserRouter` (not using data router APIs)
- **Routing Pattern**: Simple client-side routing with lazy-loaded pages

### Files Using React Router
1. **src/App.tsx** - Main router configuration with `BrowserRouter`, `Routes`, `Route`
2. **src/components/Navigation.tsx** - Uses `Link`, `useLocation` for navigation
3. **src/pages/NotFound.tsx** - Uses `useLocation`, `Link` for 404 page

### Current Routing Structure
```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/hotels" element={<Hotels />} />
    <Route path="/cars" element={<Cars />} />
    <Route path="/support" element={<Support />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

## Breaking Changes from v6 to v7

### 1. Package Name Change (CRITICAL)

**Change**: The package name changes from `react-router-dom` to `react-router`

**Impact**: All imports must be updated

**Before (v6)**:
```tsx
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
```

**After (v7)**:
```tsx
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router";
```

**Note**: DOM-specific components like `RouterProvider` require a deep import:
```tsx
import { RouterProvider } from "react-router/dom";
```

### 2. Deprecated Utilities Removed

**Change**: `json()` and `defer()` utilities are removed

**Impact**: None for this project (we don't use data router APIs or these utilities)

### 3. React.lazy Compatibility with useTransition

**Change**: v7 uses `React.useTransition` for state updates instead of `React.useState`

**Impact**: Our current implementation uses `React.lazy` at module scope (correct pattern), so no changes needed

**Current Implementation (Correct)**:
```tsx
// ✅ React.lazy at module scope - compatible with v7
const Index = lazy(() => import("./pages/Index"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
```

**Anti-pattern to avoid**:
```tsx
// ❌ Don't do this - React.lazy inside component
function MyComponent() {
  const LazyComponent = lazy(() => import("./Component"));
  return <LazyComponent />;
}
```

### 4. Future Flags (Optional for v6 → v7 Migration)

Since we're using `BrowserRouter` (not `createBrowserRouter`), most future flags don't apply:

- ✅ **v7_relativeSplatPath**: Not applicable (no multi-segment splat routes like `dashboard/*`)
- ✅ **v7_startTransition**: Automatically enabled in v7, no code changes needed
- ⚠️ **v7_fetcherPersist**: Not applicable (not using data router)
- ⚠️ **v7_normalizeFormMethod**: Not applicable (not using data router)
- ⚠️ **v7_partialHydration**: Not applicable (not using SSR)
- ⚠️ **v7_skipActionErrorRevalidation**: Not applicable (not using data router)

## Required Code Changes

### Phase 1: Update Package Dependencies

**File**: `package.json`

**Changes**:
1. Remove `react-router-dom` dependency
2. Add `react-router` dependency

```json
{
  "dependencies": {
-   "react-router-dom": "^6.30.1",
+   "react-router": "^7.13.2"
  }
}
```

**Commands**:
```bash
npm uninstall react-router-dom
npm install react-router@latest
```

### Phase 2: Update Import Statements

**File**: `src/App.tsx`

**Before**:
```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
```

**After**:
```tsx
import { BrowserRouter, Routes, Route } from "react-router";
```

---

**File**: `src/components/Navigation.tsx`

**Before**:
```tsx
import { Link, useLocation } from "react-router-dom";
```

**After**:
```tsx
import { Link, useLocation } from "react-router";
```

---

**File**: `src/pages/NotFound.tsx`

**Before**:
```tsx
import { useLocation, Link } from "react-router-dom";
```

**After**:
```tsx
import { useLocation, Link } from "react-router";
```

### Phase 3: Verify No Breaking Patterns

**Checklist**:
- ✅ No multi-segment splat routes (e.g., `dashboard/*`)
- ✅ No `json()` or `defer()` utility usage
- ✅ `React.lazy` used at module scope (not inside components)
- ✅ No data router APIs (`createBrowserRouter`, loaders, actions)
- ✅ No form method checks (no `useNavigation().formMethod` usage)
- ✅ No SSR/hydration logic

**Result**: No additional code changes required beyond import updates

## Migration Steps

### Step 1: Ensure CI Workflows Pass
- ✅ Complete tasks 3.1-3.4 (GitHub labels, workflow fixes)
- ✅ Verify all CI checks pass on main branch
- ✅ Confirm Dependabot PRs can be merged

### Step 2: Create Migration Branch
```bash
git checkout -b feature/react-router-v7-upgrade
```

### Step 3: Update Dependencies
```bash
npm uninstall react-router-dom
npm install react-router@latest
```

### Step 4: Update Import Statements

**Automated approach** (recommended):
```bash
# macOS/BSD sed
find ./src \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" \) -type f -exec sed -i '' 's|from "react-router-dom"|from "react-router"|g' {} +

# Linux/GNU sed
find ./src \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" \) -type f -exec sed -i 's|from "react-router-dom"|from "react-router"|g' {} +
```

**Manual approach**:
1. Update `src/App.tsx` imports
2. Update `src/components/Navigation.tsx` imports
3. Update `src/pages/NotFound.tsx` imports

### Step 5: Verify TypeScript Compilation
```bash
npm run lint
npx tsc --noEmit
```

### Step 6: Test Locally
```bash
npm run dev
```

**Test all routes**:
- ✅ `/` - Home page
- ✅ `/about` - About page
- ✅ `/hotels` - Hotels page
- ✅ `/cars` - Cars page
- ✅ `/support` - Support page
- ✅ `/login` - Login page
- ✅ `/invalid-route` - 404 page

**Test navigation**:
- ✅ Click all navigation links
- ✅ Verify active route highlighting
- ✅ Test mobile menu navigation
- ✅ Test browser back/forward buttons
- ✅ Test direct URL navigation

### Step 7: Build and Test Production Bundle
```bash
npm run build
npm run preview
```

**Verify**:
- ✅ Build completes without errors
- ✅ Bundle size is reasonable (check for unexpected increases)
- ✅ All routes work in production build
- ✅ Lazy loading works correctly

### Step 8: Run CI Checks Locally
```bash
# Lint
npm run lint

# Type check
npx tsc --noEmit

# Build
npm run build

# Tests (if any)
npm run test
```

### Step 9: Push and Create PR
```bash
git add .
git commit -m "chore: upgrade react-router-dom v6.30.1 to react-router v7.13.2"
git push origin feature/react-router-v7-upgrade
```

### Step 10: Verify CI Pipeline
- ✅ All CI checks pass (lint, build, security, code quality)
- ✅ Labeler applies correct labels
- ✅ Vercel preview deployment succeeds
- ✅ No console errors in preview deployment

### Step 11: Merge to Main
- ✅ Review PR changes
- ✅ Verify all checks pass
- ✅ Merge PR
- ✅ Verify production deployment succeeds

## Risk Assessment

### Low Risk Changes
- ✅ Package name change (straightforward find-replace)
- ✅ Import statement updates (automated with sed)
- ✅ No API changes for `BrowserRouter`, `Routes`, `Route`, `Link`, `useLocation`

### No Risk Areas
- ✅ No data router APIs used (loaders, actions, fetchers)
- ✅ No multi-segment splat routes
- ✅ No deprecated utilities (`json`, `defer`)
- ✅ No SSR/hydration logic
- ✅ React.lazy already used correctly at module scope

### Potential Issues
1. **TypeScript types**: Ensure `@types/react-router` is not needed (types are included in v7)
2. **Bundle size**: Monitor for unexpected increases (v7 is more feature-rich)
3. **Third-party dependencies**: Check if any dependencies rely on `react-router-dom` peer dependency

## Rollback Plan

If issues arise after deployment:

### Option 1: Revert PR
```bash
git revert <commit-hash>
git push origin main
```

### Option 2: Rollback to v6
```bash
npm uninstall react-router
npm install react-router-dom@6.30.1
# Revert import changes
git checkout main -- src/
```

## Testing Checklist

### Functional Testing
- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] Active route highlighting works
- [ ] Mobile menu navigation works
- [ ] 404 page displays for invalid routes
- [ ] Browser back/forward buttons work
- [ ] Direct URL navigation works
- [ ] Lazy loading works (check Network tab)
- [ ] No console errors or warnings

### Performance Testing
- [ ] Bundle size is acceptable (compare before/after)
- [ ] Page load times are similar to v6
- [ ] Route transitions are smooth
- [ ] No memory leaks (check DevTools Memory tab)

### Compatibility Testing
- [ ] Works in Chrome/Edge
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works on mobile devices
- [ ] Works with screen readers (accessibility)

### CI/CD Testing
- [ ] All CI checks pass
- [ ] Vercel deployment succeeds
- [ ] No build errors or warnings
- [ ] TypeScript compilation succeeds
- [ ] ESLint passes

## Post-Migration Tasks

1. **Update Documentation**
   - Update `docs/CI_FIXES.md` with migration completion status
   - Update `docs/PROJECT_STATUS.md` with new React Router version
   - Document any issues encountered and solutions

2. **Monitor Production**
   - Check error logs for routing-related issues
   - Monitor analytics for 404 rate changes
   - Verify user flows are unaffected

3. **Clean Up**
   - Remove migration branch after successful deployment
   - Close related Dependabot PRs
   - Update project dependencies list

## References

- [React Router v7 Official Migration Guide](https://reactrouter.com/upgrading/v6)
- [React Router v7 Changelog](https://github.com/remix-run/react-router/blob/main/CHANGELOG.md)
- [React Router v7 Documentation](https://reactrouter.com/)

## Summary

The migration from React Router v6.30.1 to v7.13.2 is **low risk** for this project because:

1. We use simple client-side routing with `BrowserRouter` (not data router APIs)
2. No breaking API changes affect our usage patterns
3. Main change is package name (`react-router-dom` → `react-router`)
4. Import updates can be automated with find-replace
5. No code logic changes required

**Estimated effort**: 30-60 minutes
**Risk level**: Low
**Recommended approach**: Automated import updates + thorough testing
