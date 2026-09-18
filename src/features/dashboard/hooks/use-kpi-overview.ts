import { useEffect, useState } from 'react';
import {
  kpisControllerOverview,
  type KpiOverviewResponseDto,
} from '@/api/generated';
import { getErrorMessage } from '@/lib/get-error-message';

export function useKpiOverview() {
  const [data, setData] = useState<KpiOverviewResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    kpisControllerOverview()
      .then((result) => {
        if (!cancelled) {
          setData(result);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            getErrorMessage(err, 'Não foi possível carregar os indicadores'),
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading, error };
}
