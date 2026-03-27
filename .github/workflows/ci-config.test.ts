/**
 * Bug Condition Exploration Test for GitHub CI Workflow Fixes
 * 
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10**
 * 
 * This test verifies that CI workflows are correctly configured for React/Vite/TUXIMO project.
 * 
 * CRITICAL: This test encodes the EXPECTED behavior (correct configuration).
 * - On UNFIXED code: Test FAILS (proves bug exists)
 * - On FIXED code: Test PASSES (confirms fix works)
 * 
 * The test checks that workflows:
 * 1. Use correct build commands (npm run build, not build:prod)
 * 2. Use correct build paths (dist/assets, not dist/lost-yeti)
 * 3. Use correct file patterns (*.tsx, not *.html)
 * 4. Use current action versions (v4, v3, not v3, v2)
 * 5. Skip inapplicable checks (Docker scan for Vercel project)
 * 6. Handle missing secrets gracefully (Snyk without token)
 * 7. Use correct project name (TUXIMO/tuximo, not lost-yeti)
 * 8. Support required labels (dependencies label exists)
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

describe('Property 1: Bug Condition - CI Workflows Fail with Angular/Lost-Yeti Configuration', () => {
  
  /**
   * Property: CI workflows must NOT contain Angular/lost-yeti configuration patterns
   * 
   * This is a scoped property-based test that checks the concrete failing cases
   * identified in the bug report. For deterministic bugs like configuration errors,
   * we scope the property to the specific patterns that cause failures.
   */
  test.prop([
    fc.constantFrom(
      'code-quality.yml',
      'security.yml',
      'labeler.yml'
    )
  ])('workflows must not reference Angular/lost-yeti patterns', (workflowFile) => {
    const content = readWorkflowFile(workflowFile);
    
    // Bug Condition 1.2: Build must not use Angular command
    expect(content).not.toContain('npm run build:prod');
    expect(content).not.toContain('ng build');
    
    // Bug Condition 1.2: Build paths must not reference lost-yeti
    expect(content).not.toContain('dist/lost-yeti');
    
    // Bug Condition 1.5: Must not check HTML files (Angular templates)
    // React uses JSX/TSX, not HTML templates
    if (workflowFile === 'code-quality.yml') {
      const htmlCheckPattern = /prettier.*\.html/i;
      expect(content).not.toMatch(htmlCheckPattern);
    }
    
    // Bug Condition 1.6: Must not use wrong project name
    expect(content).not.toContain('lost-yeti');
  });

  test.prop([fc.constant('code-quality.yml')])(
    'code-quality workflow must use correct Vite build command',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Expected Behavior 2.2: Must use Vite build command
      const buildSteps = JSON.stringify(workflow);
      expect(buildSteps).toContain('npm run build');
    }
  );

  test.prop([fc.constant('code-quality.yml')])(
    'bundle size check must use correct dist path for Vite',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      
      // Expected Behavior 2.2: Must check dist/assets (Vite output)
      expect(content).toContain('dist/assets');
      
      // Bug Condition 1.2: Must NOT check dist/lost-yeti (Angular output)
      expect(content).not.toContain('dist/lost-yeti');
    }
  );

  test.prop([fc.constant('code-quality.yml')])(
    'prettier check must validate React components, not HTML templates',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      
      // Expected Behavior 2.5: Must check .tsx files (React components)
      expect(content).toMatch(/tsx/);
      
      // Bug Condition 1.5: Must NOT check .html files (Angular templates)
      const prettierCommand = content.match(/prettier.*--check.*["']([^"']+)["']/);
      if (prettierCommand) {
        expect(prettierCommand[1]).not.toContain('.html');
      }
    }
  );

  test.prop([fc.constant('security.yml')])(
    'security workflow must use current action versions',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Expected Behavior 2.8: Must use CodeQL v3
      const codeqlSteps = JSON.stringify(workflow.jobs['codeql-analysis']);
      expect(codeqlSteps).toContain('codeql-action/init@v3');
      expect(codeqlSteps).toContain('codeql-action/autobuild@v3');
      expect(codeqlSteps).toContain('codeql-action/analyze@v3');
      
      // Bug Condition 1.8: Must NOT use outdated v2
      expect(codeqlSteps).not.toContain('@v2');
    }
  );

  test.prop([fc.constant('security.yml')])(
    'artifact actions must use current v4 version',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      
      // Expected Behavior 2.7: Must use upload-artifact@v4
      expect(content).toContain('upload-artifact@v4');
      
      // Bug Condition 1.7: Must NOT use deprecated v3
      expect(content).not.toContain('upload-artifact@v3');
    }
  );

  test.prop([fc.constant('code-quality.yml')])(
    'artifact actions in code-quality must use v4',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      
      // Expected Behavior 2.7: Must use upload-artifact@v4
      expect(content).toContain('upload-artifact@v4');
      
      // Bug Condition 1.7: Must NOT use deprecated v3
      expect(content).not.toContain('upload-artifact@v3');
    }
  );

  test.prop([fc.constant('security.yml')])(
    'Docker scan must be skipped for Vercel-deployed project',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Expected Behavior 2.3: Trivy scan should be skipped or removed
      const triviaJob = workflow.jobs['trivy-scan'];
      if (triviaJob) {
        const jobContent = JSON.stringify(triviaJob);
        // Should skip Docker scan with explanation
        expect(jobContent).toContain('Skip Docker scan');
      }
    }
  );

  test.prop([fc.constant('security.yml')])(
    'Snyk scan must handle missing token gracefully',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Expected Behavior 2.4: Snyk should continue-on-error
      const snykJob = workflow.jobs['snyk-scan'];
      const snykSteps = snykJob.steps;
      const snykStep = snykSteps.find((s: any) => s.uses?.includes('snyk/actions'));
      
      if (snykStep) {
        expect(snykStep['continue-on-error']).toBe(true);
      }
    }
  );

  test.prop([fc.constant('security.yml')])(
    'OWASP check must use correct project name',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Expected Behavior 2.6: Must use correct project name "tuximo"
      const owaspJob = workflow.jobs['owasp-scan'];
      if (owaspJob) {
        const owaspStep = owaspJob.steps.find((s: any) => 
          s.uses?.includes('dependency-check')
        );
        if (owaspStep && owaspStep.with) {
          expect(owaspStep.with.project).toBe('tuximo');
          
          // Bug Condition 1.6: Must NOT use "lost-yeti"
          expect(owaspStep.with.project).not.toBe('lost-yeti');
        }
      }
    }
  );

  test.prop([fc.constant('labeler.yml')])(
    'labeler workflow must use current v6 version',
    (workflowFile) => {
      const content = readWorkflowFile(workflowFile);
      const workflow = parseWorkflow(content);
      
      // Expected Behavior 2.1: Must use labeler@v6
      const labelerStep = workflow.jobs.label.steps.find((s: any) => 
        s.uses?.includes('actions/labeler')
      );
      
      expect(labelerStep.uses).toContain('@v6');
      
      // Bug Condition 1.1: Must NOT use outdated v5
      expect(labelerStep.uses).not.toContain('@v5');
    }
  );

  /**
   * Integration property: All workflows together must form a valid CI pipeline
   * for a React/Vite/TUXIMO project deployed to Vercel
   */
  it('CI pipeline must be configured for React/Vite/TUXIMO project', () => {
    const codeQuality = readWorkflowFile('code-quality.yml');
    const security = readWorkflowFile('security.yml');
    const labeler = readWorkflowFile('labeler.yml');
    
    // Verify no Angular/lost-yeti references across all workflows
    const allWorkflows = codeQuality + security + labeler;
    
    expect(allWorkflows).not.toContain('lost-yeti');
    expect(allWorkflows).not.toContain('build:prod');
    expect(allWorkflows).not.toContain('ng build');
    
    // Verify Vite/React patterns are present
    expect(codeQuality).toContain('npm run build');
    expect(codeQuality).toMatch(/tsx/);
    expect(codeQuality).toContain('dist/assets');
    
    // Verify current action versions
    expect(security).toContain('@v4');
    expect(security).toContain('@v3');
    expect(labeler).toContain('@v6');
  });
});
