import { styled } from '@/theme';

export const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '$4',

  '@media (max-width: 860px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

export const Tile = styled('div', {
  backgroundColor: '$surface',
  border: '1px solid $border',
  borderRadius: '$lg',
  padding: '$4',
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
});

export const TileLabel = styled('span', {
  fontSize: '$2',
  color: '$textMuted',
});

export const TileValue = styled('span', {
  fontSize: '$7',
  fontWeight: 600,
  fontVariantNumeric: 'proportional-nums',
});

export const Section = styled('div', {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '$4',

  '@media (max-width: 860px)': {
    gridTemplateColumns: '1fr',
  },
});

export const SectionTitle = styled('h3', {
  fontSize: '$4',
  fontWeight: 700,
  marginBottom: '$4',
});

export const ChartRow = styled('div', {
  display: 'flex',
  alignItems: 'flex-end',
  gap: '2px',
  height: '140px',
});

export const BarColumn = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$2',
  height: '100%',
  justifyContent: 'flex-end',
});

export const Bar = styled('div', {
  width: '100%',
  maxWidth: '24px',
  backgroundColor: '$brand9',
  borderRadius: '4px 4px 0 0',
  minHeight: '3px',
});

export const BarLabel = styled('span', {
  fontSize: '$1',
  color: '$textSubtle',
});

export const ErrorTypeRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  padding: '$2 0',
});

export const ErrorTypeName = styled('span', {
  fontFamily: '$mono',
  fontSize: '$2',
  flex: '0 0 140px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const ErrorTypeTrack = styled('div', {
  flex: 1,
  height: '8px',
  backgroundColor: '$bgSubtle',
  borderRadius: '$pill',
  overflow: 'hidden',
});

export const ErrorTypeFill = styled('div', {
  height: '100%',
  backgroundColor: '$brand9',
  borderRadius: '$pill',
});

export const ErrorTypeCount = styled('span', {
  fontSize: '$2',
  color: '$textMuted',
  flex: '0 0 32px',
  textAlign: 'right',
});
