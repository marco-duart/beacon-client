import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { IssueResponseDto } from '@/api/generated';
import { IssueList } from './index';

const navigateSpy = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom',
    );
  return { ...actual, useNavigate: () => navigateSpy };
});

function buildIssue(
  overrides: Partial<IssueResponseDto> = {},
): IssueResponseDto {
  return {
    id: 1,
    systemId: 1,
    fingerprint: 'abc',
    type: 'TypeError',
    message: "Cannot read properties of undefined (reading 'foo')",
    level: 'error',
    environment: 'production',
    release: null,
    status: 'open',
    count: 3,
    firstSeen: new Date().toISOString(),
    lastSeen: new Date().toISOString(),
    ...overrides,
  };
}

describe('IssueList', () => {
  beforeEach(() => {
    navigateSpy.mockClear();
  });

  it('shows an empty state when there are no issues', () => {
    render(
      <MemoryRouter>
        <IssueList issues={[]} isLoading={false} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Nenhuma issue encontrada')).toBeInTheDocument();
  });

  it('renders a row per issue with its type, message and occurrence count', () => {
    render(
      <MemoryRouter>
        <IssueList issues={[buildIssue()]} isLoading={false} />
      </MemoryRouter>,
    );

    expect(screen.getByText('TypeError')).toBeInTheDocument();
    expect(
      screen.getByText("Cannot read properties of undefined (reading 'foo')"),
    ).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('navigates to the issue detail page when a row is clicked', async () => {
    render(
      <MemoryRouter>
        <IssueList issues={[buildIssue({ id: 42 })]} isLoading={false} />
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByText('TypeError'));
    expect(navigateSpy).toHaveBeenCalledWith('/issues/42');
  });
});
