import {
  issuesControllerFindAllQueryParamsLevelEnum,
  issuesControllerFindAllQueryParamsStatusEnum,
} from '@/api/generated';
import type { BadgeProps } from '@/components/ui/badge';

export const ISSUE_LEVELS = Object.values(
  issuesControllerFindAllQueryParamsLevelEnum,
);
export const ISSUE_STATUSES = Object.values(
  issuesControllerFindAllQueryParamsStatusEnum,
);

export const LEVEL_TONE: Record<string, BadgeProps['tone']> = {
  fatal: 'danger',
  error: 'danger',
  warning: 'warning',
  info: 'info',
};

export const STATUS_TONE: Record<string, BadgeProps['tone']> = {
  open: 'brand',
  resolved: 'success',
  ignored: 'neutral',
};

export const STATUS_LABELS: Record<string, string> = {
  open: 'Aberta',
  resolved: 'Resolvida',
  ignored: 'Ignorada',
};
