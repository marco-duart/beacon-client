import { describe, expect, it } from 'vitest';
import { getErrorMessage } from './get-error-message';

function axiosErrorWithMessage(message: unknown) {
  return { isAxiosError: true, response: { data: { message } } };
}

describe('getErrorMessage', () => {
  it('extracts a single string message from an Axios error response', () => {
    expect(getErrorMessage(axiosErrorWithMessage('Invalid credentials'))).toBe(
      'Invalid credentials',
    );
  });

  it('joins an array of validation messages from an Axios error response', () => {
    expect(
      getErrorMessage(
        axiosErrorWithMessage(['name is required', 'email is invalid']),
      ),
    ).toBe('name is required, email is invalid');
  });

  it('falls back to a plain Error message', () => {
    expect(getErrorMessage(new Error('boom'))).toBe('boom');
  });

  it('falls back to the default message for unknown error shapes', () => {
    expect(getErrorMessage('not an error object')).toBe(
      'Algo deu errado. Tente novamente.',
    );
  });

  it('accepts a custom fallback message', () => {
    expect(getErrorMessage(null, 'custom fallback')).toBe('custom fallback');
  });
});
