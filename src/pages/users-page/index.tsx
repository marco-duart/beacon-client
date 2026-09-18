import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { UserForm } from '@/features/users/user-form';
import { UserList } from '@/features/users/user-list';
import { useUsers } from '@/features/users/hooks/use-users';

export function UsersPage() {
  const { users, isLoading, refresh } = useUsers();

  return (
    <AppShell title="Usuários">
      <Card>
        <UserForm onCreated={refresh} />
      </Card>
      <Card padding="none">
        <UserList users={users} isLoading={isLoading} onChanged={refresh} />
      </Card>
    </AppShell>
  );
}
