import { styled } from '@/theme';

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
  textAlign: 'center',
  py: '$7',
  color: '$textMuted',
});

export const Title = styled('p', {
  fontSize: '$4',
  fontWeight: 600,
  color: '$text',
});

export const Description = styled('p', {
  fontSize: '$3',
  color: '$textMuted',
  maxWidth: '360px',
});
