import { useCallback, useEffect, useState } from 'react';
import {
  systemsControllerFindAll,
  type SystemResponseDto,
} from '@/api/generated';
import { getErrorMessage } from '@/lib/get-error-message';

export function useSystems() {
  const [systems, setSystems] = useState<SystemResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await systemsControllerFindAll();
      setSystems(data);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err, 'Não foi possível carregar os sistemas'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { systems, isLoading, error, refresh };
}
