import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthProvider } from '../auth-context';
import { LoginForm } from './index';

const navigateSpy = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom',
    );
  return { ...actual, useNavigate: () => navigateSpy };
});

const authControllerLoginMock = vi.fn();
vi.mock('@/api/generated', () => ({
  authControllerLogin: (...args: unknown[]) => authControllerLoginMock(...args),
}));

function renderLoginForm() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('LoginForm', () => {
  beforeEach(() => {
    navigateSpy.mockClear();
    authControllerLoginMock.mockReset();
    localStorage.clear();
  });

  it('shows validation errors instead of submitting when the form is empty', async () => {
    renderLoginForm();

    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(await screen.findByText('Informe o e-mail')).toBeInTheDocument();
    expect(screen.getByText('Mínimo de 8 caracteres')).toBeInTheDocument();
    expect(authControllerLoginMock).not.toHaveBeenCalled();
  });

  it('logs in and navigates home on valid credentials', async () => {
    authControllerLoginMock.mockResolvedValue({
      accessToken: 'token-123',
      email: 'admin@beacon.dev',
      role: 'admin',
    });
    renderLoginForm();

    await userEvent.type(screen.getByLabelText('E-mail'), 'admin@beacon.dev');
    await userEvent.type(screen.getByLabelText('Senha'), 'super-secret-123');
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() =>
      expect(authControllerLoginMock).toHaveBeenCalledWith({
        email: 'admin@beacon.dev',
        password: 'super-secret-123',
      }),
    );
  });
});
