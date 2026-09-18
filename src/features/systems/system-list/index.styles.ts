import { styled } from '@/theme';

export const Table = styled('table', {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '$3',
});

export const Th = styled('th', {
  textAlign: 'left',
  padding: '$3',
  fontSize: '$1',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: '$textSubtle',
  borderBottom: '1px solid $border',
});

export const Td = styled('td', {
  padding: '$3',
  borderBottom: '1px solid $border',
  verticalAlign: 'middle',
});

export const SystemName = styled('div', {
  fontWeight: 600,
});

export const SystemSlug = styled('div', {
  fontSize: '$1',
  color: '$textSubtle',
  fontFamily: '$mono',
});

export const KeyPrefix = styled('code', {
  fontFamily: '$mono',
  fontSize: '$2',
  color: '$textMuted',
});

export const Actions = styled('div', {
  display: 'flex',
  gap: '$2',
  justifyContent: 'flex-end',
});
