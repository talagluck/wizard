import { createSkillProgram } from '@lib/programs/agent-skill/index';
import type { ProgramConfig, ProgramStep } from '@lib/programs/program-step';
import type { ProgramRun } from '@lib/agent/agent-runner';
import type { WizardSession } from '@lib/wizard-session';
import { AUDIT_CHECKS_KEY } from '@lib/programs/audit/types';
import { seedAuditLedger } from '@lib/programs/audit/seed';
import { FEATURE_FLAG_DRIFT_ABORT_CASES } from './detect.js';
import { FEATURE_FLAG_DRIFT_SEED_CHECKS } from './seed.js';

const FEATURE_FLAG_DRIFT_REPORT_FILE = 'posthog-feature-flag-drift-report.md';

const baseConfig = createSkillProgram({
  skillId: 'feature-flag-drift',
  command: 'feature-flag-drift',
  id: 'feature-flag-drift',
  description:
    "Audit where a project's feature flag code and PostHog's flag configuration have drifted apart",
  integrationLabel: 'feature-flag-drift',
  successMessage: `Feature flag drift check complete! View the report at ./${FEATURE_FLAG_DRIFT_REPORT_FILE}`,
  reportFile: FEATURE_FLAG_DRIFT_REPORT_FILE,
  docsUrl: 'https://posthog.com/docs/feature-flags/cleaning-up-stale-flags',
  spinnerMessage: 'Cross-referencing your flags against PostHog...',
  estimatedDurationMinutes: 5,
  requires: ['posthog-integration'],
  abortCases: FEATURE_FLAG_DRIFT_ABORT_CASES,
});

/**
 * Route `run` to the ledger-driven `audit-run` screen (AuditRunScreen)
 * instead of the generic `run` screen (RunScreen). RunScreen's progress
 * panel only reflects `TaskCreate`/`TaskUpdate` calls, which this skill is
 * explicitly told never to make (see the skill's description.md) — its
 * progress model is the audit ledger plus `[STATUS]` lines instead, and
 * AuditRunScreen is the screen that actually renders that ledger live.
 */
const featureFlagDriftSteps: ProgramStep[] = baseConfig.steps.map((step) =>
  step.id === 'run' ? { ...step, screenId: 'audit-run' } : step,
);

/**
 * Seed the audit ledger with this skill's 5 check ids before the agent
 * starts. `mcp__wizard-tools__audit_resolve_checks` rejects any id that
 * isn't already in the ledger, and step 2 of the skill resolves all 5 as
 * soon as it runs — without this, every one of those calls fails with
 * "unknown check id(s)".
 */
const featureFlagDriftRun = async (
  session: WizardSession,
): Promise<ProgramRun> => {
  seedAuditLedger(session.installDir, FEATURE_FLAG_DRIFT_SEED_CHECKS);
  session.frameworkContext[AUDIT_CHECKS_KEY] = FEATURE_FLAG_DRIFT_SEED_CHECKS;

  if (!baseConfig.run) {
    throw new Error('feature-flag-drift program has no run configuration.');
  }

  return typeof baseConfig.run === 'function'
    ? baseConfig.run(session)
    : baseConfig.run;
};

/**
 * `wizard audit feature-flag-drift` — read-only audit of drift between
 * feature-flag code and PostHog's live flag roster (ghost keys, stale
 * rollouts, unreferenced flags, multivariate-as-boolean reads, missing
 * metadata).
 *
 * `command`/`parentCommand` here are self-documentation only — matches the
 * convention `web-analytics-doctor` uses. The command doesn't reach a user
 * this way: `feature-flag-drift` is a context-mill skill promoted via its
 * own `cli:` block, so it's actually dispatched at runtime through
 * `dispatch-family.ts`'s `configForCliEntry`, which special-cases
 * skillId 'feature-flag-drift' onto this config instead of the generic
 * `agentSkillConfig` — the same mechanism (and the same reason: a real
 * ledger-backed checks list instead of the generic single-task run screen)
 * the comprehensive `audit` program already uses for skillId 'audit'.
 */
export const featureFlagDriftConfig: ProgramConfig = {
  ...baseConfig,
  parentCommand: 'audit',
  steps: featureFlagDriftSteps,
  run: featureFlagDriftRun,
};
