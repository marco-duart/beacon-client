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

export const Row = styled('tr', {
  cursor: 'pointer',
  '&:hover': { backgroundColor: '$surfaceHover' },
});

export const Td = styled('td', {
  padding: '$3',
  borderBottom: '1px solid $border',
  verticalAlign: 'middle',
});

export const IssueType = styled('div', {
  fontWeight: 600,
  fontFamily: '$mono',
  fontSize: '$2',
});

export const IssueMessage = styled('div', {
  color: '$textMuted',
  fontSize: '$2',
  maxWidth: '420px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const Count = styled('span', {
  fontWeight: 600,
});

export const TimeText = styled('span', {
  fontSize: '$2',
  color: '$textSubtle',
});
