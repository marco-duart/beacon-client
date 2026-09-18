import { styled } from '@/theme';

export const StyledButton = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
  border: 'none',
  borderRadius: '$md',
  fontSize: '$3',
  fontWeight: 600,
  cursor: 'pointer',
  transition:
    'background-color 120ms ease, border-color 120ms ease, opacity 120ms ease',
  whiteSpace: 'nowrap',

  '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
  '&:focus-visible': {
    outline: '2px solid $colors$brand9',
    outlineOffset: '2px',
  },

  variants: {
    size: {
      sm: { px: '$3', py: '6px', fontSize: '$2' },
      md: { px: '$4', py: '10px' },
    },
    variant: {
      primary: {
        backgroundColor: '$brand9',
        color: '$brandText',
        '&:hover:not(:disabled)': { backgroundColor: '$brand10' },
      },
      secondary: {
        backgroundColor: '$surface',
        color: '$text',
        border: '1px solid $border',
        '&:hover:not(:disabled)': { backgroundColor: '$surfaceHover' },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$textMuted',
        '&:hover:not(:disabled)': {
          backgroundColor: '$bgSubtle',
          color: '$text',
        },
      },
      danger: {
        backgroundColor: 'transparent',
        color: '$danger9',
        border: '1px solid $dangerSoft',
        '&:hover:not(:disabled)': { backgroundColor: '$dangerSoft' },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});
