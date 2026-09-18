import { useCallback, useEffect, useState } from 'react';
import {
  issuesControllerFindAll,
  type IssueResponseDto,
  type IssuesControllerFindAllQueryParams,
} from '@/api/generated';
import { getErrorMessage } from '@/lib/get-error-message';

interface IssuesPage {
  items: IssueResponseDto[];
  total: number;
  page: number;
  pageSize: number;
}

const EMPTY_PAGE: IssuesPage = { items: [], total: 0, page: 1, pageSize: 25 };

export function useIssues(filters: IssuesControllerFindAllQueryParams) {
  const [data, setData] = useState<IssuesPage>(EMPTY_PAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { systemId, status, level, page, pageSize } = filters;

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await issuesControllerFindAll({
        systemId,
        status,
        level,
        page,
        pageSize,
      });
      setData(result);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err, 'Não foi possível carregar as issues'));
    } finally {
      setIsLoading(false);
    }
  }, [systemId, status, level, page, pageSize]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { ...data, isLoading, error, refresh };
}
