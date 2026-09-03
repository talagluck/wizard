import type { AreaSlide } from './shared.js';

// Visual dropped for now — see PR discussion. Text-only until the freeze
// reported on a live run is root-caused; re-add once that's resolved.
export const FeatureFlagDriftSlide: AreaSlide = {
  area: 'Feature Flag Drift',
  intro: [
    "A flag's real configuration lives in PostHog. Your code only holds a key, so the two can quietly drift apart — with no crash to tell you it happened.",
    "We're checking both sides at once: ghost keys, stale rollouts, unreferenced flags, and misread variants.",
  ],
  docsUrl: 'https://posthog.com/docs/feature-flags/cleaning-up-stale-flags',
};
