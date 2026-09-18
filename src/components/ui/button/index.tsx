import type { ComponentProps } from 'react';
import { StyledButton } from './index.styles';

export type ButtonProps = ComponentProps<typeof StyledButton> & {
  isLoading?: boolean;
};

export function Button({
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton disabled={disabled || isLoading} {...props}>
      {isLoading ? 'Loading…' : children}
    </StyledButton>
  );
}
