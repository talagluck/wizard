import { Text } from 'ink';
import { Colors } from '@ui/tui/styles';
import { VisualBox, type AreaSlide } from './shared.js';

/**
 * One panel, matching every sibling slide in this directory (installation,
 * eventCapture, ...) — this screen has no timer, `intro` renders in full
 * immediately (AuditAreaPane has no animation, it's gated on the ledger),
 * so a busy or multi-panel visual just reads as clutter. Lines kept to
 * 32 chars or under: this VisualBox's own border+paddingX, stacked on
 * AuditAreaPane's already-halved pane (SplitView's 50% split), leaves
 * less room than a flat ContentSequencer pane would — verified by
 * rendering this file's actual output, not just estimated.
 */
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
    "A flag's real configuration lives in PostHog. Your code only holds a key, so the two can quietly drift apart — with no crash to tell you it happened.",
    "We're checking both sides at once: ghost keys, stale rollouts, unreferenced flags, and misread variants.",
  ],
  visual: <FeatureFlagDriftVisual />,
  docsUrl: 'https://posthog.com/docs/feature-flags/cleaning-up-stale-flags',
};
