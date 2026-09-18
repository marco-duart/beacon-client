import { useCallback, useEffect, useState } from 'react';
import { usersControllerFindAll, type UserResponseDto } from '@/api/generated';
import { getErrorMessage } from '@/lib/get-error-message';

export function useUsers() {
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await usersControllerFindAll();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err, 'Não foi possível carregar os usuários'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { users, isLoading, error, refresh };
}
