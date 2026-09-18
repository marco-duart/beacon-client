import { styled } from '@/theme';

export const StyledBadge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  borderRadius: '$pill',
  px: '$3',
  py: '4px',
  fontSize: '$1',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  whiteSpace: 'nowrap',

  variants: {
    tone: {
      neutral: { backgroundColor: '$bgSubtle', color: '$textMuted' },
      brand: { backgroundColor: '$brandSoft', color: '$brand10' },
      success: { backgroundColor: '$successSoft', color: '$success9' },
      warning: { backgroundColor: '$warningSoft', color: '$warning9' },
      danger: { backgroundColor: '$dangerSoft', color: '$danger9' },
      info: { backgroundColor: '$infoSoft', color: '$info9' },
    },
  },

  defaultVariants: {
    tone: 'neutral',
  },
});
