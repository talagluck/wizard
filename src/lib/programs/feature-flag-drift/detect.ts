import type { AbortCase } from '@lib/agent/agent-runner';
import { ErrorCodes } from '@lib/errors';

/** `[ABORT] <reason>` cases the feature-flag-drift skill can emit. Reason
 *  strings are defined in the skill's `Abort statuses` section. */
export const FEATURE_FLAG_DRIFT_ABORT_CASES: AbortCase[] = [
  {
    match: /^no posthog feature flag usage found$/i,
    errorCode: ErrorCodes.DetectNoFeatureFlagUsage,
    message: 'No feature flag usage found',
    body:
      'This audit cross-references feature-flag call sites against PostHog’s ' +
      'flag roster, so it needs at least one to exist. No flag-eval call ' +
      'sites (getFeatureFlag, isFeatureEnabled, and their language ' +
      'equivalents) were found anywhere in this project. Add feature flags ' +
      'first, or point the audit at a project that already uses them.',
    docsUrl: 'https://posthog.com/docs/feature-flags',
  },
];
