import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import icon from '@/assets/icon.png';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/auth-context';
import { useThemeMode } from '@/theme/theme-mode';
import {
  BrandRow,
  Content,
  LogoMark,
  Main,
  Nav,
  NavLinkItem,
  PageTitle,
  Shell,
  Sidebar,
  Topbar,
  UserRow,
} from './index.styles';

interface NavItem {
  to: string;
  label: string;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Visão geral' },
  { to: '/issues', label: 'Issues' },
  { to: '/systems', label: 'Sistemas' },
  { to: '/users', label: 'Usuários', adminOnly: true },
];

interface AppShellProps {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AppShell({ title, actions, children }: AppShellProps) {
  const { email, hasRole, logout } = useAuth();
  const { mode, toggle } = useThemeMode();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  const navItems = NAV_ITEMS.filter(
    (item) => !item.adminOnly || hasRole('admin'),
  );

  return (
    <Shell>
      <Sidebar>
        <BrandRow>
          <LogoMark src={icon} alt="" />
          Beacon
        </BrandRow>
        <Nav>
          {navItems.map((item) => (
            <NavLinkItem
              key={item.to}
              onClick={() => navigate(item.to)}
              active={
                item.to === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.to)
              }
            >
              {item.label}
            </NavLinkItem>
          ))}
        </Nav>
      </Sidebar>
      <Main>
        <Topbar>
          <PageTitle>{title}</PageTitle>
          <UserRow>
            {actions}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggle}
              aria-label="Alternar tema claro/escuro"
            >
              {mode === 'dark' ? '☀️' : '🌙'}
            </Button>
            <span>{email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Sair
            </Button>
          </UserRow>
        </Topbar>
        <Content>{children}</Content>
      </Main>
    </Shell>
  );
}
