import type { ReactNode } from 'react';
import { Description, Title, Wrapper } from './index.styles';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {description ? <Description>{description}</Description> : null}
      {action}
    </Wrapper>
  );
}
