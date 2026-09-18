import type { MeResponseDtoRoleEnumKey } from '@/api/generated';

const STORAGE_KEY = 'beacon.session';

export type UserRole = MeResponseDtoRoleEnumKey;

export interface StoredSession {
  accessToken: string;
  email: string;
  role: UserRole;
}

export const authStorage = {
  getSession(): StoredSession | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as StoredSession) : null;
    } catch {
      return null;
    }
  },
  getToken(): string | null {
    return authStorage.getSession()?.accessToken ?? null;
  },
  setSession(session: StoredSession): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
    }
  },
  clearSession(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
    }
  },
};
