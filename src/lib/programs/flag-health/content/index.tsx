/**
 * Flag-health learn-deck — plays while the audit cross-references feature
 * flag code against PostHog's live flag roster. Written for someone who
 * has never audited flags before: each scene names one way code and
 * PostHog drift apart, with a one-line throwaway example, not just a
 * label. Deliberately no persistent example flag across scenes — each
 * check gets its own disposable illustration so a reader isn't tracking a
 * story arc, and so nothing here reads as a claim about the project this
 * audit is about to actually inspect.
 *
 * The report itself never surfaces these checks' kebab-case ids (it
 * renders human labels only — see context-mill flag-health skill,
 * references/3-report.md), so this deck doesn't pre-teach them either.
 */

import { TextRevealMode } from '@ui/tui/primitives/TextBlock';
import type { ContentBlock } from '@ui/tui/primitives/content-types';
import type { WizardStore } from '@ui/tui/store';

const CLEAR: ContentBlock = { type: 'clear', pause: 1800 };

export const getContentBlocks = (_store?: WizardStore): ContentBlock[] => [
  // Scene 1 — orient
  {
    content: 'Welcome.',
    pause: 3000,
    mode: TextRevealMode.Typewriter,
    animationInterval: 160,
  },

  { content: 'The Wizard is an agent.', pause: 4000 },

  {
    content: "It's checking whether your flag code and PostHog still agree.",
    pause: 5000,
  },

  CLEAR,

  // Scene 2 — the core idea
  {
    content: 'A feature flag lives in two places at once.',
    pause: 4000,
  },

  {
    content: 'Your code calls it. PostHog decides what it returns.',
    pause: 4500,
  },

  {
    content:
      'Those two places can quietly drift apart — no crash, no error, nothing in a stack trace.',
    pause: 6000,
  },

  { content: "Here's what that drift looks like.", pause: 3000 },

  CLEAR,

  // Scene 3 — active but unreferenced
  {
    content: 'A flag can be live in PostHog with no code calling it anywhere.',
    pause: 5000,
  },

  {
    content:
      "PostHog still evaluates it — and bills for it — on every request. Nobody's using it.",
    pause: 6000,
  },

  CLEAR,

  // Scene 4 — ghost flag key
  {
    content:
      'Or the reverse: code calls a flag key PostHog has never heard of.',
    pause: 5500,
  },

  {
    content: 'Deleted, renamed, or just a typo — the SDK never complains.',
    pause: 5000,
  },

  {
    content: 'It silently returns false. The branch behind it never runs.',
    pause: 5000,
    mode: TextRevealMode.SentenceFade,
  },

  CLEAR,

  // Scene 5 — stale full rollout
  {
    content:
      'A flag pinned at 100% (or 0%) for a month, with code still branching on it.',
    pause: 6000,
  },

  {
    content:
      "The decision's already made. That branch is dead weight nobody can reason about.",
    pause: 6000,
  },

  CLEAR,

  // Scene 6 — multivariate read as boolean
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
      'Whatever that flag was built to tell apart, the code can no longer see.',
    pause: 5500,
  },

  CLEAR,

  // Scene 7 — missing metadata (the exception: no code side)
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

  // Scene 8 — why this needs both sides
  {
    content: 'None of this shows up from reading code alone.',
    pause: 4000,
  },

  {
    content:
      'It only shows up by checking your code against what PostHog actually has, side by side.',
    pause: 5500,
  },

  { content: "That's what this audit does.", pause: 5000 },
];
