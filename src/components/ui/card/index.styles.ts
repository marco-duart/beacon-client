import { styled } from '@/theme';

export const StyledCard = styled('div', {
  backgroundColor: '$surface',
  border: '1px solid $border',
  borderRadius: '$lg',
  boxShadow: '$sm',

  variants: {
    padding: {
      none: { padding: 0 },
      sm: { padding: '$4' },
      md: { padding: '$5' },
    },
  },

  defaultVariants: {
    padding: 'md',
  },
});
