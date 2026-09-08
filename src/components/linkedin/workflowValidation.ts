import { LinkedInStep } from '../../context/LinkedInContext';

export interface WorkflowValidationIssue {
  id: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  stepId?: string;
  stepTitle?: string;
  branch?: 'main' | 'yes' | 'no';
  actionHint?: string;
}

export interface WorkflowBranchAnalysis {
  conditionId: string;
  conditionTitle: string;
  isYesEmpty: boolean;
  isNoEmpty: boolean;
  isYesTerminated: boolean;
  isNoTerminated: boolean;
  pattern: 'independent_termination' | 'merged' | 'yes_only_continues' | 'no_only_continues' | 'independent_open';
}

export interface WorkflowValidationResult {
  isValid: boolean; // False if errors exist
  canLaunch: boolean; // Can proceed to launch
  errors: WorkflowValidationIssue[];
  warnings: WorkflowValidationIssue[];
  totalSteps: number;
  emptyBranchCount: number;
  branchAnalyses: WorkflowBranchAnalysis[];
}

/**
 * Recursively analyzes and validates the LinkedIn Automation Sequence tree.
 * Protects against broken edges, empty branches, missing configurations, and invalid states.
 */
export function validateSequenceGraph(sequence: LinkedInStep[]): WorkflowValidationResult {
  const errors: WorkflowValidationIssue[] = [];
  const warnings: WorkflowValidationIssue[] = [];
  const seenIds = new Set<string>();
  const branchAnalyses: WorkflowBranchAnalysis[] = [];
  let totalSteps = 0;
  let emptyBranchCount = 0;

  function traverse(steps: LinkedInStep[], parentBranch: 'main' | 'yes' | 'no' = 'main', parentConditionTitle?: string) {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      totalSteps++;

      // 1. Check duplicate step IDs
      if (seenIds.has(step.id)) {
        errors.push({
          id: `dup_${step.id}`,
          severity: 'error',
          message: `Duplicate step ID detected: "${step.title}" (${step.id})`,
          stepId: step.id,
          stepTitle: step.title,
          branch: parentBranch,
          actionHint: 'Duplicate nodes are invalid; ensure all step IDs are unique.',
        });
      } else {
        seenIds.add(step.id);
      }

      // 2. Validate step configuration
      if (step.type === 'connect') {
        const note = step.config?.note || '';
        if (note.length > 300) {
          errors.push({
            id: `char_limit_${step.id}`,
            severity: 'error',
            message: `Connection request note in "${step.title}" exceeds LinkedIn 300 character limit (${note.length}/300 chars)`,
            stepId: step.id,
            stepTitle: step.title,
            branch: parentBranch,
            actionHint: 'Shorten the invite message to under 300 characters.',
          });
        }
      } else if (step.type === 'message') {
        const body = step.config?.body?.trim() || '';
        if (!body) {
          warnings.push({
            id: `empty_body_${step.id}`,
            severity: 'warning',
            message: `Direct Message "${step.title}" has no message content configured.`,
            stepId: step.id,
            stepTitle: step.title,
            branch: parentBranch,
            actionHint: 'Add message copy in the Node Inspector.',
          });
        }
      } else if (step.type === 'email' || step.type === 'inmail') {
        const subject = step.config?.subject?.trim() || '';
        const body = step.config?.body?.trim() || '';
        if (!subject) {
          warnings.push({
            id: `empty_subject_${step.id}`,
            severity: 'warning',
            message: `Subject line is missing for "${step.title}".`,
            stepId: step.id,
            stepTitle: step.title,
            branch: parentBranch,
            actionHint: 'Add a subject line in the Node Inspector.',
          });
        }
        if (!body) {
          warnings.push({
            id: `empty_body_${step.id}`,
            severity: 'warning',
            message: `Body text is missing for "${step.title}".`,
            stepId: step.id,
            stepTitle: step.title,
            branch: parentBranch,
            actionHint: 'Add body copy in the Node Inspector.',
          });
        }
      }

      // 3. Condition Split validation
      if (step.type === 'condition') {
        const yesSteps = step.yesBranch || [];
        const noSteps = step.noBranch || [];
        const isYesEmpty = yesSteps.length === 0;
        const isNoEmpty = noSteps.length === 0;

        if (isYesEmpty) {
          emptyBranchCount++;
          warnings.push({
            id: `empty_yes_${step.id}`,
            severity: 'warning',
            message: `YES branch in condition "${step.title}" has no steps configured.`,
            stepId: step.id,
            stepTitle: step.title,
            branch: 'yes',
            actionHint: 'Add an action or conclusion to the YES path.',
          });
        }

        if (isNoEmpty) {
          emptyBranchCount++;
          warnings.push({
            id: `empty_no_${step.id}`,
            severity: 'warning',
            message: `NO branch in condition "${step.title}" has no steps configured.`,
            stepId: step.id,
            stepTitle: step.title,
            branch: 'no',
            actionHint: 'Add an action or conclusion to the NO path.',
          });
        }

        const isYesTerminated = yesSteps.length > 0 && yesSteps[yesSteps.length - 1].type === 'stop';
        const isNoTerminated = noSteps.length > 0 && noSteps[noSteps.length - 1].type === 'stop';
        const hasDownstream = i < steps.length - 1;

        let pattern: WorkflowBranchAnalysis['pattern'] = 'independent_open';
        if (isYesTerminated && isNoTerminated) {
          pattern = 'independent_termination'; // Pattern A
        } else if (!isYesTerminated && !isNoTerminated && (hasDownstream || step.mergeBranches !== false)) {
          pattern = 'merged'; // Pattern B
        } else if (!isYesTerminated && isNoTerminated) {
          pattern = 'yes_only_continues'; // Pattern C
        } else if (isYesTerminated && !isNoTerminated) {
          pattern = 'no_only_continues'; // Pattern D
        } else {
          pattern = 'independent_open'; // Pattern E
        }

        branchAnalyses.push({
          conditionId: step.id,
          conditionTitle: step.title,
          isYesEmpty,
          isNoEmpty,
          isYesTerminated,
          isNoTerminated,
          pattern,
        });

        // Traverse sub-branches
        if (yesSteps.length > 0) {
          traverse(yesSteps, 'yes', step.title);
        }
        if (noSteps.length > 0) {
          traverse(noSteps, 'no', step.title);
        }
      }
    }
  }

  traverse(sequence, 'main');

  const isValid = errors.length === 0;
  // Can launch if no critical errors (warnings about empty branches are noted but allow execution)
  const canLaunch = errors.length === 0 && totalSteps > 0;

  return {
    isValid,
    canLaunch,
    errors,
    warnings,
    totalSteps,
    emptyBranchCount,
    branchAnalyses,
  };
}
