import { Text } from 'ink';
import { Colors } from '@ui/tui/styles';
import { TextRevealMode } from '@ui/tui/primitives/index';
import type { ContentBlock } from '@ui/tui/primitives/index';
import type { AreaSlide } from './shared.js';

const CLEAR: ContentBlock = { type: 'clear', pause: 1800 };

/**
 * CONFIG_DRIFT_BLOCK — the deck's core-idea diagram: PostHog holds the
 * actual configuration (rollout, variants, rules); code only holds a key
 * and asks for the value. The two can silently disagree. Box width (30
 * chars between borders, 34 total) matches posthog-integration's
 * data-flow.tsx convention — comfortably inside this pane's ~37-char
 * width at an 80-column terminal (see AuditAreaPane's paneWidth math).
 */
const CONFIG_DRIFT_BLOCK: ContentBlock = {
  type: 'lines',
  interval: 400,
  pause: 7000,
  lines: [
    <Text color="gray">{'  ┌──────────────────────────────┐'}</Text>,
    <Text>
      <Text color="gray">{'  │ '}</Text>
      <Text bold color={Colors.accent}>
        PostHog
      </Text>
      <Text color="gray">{'                      │'}</Text>
    </Text>,
    <Text>
      <Text color="gray">{'  │  '}</Text>
      <Text dimColor>{'rollout % · variants · rules'}</Text>
      <Text color="gray">{'│'}</Text>
    </Text>,
    <Text color="gray">{'  └──────────────────────────────┘'}</Text>,
    <Text color="gray">{'              ╎'}</Text>,
    <Text>
      <Text color={Colors.error}>{'         ⚠ '}</Text>
      <Text dimColor>{'can drift apart'}</Text>
    </Text>,
    <Text color="gray">{'              ╎'}</Text>,
    <Text color="gray">{'  ┌──────────────────────────────┐'}</Text>,
    <Text>
      <Text color="gray">{'  │ '}</Text>
      <Text bold color="cyan">
        Your Code
      </Text>
      <Text color="gray">{'                    │'}</Text>
    </Text>,
    <Text>
      <Text color="gray">{'  │  '}</Text>
      <Text dimColor>{'getFeatureFlag(key)'}</Text>
      <Text color="gray">{'         │'}</Text>
    </Text>,
    <Text color="gray">{'  └──────────────────────────────┘'}</Text>,
  ],
};

/**
 * GHOST_FLAG_BLOCK — before/after pair illustrating a ghost flag key.
 * Same device as error-tracking-upload-source-maps's MINIFIED_TRACE /
 * RESOLVED_TRACE: a dim, red "broken" example next to a cyan/green
 * "working" one, so the difference reads at a glance. Every line is kept
 * to 37 chars or under — this pane's width at an 80-column terminal.
 */
const GHOST_FLAG_BLOCK: ContentBlock = {
  type: 'lines',
  interval: 400,
  pause: 7000,
  lines: [
    <Text dimColor>{'example — no matching PostHog flag'}</Text>,
    <Text>
      <Text dimColor>{'  isFeatureEnabled('}</Text>
      <Text color={Colors.error}>{"'hint-enabled'"}</Text>
      <Text dimColor>{')'}</Text>
    </Text>,
    <Text>
      <Text dimColor>{'    → '}</Text>
      <Text color={Colors.error}>false</Text>
      <Text dimColor>{', every time'}</Text>
    </Text>,
    <Text> </Text>,
    <Text dimColor>{'example — a flag that exists'}</Text>,
    <Text>
      <Text dimColor>{'  isFeatureEnabled('}</Text>
      <Text color="cyan">{"'timer-enabled'"}</Text>
      <Text dimColor>{')'}</Text>
    </Text>,
    <Text>
      <Text dimColor>{'    → '}</Text>
      <Text color={Colors.success}>{'the real value'}</Text>
    </Text>,
  ],
};

/**
 * DEAD_BRANCH_BLOCK — a flag pinned at 100% still has a live `if`/`else`
 * in the code. One side of that branch runs every time; the other is
 * already dead. Rendered dim from the start (Ink's `lines` block reveals
 * rows on a timer, it doesn't tween a single row's opacity, so "already
 * faded" is what stands in for "drifting away"). Every line kept to
 * 37 chars or under — this pane's width at an 80-column terminal.
 */
const DEAD_BRANCH_BLOCK: ContentBlock = {
  type: 'lines',
  interval: 400,
  pause: 7000,
  lines: [
    <Text dimColor>{'flag pinned at 100%'}</Text>,
    <Text color="gray">{'      │'}</Text>,
    <Text>
      <Text color="gray">{'      ├─▶ '}</Text>
      <Text bold color={Colors.success}>
        true
      </Text>
      <Text dimColor>{'   ← every time'}</Text>
    </Text>,
    <Text color="gray">{'      │'}</Text>,
    <Text>
      <Text color="gray">{'      └─▶ '}</Text>
      <Text dimColor>{'false  (dead code)'}</Text>
    </Text>,
  ],
};

/**
 * Scene-by-scene beats ported from the retired flag-health Learn deck
 * (getContentBlocks) — same pacing, reveal-mode overrides, and the three
 * diagrams that were built for it in review but never landed before the
 * screen got rewired to the ledger-driven audit-run pane. This plays for
 * the whole audit (a few minutes), not just an intro: it's the only
 * thing animating in this pane while the 5 checks resolve in the
 * background, so it needs enough beats — and enough non-text motion via
 * the `lines` diagrams — to span that wait without going static early.
 */
const FEATURE_FLAG_DRIFT_INTRO: ContentBlock[] = [
  // Scene 1 — the core idea
  {
    content:
      'A feature flag is configured in PostHog — its rollout, its variants, who sees what.',
    pause: 5000,
  },
  {
    content: 'Your code just holds a key, and asks for the value.',
    pause: 4500,
  },
  {
    content:
      "What's configured and what your code assumes can quietly drift apart.",
    pause: 5000,
  },
  { content: "Here's what that looks like.", pause: 2500 },
  CONFIG_DRIFT_BLOCK,
  CLEAR,

  // Scene 2 — active but unreferenced
  {
    content: 'A flag can be live in PostHog with no code calling it anywhere.',
    pause: 5000,
  },
  {
    content:
      "PostHog still evaluates it every time your app checks in. Nobody's using it.",
    pause: 6000,
  },
  CLEAR,

  // Scene 3 — ghost flag key
  {
    content:
      'Or the reverse: code calls a flag key PostHog has never heard of.',
    pause: 5500,
  },
  {
    content:
      'Maybe it was deleted. Maybe renamed. The SDK never complains either way.',
    pause: 5000,
  },
  GHOST_FLAG_BLOCK,
  {
    content:
      'It quietly falls back to a default — false, most of the time. The branch behind it never runs.',
    pause: 6500,
    mode: TextRevealMode.SentenceFade,
  },
  CLEAR,

  // Scene 4 — stale full rollout
  {
    content:
      'A flag pinned at 100% (or 0%) for a month, with code still branching on it.',
    pause: 6000,
  },
  DEAD_BRANCH_BLOCK,
  {
    content:
      "The decision's already made — that branch just sits there, dead weight nobody's watching.",
    pause: 6500,
  },
  CLEAR,

  // Scene 5 — multivariate read as boolean
  {
    content:
      'A flag can carry more than on/off: control, treatment-a, treatment-b.',
    pause: 5500,
  },
  {
    content:
      "Code that only asks 'is this on?' collapses every variant into true.",
    pause: 5500,
  },
  {
    content:
      "The code just sees true. It can't tell treatment-a from treatment-b.",
    pause: 5500,
  },
  CLEAR,

  // Scene 6 — missing metadata (the exception: no code side)
  {
    content: "One more, and it's different — no code involved at all.",
    pause: 4500,
  },
  {
    content:
      "A flag that's fully decided and untouched for months, with no tag saying why it's still around.",
    pause: 6500,
  },
  {
    content:
      'No way to tell "deliberate kill switch" from "everyone forgot about this."',
    pause: 5500,
  },
  CLEAR,

  // Scene 7 — why this needs both sides
  { content: 'None of this shows up from reading code alone.', pause: 4000 },
  { content: 'You only catch it by checking both sides at once.', pause: 5500 },
  { content: "That's what this audit does.", pause: 5000 },
];

export const FeatureFlagDriftSlide: AreaSlide = {
  area: 'Feature Flag Drift',
  intro: FEATURE_FLAG_DRIFT_INTRO,
  docsUrl: 'https://posthog.com/docs/feature-flags/cleaning-up-stale-flags',
};
