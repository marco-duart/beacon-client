export function formatDateTime(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

export function formatRelativeTime(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  const diffMs = date.getTime() - Date.now();
  const diffMinutes = Math.round(diffMs / 60_000);

  const divisions: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 60 * 24 * 365],
    ['month', 60 * 24 * 30],
    ['day', 60 * 24],
    ['hour', 60],
    ['minute', 1],
  ];

  const formatter = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });

  for (const [unit, unitMinutes] of divisions) {
    if (Math.abs(diffMinutes) >= unitMinutes || unit === 'minute') {
      return formatter.format(Math.round(diffMinutes / unitMinutes), unit);
    }
  }
  return formatter.format(0, 'minute');
}
