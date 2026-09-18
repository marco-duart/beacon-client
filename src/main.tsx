import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/features/auth/auth-context';
import { AppRouter } from '@/routes';
import { globalStyles } from '@/theme/global-styles';

globalStyles();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
      <Toaster position="top-right" />
    </AuthProvider>
  </StrictMode>,
);
