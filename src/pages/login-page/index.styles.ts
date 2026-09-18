import { styled } from '@/theme';

export const Wrapper = styled('div', {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$bg',
  px: '$4',
});

export const Panel = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$6',
  width: '100%',
});

export const Brand = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$2',
  textAlign: 'center',
});

export const Logo = styled('img', {
  width: '72px',
  height: '72px',
  borderRadius: '$md',
  boxShadow: '$md',
});

export const Title = styled('h1', {
  fontSize: '$6',
  fontWeight: 700,
});

export const Subtitle = styled('p', {
  fontSize: '$3',
  color: '$textMuted',
});
