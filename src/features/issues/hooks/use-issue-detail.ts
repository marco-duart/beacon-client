import { useCallback, useEffect, useState } from 'react';
import {
  issuesControllerFindEvents,
  issuesControllerFindOne,
  type EventResponseDto,
  type IssueResponseDto,
} from '@/api/generated';
import { getErrorMessage } from '@/lib/get-error-message';

export function useIssueDetail(issueId: number) {
  const [issue, setIssue] = useState<IssueResponseDto | null>(null);
  const [events, setEvents] = useState<EventResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const [issueData, eventsData] = await Promise.all([
        issuesControllerFindOne(issueId),
        issuesControllerFindEvents(issueId),
      ]);
      setIssue(issueData);
      setEvents(eventsData);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err, 'Não foi possível carregar a issue'));
    } finally {
      setIsLoading(false);
    }
  }, [issueId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { issue, events, isLoading, error, refresh };
}
