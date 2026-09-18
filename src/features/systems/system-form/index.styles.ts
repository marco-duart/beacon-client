import { styled } from '@/theme';

export const Form = styled('form', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '$4',
  alignItems: 'end',

  '@media (max-width: 860px)': {
    gridTemplateColumns: '1fr',
  },
});

export const FullRow = styled('div', {
  gridColumn: '1 / -1',
});

export const Select = styled('select', {
  border: '1px solid $border',
  borderRadius: '$md',
  backgroundColor: '$surface',
  color: '$text',
  px: '$3',
  py: '10px',
  fontSize: '$3',
  outline: 'none',

  '&:focus': {
    borderColor: '$brand9',
    boxShadow: '0 0 0 3px $colors$brandSoft',
  },
});

export const Field = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

export const Label = styled('label', {
  fontSize: '$2',
  fontWeight: 600,
  color: '$textMuted',
});
