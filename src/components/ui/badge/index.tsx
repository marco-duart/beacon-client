import type { ComponentProps } from 'react';
import { StyledBadge } from './index.styles';

export type BadgeProps = ComponentProps<typeof StyledBadge>;

export function Badge(props: BadgeProps) {
  return <StyledBadge {...props} />;
}
