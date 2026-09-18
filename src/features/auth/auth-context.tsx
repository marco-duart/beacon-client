import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { authControllerLogin, authControllerMe } from '@/api/generated';
import { UNAUTHORIZED_EVENT } from '@/config/api';
import { authStorage, type UserRole } from '@/lib/auth-storage';

interface Session {
  email: string;
  role: UserRole;
}

interface AuthContextValue {
  email: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  hasRole: (...roles: UserRole[]) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const stored = authStorage.getSession();
  const [session, setSession] = useState<Session | null>(
    stored ? { email: stored.email, role: stored.role } : null,
  );
  const [isInitializing, setIsInitializing] = useState(stored !== null);

  const logout = useCallback(() => {
    authStorage.clearSession();
    setSession(null);
  }, []);

  const login = useCallback(async (loginEmail: string, password: string) => {
    const response = await authControllerLogin({ email: loginEmail, password });
    authStorage.setSession({
      accessToken: response.accessToken,
      email: response.email,
      role: response.role,
    });
    setSession({ email: response.email, role: response.role });
  }, []);

  useEffect(() => {
    window.addEventListener(UNAUTHORIZED_EVENT, logout);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, logout);
  }, [logout]);

  useEffect(() => {
    if (!stored) {
      return;
    }
    authControllerMe()
      .then((me) => {
        authStorage.setSession({
          accessToken: stored.accessToken,
          email: me.email,
          role: me.role,
        });
        setSession({ email: me.email, role: me.role });
      })
      .catch(() => {})
      .finally(() => setIsInitializing(false));
  }, []);

  const hasRole = useCallback(
    (...roles: UserRole[]) => session !== null && roles.includes(session.role),
    [session],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      email: session?.email ?? null,
      role: session?.role ?? null,
      isAuthenticated: session !== null,
      isInitializing,
      hasRole,
      login,
      logout,
    }),
    [session, isInitializing, hasRole, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
