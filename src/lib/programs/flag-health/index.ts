import { createSkillProgram } from '@lib/programs/agent-skill/index';
import type { ProgramConfig } from '@lib/programs/program-step';
import { getContentBlocks } from './content/index.js';

const FLAG_HEALTH_REPORT_FILE = 'posthog-flag-health-report.md';

const baseConfig = createSkillProgram({
  skillId: 'flag-health',
  command: 'flag-health',
  id: 'flag-health',
  description:
    "Audit where a project's feature flag code and PostHog's flag configuration have drifted apart",
  integrationLabel: 'flag-health',
  successMessage: `Flag health check complete! View the report at ./${FLAG_HEALTH_REPORT_FILE}`,
  reportFile: FLAG_HEALTH_REPORT_FILE,
  docsUrl: 'https://posthog.com/docs/feature-flags/cleaning-up-stale-flags',
  spinnerMessage: 'Cross-referencing your flags against PostHog...',
  estimatedDurationMinutes: 5,
  requires: ['posthog-integration'],
});

/**
 * `wizard audit flag-health` — read-only audit of drift between feature-flag
 * code and PostHog's live flag roster (ghost keys, stale rollouts,
 * unreferenced flags, multivariate-as-boolean reads, missing metadata).
 *
 * `command`/`parentCommand` here are self-documentation only — matches the
 * convention `web-analytics-doctor` uses. The command doesn't reach a user
 * this way: `flag-health` is a context-mill skill promoted via its own
 * `cli:` block, so it's actually dispatched at runtime through
 * `dispatch-family.ts`'s `configForCliEntry`, which special-cases
 * skillId 'flag-health' onto this config instead of the generic
 * `agentSkillConfig` — the same mechanism (and the same reason: a real
 * Learn deck instead of the generic 3-line agent-skill filler) the
 * comprehensive `audit` program already uses for skillId 'audit'.
 */
export const flagHealthConfig: ProgramConfig = {
  ...baseConfig,
  parentCommand: 'audit',
  getContentBlocks,
};
