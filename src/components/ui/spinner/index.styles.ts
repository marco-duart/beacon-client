import { keyframes, styled } from '@/theme';

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const StyledSpinner = styled('span', {
  display: 'inline-block',
  width: '20px',
  height: '20px',
  border: '2px solid $border',
  borderTopColor: '$brand9',
  borderRadius: '$pill',
  animation: `${spin} 700ms linear infinite`,
});
