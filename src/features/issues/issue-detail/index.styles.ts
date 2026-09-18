import { styled } from '@/theme';

export const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '$4',
  flexWrap: 'wrap',
});

export const TitleBlock = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
});

export const IssueType = styled('h2', {
  fontSize: '$5',
  fontFamily: '$mono',
});

export const IssueMessage = styled('p', {
  color: '$textMuted',
  fontSize: '$4',
});

export const MetaRow = styled('div', {
  display: 'flex',
  gap: '$3',
  flexWrap: 'wrap',
  alignItems: 'center',
});

export const MetaItem = styled('span', {
  fontSize: '$2',
  color: '$textSubtle',
});

export const ActionsRow = styled('div', {
  display: 'flex',
  gap: '$2',
});

export const EventCard = styled('div', {
  borderBottom: '1px solid $border',
  padding: '$4 0',

  '&:last-child': { borderBottom: 'none' },
});

export const EventMeta = styled('div', {
  display: 'flex',
  gap: '$3',
  fontSize: '$2',
  color: '$textSubtle',
  marginBottom: '$2',
  flexWrap: 'wrap',
});

export const Pre = styled('pre', {
  backgroundColor: '$bgSubtle',
  border: '1px solid $border',
  borderRadius: '$md',
  padding: '$3',
  fontFamily: '$mono',
  fontSize: '$2',
  overflowX: 'auto',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});

export const SectionTitle = styled('h3', {
  fontSize: '$4',
  fontWeight: 700,
});
