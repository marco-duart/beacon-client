import { styled } from '@/theme';

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  backgroundColor: '$successSoft',
  border: '1px solid $success9',
  borderRadius: '$md',
  padding: '$4',
});

export const Value = styled('code', {
  fontFamily: '$mono',
  fontSize: '$3',
  wordBreak: 'break-all',
  backgroundColor: '$surface',
  padding: '$2',
  borderRadius: '$sm',
});
