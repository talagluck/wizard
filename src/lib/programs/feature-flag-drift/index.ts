import { createSkillProgram } from '@lib/programs/agent-skill/index';
import type { ProgramConfig } from '@lib/programs/program-step';
import { getContentBlocks } from './content/index.js';

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
});

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
 * Learn deck instead of the generic 3-line agent-skill filler) the
 * comprehensive `audit` program already uses for skillId 'audit'.
 */
export const featureFlagDriftConfig: ProgramConfig = {
  ...baseConfig,
  parentCommand: 'audit',
  getContentBlocks,
};
