import { styled } from '@/theme';

export const Shell = styled('div', {
  display: 'grid',
  gridTemplateColumns: '220px 1fr',
  minHeight: '100vh',
  backgroundColor: '$bg',

  '@media (max-width: 860px)': {
    gridTemplateColumns: '1fr',
  },
});

export const Sidebar = styled('aside', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',
  padding: '$5 $4',
  borderRight: '1px solid $border',
  backgroundColor: '$surface',

  '@media (max-width: 860px)': {
    display: 'none',
  },
});

export const BrandRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  fontWeight: 700,
  fontSize: '$4',
  px: '$2',
});

export const LogoMark = styled('img', {
  width: '22px',
  height: '22px',
  borderRadius: '$sm',
});

export const Nav = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
});

export const NavLinkItem = styled('a', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  px: '$3',
  py: '$2',
  borderRadius: '$md',
  fontSize: '$3',
  fontWeight: 500,
  color: '$textMuted',
  textDecoration: 'none',
  cursor: 'pointer',

  '&:hover': { backgroundColor: '$bgSubtle', color: '$text' },

  variants: {
    active: {
      true: {
        backgroundColor: '$brandSoft',
        color: '$brand10',
        fontWeight: 600,
      },
    },
  },
});

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
});

export const Topbar = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$4 $6',
  borderBottom: '1px solid $border',
  backgroundColor: '$surface',
});

export const PageTitle = styled('h1', {
  fontSize: '$5',
  fontWeight: 700,
});

export const UserRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  fontSize: '$2',
  color: '$textMuted',
});

export const Content = styled('div', {
  flex: 1,
  padding: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',
});
