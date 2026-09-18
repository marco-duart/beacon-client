import { styled } from '@/theme';

export const Wrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '$3',
  padding: '$3 $4',
});

export const PageInfo = styled('span', {
  fontSize: '$2',
  color: '$textMuted',
});
