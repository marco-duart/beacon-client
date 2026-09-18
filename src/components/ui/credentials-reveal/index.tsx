import type { ReactNode } from 'react';
import { Value, Wrapper } from './index.styles';

interface CredentialsRevealProps {
  title: ReactNode;
  description: ReactNode;
  value: string;
}

/** Shows a secret exactly once (API key, temporary password, ...) right after it's issued. */
export function CredentialsReveal({
  title,
  description,
  value,
}: CredentialsRevealProps) {
  return (
    <Wrapper>
      <strong>{title}</strong>
      <span>{description}</span>
      <Value>{value}</Value>
    </Wrapper>
  );
}
