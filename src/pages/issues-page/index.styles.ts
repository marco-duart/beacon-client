import { styled } from '@/theme';

export const Filters = styled('div', {
  display: 'flex',
  gap: '$3',
  flexWrap: 'wrap',
});

export const Select = styled('select', {
  border: '1px solid $border',
  borderRadius: '$md',
  backgroundColor: '$surface',
  color: '$text',
  px: '$3',
  py: '$2',
  fontSize: '$2',
  outline: 'none',

  '&:focus': {
    borderColor: '$brand9',
    boxShadow: '0 0 0 3px $colors$brandSoft',
  },
});
