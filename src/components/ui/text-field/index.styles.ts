import { styled } from '@/theme';

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

export const Input = styled('input', {
  border: '1px solid $border',
  borderRadius: '$md',
  backgroundColor: '$surface',
  color: '$text',
  px: '$3',
  py: '10px',
  fontSize: '$3',
  outline: 'none',
  transition: 'border-color 120ms ease, box-shadow 120ms ease',

  '&::placeholder': { color: '$textSubtle' },
  '&:focus': {
    borderColor: '$brand9',
    boxShadow: '0 0 0 3px $colors$brandSoft',
  },

  variants: {
    hasError: {
      true: { borderColor: '$danger9' },
    },
  },
});

export const ErrorText = styled('span', {
  fontSize: '$1',
  color: '$danger9',
});
