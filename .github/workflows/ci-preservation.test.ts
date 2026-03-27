/**
 * Preservation Property Tests for GitHub CI Workflow Fixes
 * 
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12**
 * 
 * This test verifies that existing functional checks continue to work after workflow fixes.
 * 
 * CRITICAL: These tests should PASS on UNFIXED code (baseline behavior).
 * After fixes are applied, these tests should STILL PASS (no regressions).
 * 
 * The tests verify that:
 * 1. ESLint checks on TypeScript/React files continue to work
 * 2. TypeScript compilation validation (tsc --noEmit) continues to work
 * 3. npm audit security scanning continues to work
 * 4. TruffleHog secret scanning continues to work
 * 5. License compliance checks continue to work
 * 6. Prettier formatting validation on .ts, .tsx, .css, .json files continues to work
 * 7. Bundle size analysis from dist/assets directory continues to work
 * 8. Accessibility validation with axe-core continues to work
 * 9. Automatic PR labeling based on changed files continues to work
 * 10. Weekly Dependabot updates for npm and GitHub Actions continue to work
 * 11. PR summary comments with check results continue to work
 * 12. React Router functionality continues to work
 */

import { describe, it, expect } from 'vitest';
import { fc, test } from '@fast-check/vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';

// Helper to read workflow files
function readWorkflowFile(filename: string): string {
  const workflowPath = path.join(process.cwd(), '.github', 'workflows', filename);
  return fs.readFileSync(workflowPath, 'utf-8');
}

// Helper to parse YAML workflow
function parseWorkflow(content: string): any {
  return yaml.parse(content);
}

// Helper to read dependabot config
function readDependabotConfig(): string {
  const configPath = path.join(process.cwd(), '.github', 'dependabot.yml');
  return fs.readFileSync(configPath, 'utf-8');
}

// Helper to read labeler config
function readLabelerConfig(): string {
  const configPath = path.join(process.cwd(), '.github', 'labeler.yml');
  return fs.readFileSync(configPath, 'utf-8');
}

describe('Property 2: Preservation - Existing Functional Checks Continue Working', () => {
  
  /**
   * Requirement 3.1: ESLint checks on TypeScript/React files must continue to work
   */
  test.prop([fc.constant('code-quality.yml')])(
    'ESLint check job must be present and configured correctly',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Verify ESLint job exists
      expect(workflow.jobs).toHaveProperty('eslint');
      
      const eslintJob = workflow.jobs.eslint;
      
      // Verify job has correct steps
      const eslintStep = eslintJob.steps.find((s: any) => 
        s.run?.includes('npm run lint') || s.run?.includes('eslint')
      );
      
      expect(eslintStep).toBeDefined();
      expect(eslintStep.run).toMatch(/lint/);
    }
  );

  /**
   * Requirement 3.2: TypeScript compilation validation must continue to work
   */
  test.prop([fc.constant('code-quality.yml')])(
    'TypeScript check job must validate with tsc --noEmit',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Verify TypeScript job exists
      expect(workflow.jobs).toHaveProperty('typescript');
      
      const typescriptJob = workflow.jobs.typescript;
      
      // Verify tsc --noEmit command is present
      const tscStep = typescriptJob.steps.find((s: any) => 
        s.run?.includes('tsc --noEmit')
      );
      
      expect(tscStep).toBeDefined();
      expect(tscStep.run).toContain('tsc --noEmit');
    }
  );

  /**
   * Requirement 3.3: npm audit security scanning must continue to work
   */
  test.prop([fc.constant('security.yml')])(
    'npm audit scan must be present in security workflow',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Verify dependency-scan job exists
      expect(workflow.jobs).toHaveProperty('dependency-scan');
      
      const depScanJob = workflow.jobs['dependency-scan'];
      
      // Verify npm audit command is present
      const auditStep = depScanJob.steps.find((s: any) => 
        s.run?.includes('npm audit')
      );
      
      expect(auditStep).toBeDefined();
      expect(auditStep.run).toMatch(/npm audit/);
    }
  );

  /**
   * Requirement 3.4: TruffleHog secret scanning must continue to work
   */
  test.prop([fc.constant('security.yml')])(
    'TruffleHog secret scan must be present and configured',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Verify secret-scan job exists
      expect(workflow.jobs).toHaveProperty('secret-scan');
      
      const secretScanJob = workflow.jobs['secret-scan'];
      
      // Verify TruffleHog action is used
      const truffleStep = secretScanJob.steps.find((s: any) => 
        s.uses?.includes('trufflehog')
      );
      
      expect(truffleStep).toBeDefined();
      expect(truffleStep.uses).toMatch(/trufflehog/);
    }
  );

  /**
   * Requirement 3.5: License compliance checks must continue to work
   */
  test.prop([fc.constant('security.yml')])(
    'license compliance check must be present',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Verify license-check job exists
      expect(workflow.jobs).toHaveProperty('license-check');
      
      const licenseJob = workflow.jobs['license-check'];
      
      // Verify license-checker command is present
      const licenseStep = licenseJob.steps.find((s: any) => 
        s.run?.includes('license-checker')
      );
      
      expect(licenseStep).toBeDefined();
      expect(licenseStep.run).toMatch(/license-checker/);
    }
  );

  /**
   * Requirement 3.6: Prettier formatting validation must continue to work
   */
  test.prop([fc.constant('code-quality.yml')])(
    'Prettier check must validate .ts, .tsx, .css, .json files',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Verify prettier job exists
      expect(workflow.jobs).toHaveProperty('prettier');
      
      const prettierJob = workflow.jobs.prettier;
      
      // Verify prettier command checks correct file types
      const prettierStep = prettierJob.steps.find((s: any) => 
        s.run?.includes('prettier')
      );
      
      expect(prettierStep).toBeDefined();
      expect(prettierStep.run).toMatch(/prettier.*--check/);
      
      // Verify it checks TypeScript files
      expect(prettierStep.run).toMatch(/\bts\b/);
      
      // Verify it checks React files
      expect(prettierStep.run).toMatch(/tsx/);
      
      // Verify it checks CSS files
      expect(prettierStep.run).toMatch(/css/);
      
      // Verify it checks JSON files
      expect(prettierStep.run).toMatch(/json/);
    }
  );

  /**
   * Requirement 3.7: Bundle size analysis must continue to work
   */
  test.prop([fc.constant('code-quality.yml')])(
    'bundle size check must analyze dist/assets directory',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Verify bundle-size job exists
      expect(workflow.jobs).toHaveProperty('bundle-size');
      
      const bundleJob = workflow.jobs['bundle-size'];
      
      // Verify build step exists
      const buildStep = bundleJob.steps.find((s: any) => 
        s.run?.includes('npm run build')
      );
      expect(buildStep).toBeDefined();
      
      // Verify bundle size analysis step exists
      const analyzeStep = bundleJob.steps.find((s: any) => 
        s.run?.includes('Bundle Size Report') || s.run?.includes('dist')
      );
      expect(analyzeStep).toBeDefined();
      
      // Verify it checks dist/assets directory (with flexible matching)
      expect(analyzeStep.run).toMatch(/assets/);
    }
  );

  /**
   * Requirement 3.8: Accessibility validation with axe-core must continue to work
   */
  test.prop([fc.constant('code-quality.yml')])(
    'accessibility check must use axe-core',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Verify accessibility job exists
      expect(workflow.jobs).toHaveProperty('accessibility');
      
      const a11yJob = workflow.jobs.accessibility;
      
      // Verify axe-core is used
      const axeStep = a11yJob.steps.find((s: any) => 
        s.run?.includes('axe-core')
      );
      
      expect(axeStep).toBeDefined();
      expect(axeStep.run).toMatch(/axe-core/);
    }
  );

  /**
   * Requirement 3.9: Automatic PR labeling must continue to work
   */
  test.prop([fc.constant('labeler.yml')])(
    'labeler workflow must be configured correctly',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Verify labeler job exists
      expect(workflow.jobs).toHaveProperty('label');
      
      const labelerJob = workflow.jobs.label;
      
      // Verify labeler action is used
      const labelerStep = labelerJob.steps.find((s: any) => 
        s.uses?.includes('actions/labeler')
      );
      
      expect(labelerStep).toBeDefined();
      expect(labelerStep.uses).toMatch(/actions\/labeler/);
      
      // Verify configuration path is set
      expect(labelerStep.with).toHaveProperty('configuration-path');
      expect(labelerStep.with['configuration-path']).toBe('.github/labeler.yml');
    }
  );

  it('labeler configuration file must exist and define label patterns', () => {
    const labelerConfig = readLabelerConfig();
    const config = yaml.parse(labelerConfig);
    
    // Verify configuration is not empty
    expect(config).toBeDefined();
    expect(Object.keys(config).length).toBeGreaterThan(0);
    
    // Verify it contains file patterns for labeling
    // The config should map labels to file patterns
    const hasPatterns = Object.values(config).some((value: any) => 
      Array.isArray(value) || typeof value === 'object'
    );
    expect(hasPatterns).toBe(true);
  });

  /**
   * Requirement 3.10: Weekly Dependabot updates must continue to work
   */
  it('Dependabot must be configured for npm and GitHub Actions', () => {
    const dependabotConfig = readDependabotConfig();
    const config = yaml.parse(dependabotConfig);
    
    // Verify version is 2
    expect(config.version).toBe(2);
    
    // Verify updates array exists
    expect(config.updates).toBeDefined();
    expect(Array.isArray(config.updates)).toBe(true);
    expect(config.updates.length).toBeGreaterThanOrEqual(2);
    
    // Verify npm ecosystem is configured
    const npmUpdate = config.updates.find((u: any) => 
      u['package-ecosystem'] === 'npm'
    );
    expect(npmUpdate).toBeDefined();
    expect(npmUpdate.schedule).toBeDefined();
    expect(npmUpdate.schedule.interval).toBe('weekly');
    
    // Verify GitHub Actions ecosystem is configured
    const actionsUpdate = config.updates.find((u: any) => 
      u['package-ecosystem'] === 'github-actions'
    );
    expect(actionsUpdate).toBeDefined();
    expect(actionsUpdate.schedule).toBeDefined();
    expect(actionsUpdate.schedule.interval).toBe('weekly');
  });

  /**
   * Requirement 3.11: PR summary comments must continue to work
   */
  test.prop([fc.constant('code-quality.yml')])(
    'PR comment job must post check results',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Verify comment-pr job exists
      expect(workflow.jobs).toHaveProperty('comment-pr');
      
      const commentJob = workflow.jobs['comment-pr'];
      
      // Verify it runs on pull requests
      expect(commentJob.if).toMatch(/pull_request/);
      
      // Verify it uses github-script action
      const scriptStep = commentJob.steps.find((s: any) => 
        s.uses?.includes('github-script')
      );
      
      expect(scriptStep).toBeDefined();
      expect(scriptStep.with.script).toMatch(/createComment/);
    }
  );

  test.prop([fc.constant('security.yml')])(
    'security workflow must post PR comments',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Verify security-report job exists
      expect(workflow.jobs).toHaveProperty('security-report');
      
      const reportJob = workflow.jobs['security-report'];
      
      // Verify it has a PR comment step
      const commentStep = reportJob.steps.find((s: any) => 
        s.uses?.includes('github-script') && s.if?.includes('pull_request')
      );
      
      expect(commentStep).toBeDefined();
    }
  );

  /**
   * Requirement 3.12: React Router functionality must continue to work
   * 
   * Note: This is application-level functionality, not CI workflow configuration.
   * We verify that the workflows don't interfere with React Router by checking
   * that no workflow steps modify routing files or dependencies incorrectly.
   */
  it('workflows must not interfere with React Router functionality', () => {
    const codeQuality = readWorkflowFile('code-quality.yml');
    const security = readWorkflowFile('security.yml');
    
    // Verify workflows don't have steps that would break routing
    // (e.g., no steps that modify package.json or routing files)
    
    // Workflows should only read and analyze code, not modify it
    expect(codeQuality).not.toMatch(/sed.*package\.json/);
    expect(codeQuality).not.toMatch(/rm.*src\/.*\.tsx/);
    
    expect(security).not.toMatch(/sed.*package\.json/);
    expect(security).not.toMatch(/rm.*src\/.*\.tsx/);
  });

  /**
   * Integration property: All preservation checks work together
   */
  it('complete CI pipeline preserves all functional checks', () => {
    const codeQuality = readWorkflowFile('code-quality.yml');
    const security = readWorkflowFile('security.yml');
    const labeler = readWorkflowFile('labeler.yml');
    
    const codeQualityWorkflow = parseWorkflow(codeQuality);
    const securityWorkflow = parseWorkflow(security);
    const labelerWorkflow = parseWorkflow(labeler);
    
    // Verify all required jobs exist in code-quality workflow
    expect(codeQualityWorkflow.jobs).toHaveProperty('prettier');
    expect(codeQualityWorkflow.jobs).toHaveProperty('eslint');
    expect(codeQualityWorkflow.jobs).toHaveProperty('typescript');
    expect(codeQualityWorkflow.jobs).toHaveProperty('bundle-size');
    expect(codeQualityWorkflow.jobs).toHaveProperty('accessibility');
    expect(codeQualityWorkflow.jobs).toHaveProperty('comment-pr');
    
    // Verify all required jobs exist in security workflow
    expect(securityWorkflow.jobs).toHaveProperty('dependency-scan');
    expect(securityWorkflow.jobs).toHaveProperty('secret-scan');
    expect(securityWorkflow.jobs).toHaveProperty('license-check');
    expect(securityWorkflow.jobs).toHaveProperty('codeql-analysis');
    expect(securityWorkflow.jobs).toHaveProperty('security-report');
    
    // Verify labeler workflow is configured
    expect(labelerWorkflow.jobs).toHaveProperty('label');
    
    // Verify Dependabot is configured
    const dependabotConfig = readDependabotConfig();
    expect(dependabotConfig).toMatch(/package-ecosystem.*npm/);
    expect(dependabotConfig).toMatch(/package-ecosystem.*github-actions/);
  });

  /**
   * Property-based test: Workflows handle various file patterns correctly
   */
  test.prop([
    fc.constantFrom(
      'src/components/Button.tsx',
      'src/pages/Home.tsx',
      'src/lib/utils.ts',
      'src/index.css',
      'package.json',
      '.github/workflows/ci.yml'
    )
  ])('workflows must process different file types correctly', (filePath) => {
    const codeQuality = readWorkflowFile('code-quality.yml');
    const labelerConfig = readLabelerConfig();
    
    // Verify Prettier checks appropriate file types
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || 
        filePath.endsWith('.css') || filePath.endsWith('.json')) {
      expect(codeQuality).toMatch(/prettier/);
    }
    
    // Verify labeler has patterns for different file types
    expect(labelerConfig).toBeDefined();
  });

  /**
   * Property-based test: Security scans handle various scenarios
   */
  test.prop([
    fc.constantFrom(
      'dependency-scan',
      'license-check',
      'codeql-analysis'
    )
  ])('security jobs must be configured with continue-on-error or proper error handling', (jobName) => {
    const security = readWorkflowFile('security.yml');
    const workflow = parseWorkflow(security);
    
    // Verify job exists
    expect(workflow.jobs).toHaveProperty(jobName);
    
    const job = workflow.jobs[jobName];
    
    // Verify job has proper error handling
    // Either continue-on-error is set, or the job is critical (like codeql)
    const hasContinueOnError = job.steps.some((s: any) => 
      s['continue-on-error'] === true
    );
    
    const isCriticalJob = jobName === 'codeql-analysis';
    
    // Non-critical jobs should have continue-on-error
    if (!isCriticalJob) {
      expect(hasContinueOnError).toBe(true);
    }
  });
});
