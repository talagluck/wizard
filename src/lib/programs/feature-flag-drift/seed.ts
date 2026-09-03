import type { AuditCheck } from '@lib/programs/audit/types';

/**
 * The 5 roster-alignment checks the feature-flag-drift skill resolves in its
 * step 2. Ids match what the skill's `2-roster-checks.md` resolves via
 * `mcp__wizard-tools__audit_resolve_checks` — keep both in sync; an id here
 * that the skill doesn't resolve just sits at `pending` forever, and an id
 * the skill resolves that isn't here makes that call fail with "unknown
 * check id(s)".
 */
export const FEATURE_FLAG_DRIFT_SEED_CHECKS: AuditCheck[] = [
  {
    id: 'ff-active-but-unreferenced',
    area: 'Feature Flag Drift',
    label: 'Active flags referenced in code',
    status: 'pending',
  },
  {
    id: 'ff-ghost-flag-key',
    area: 'Feature Flag Drift',
    label: 'Code flag keys exist in PostHog',
    status: 'pending',
  },
  {
    id: 'ff-stale-full-rollout',
    area: 'Feature Flag Drift',
    label: 'No dead branches on stale rollouts',
    status: 'pending',
  },
  {
    id: 'ff-multivariate-as-boolean',
    area: 'Feature Flag Drift',
    label: 'Multivariate flags read correctly',
    status: 'pending',
  },
  {
    id: 'ff-flag-missing-metadata',
    area: 'Feature Flag Drift',
    label: 'Long-lived flags have a lifecycle tag',
    status: 'pending',
  },
];
