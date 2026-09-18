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

export const Email = styled('div', {
  fontWeight: 600,
});

export const YouTag = styled('span', {
  marginLeft: '$2',
  fontSize: '$1',
  color: '$textSubtle',
  fontWeight: 400,
});

export const RoleSelect = styled('select', {
  border: '1px solid $border',
  borderRadius: '$md',
  backgroundColor: '$surface',
  color: '$text',
  px: '$2',
  py: '6px',
  fontSize: '$2',
  outline: 'none',

  '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
});

export const Actions = styled('div', {
  display: 'flex',
  gap: '$2',
  justifyContent: 'flex-end',
});

export const RevealRow = styled('tr', {
  backgroundColor: '$successSoft',
});

export const RevealCell = styled('td', {
  padding: '$3',
  fontFamily: '$mono',
  fontSize: '$2',
});
