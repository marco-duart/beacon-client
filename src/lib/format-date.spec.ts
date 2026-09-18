import { describe, expect, it } from 'vitest';
import { formatRelativeTime } from './format-date';

describe('formatRelativeTime', () => {
  it('reports minutes for very recent times', () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60_000);
    expect(formatRelativeTime(fiveMinutesAgo)).toContain('minuto');
  });

  it('reports hours once past the minute range', () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60_000);
    expect(formatRelativeTime(threeHoursAgo)).toContain('hora');
  });

  it('reports days once past the hour range', () => {
    const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60_000);
    expect(formatRelativeTime(fiveDaysAgo)).toContain('dia');
  });

  it('accepts an ISO string in addition to a Date', () => {
    const isoFiveMinutesAgo = new Date(Date.now() - 5 * 60_000).toISOString();
    expect(formatRelativeTime(isoFiveMinutesAgo)).toContain('minuto');
  });
});
