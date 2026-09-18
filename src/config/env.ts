interface AppEnv {
  apiUrl: string;
}

function readEnv(key: string, fallback?: string): string {
  const value = import.meta.env[key] as string | undefined;
  if (value === undefined || value.length === 0) {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`Missing required env var "${key}"`);
  }
  return value;
}

export const env: AppEnv = {
  apiUrl: readEnv('VITE_API_URL'),
};
