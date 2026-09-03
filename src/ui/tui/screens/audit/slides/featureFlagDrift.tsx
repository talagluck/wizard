import { Text } from 'ink';
import { Colors } from '@ui/tui/styles';
import { VisualBox, type AreaSlide } from './shared.js';

const FeatureFlagDriftVisual = () => (
  <VisualBox>
    <Text color="gray">{'┌──────────────────────────────┐'}</Text>
    <Text>
      <Text color="gray">{'│ '}</Text>
      <Text bold color={Colors.accent}>
        PostHog
      </Text>
      <Text color="gray">{'                      │'}</Text>
    </Text>
    <Text>
      <Text color="gray">{'│  '}</Text>
      <Text dimColor>{'rollout % · variants · rules'}</Text>
      <Text color="gray">{'│'}</Text>
    </Text>
    <Text color="gray">{'└──────────────────────────────┘'}</Text>
    <Text color="gray">{'            ╎'}</Text>
    <Text>
      <Text color={Colors.error}>{'       ⚠ '}</Text>
      <Text dimColor>{'can drift apart'}</Text>
    </Text>
    <Text color="gray">{'            ╎'}</Text>
    <Text color="gray">{'┌──────────────────────────────┐'}</Text>
    <Text>
      <Text color="gray">{'│ '}</Text>
      <Text bold color="cyan">
        Your Code
      </Text>
      <Text color="gray">{'                    │'}</Text>
    </Text>
    <Text>
      <Text color="gray">{'│  '}</Text>
      <Text dimColor>{'getFeatureFlag(key)'}</Text>
      <Text color="gray">{'         │'}</Text>
    </Text>
    <Text color="gray">{'└──────────────────────────────┘'}</Text>
  </VisualBox>
);

export const FeatureFlagDriftSlide: AreaSlide = {
  area: 'Feature Flag Drift',
  intro: [
    "A feature flag's real state lives in PostHog — its rollout percentage, its variants, who sees what. Your code only holds a key and asks for the value, so the two sides can quietly drift apart.",
    'A flag can go live in PostHog with no code ever calling it, or code can call a key PostHog has never heard of. The SDK never complains either way — it just falls back to a default, and the branch behind it never runs.',
    "A flag pinned at 100% (or 0%) for 30+ days with a live branch still on it is dead code nobody's watching. A multivariate flag read with a plain on/off check collapses every variant into true, discarding the information it was built to carry.",
    "None of this shows up from reading code alone — we're checking both sides at once.",
  ],
  visual: <FeatureFlagDriftVisual />,
  docsUrl: 'https://posthog.com/docs/feature-flags/cleaning-up-stale-flags',
};
