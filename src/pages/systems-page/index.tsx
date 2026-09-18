import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/features/auth/auth-context';
import { SystemForm } from '@/features/systems/system-form';
import { SystemList } from '@/features/systems/system-list';
import { useSystems } from '@/features/systems/hooks/use-systems';

export function SystemsPage() {
  const { systems, isLoading, refresh } = useSystems();
  const { hasRole } = useAuth();
  const isAdmin = hasRole('admin');

  return (
    <AppShell title="Sistemas">
      {isAdmin ? (
        <Card>
          <SystemForm onCreated={refresh} />
        </Card>
      ) : null}
      <Card padding="none">
        <SystemList
          systems={systems}
          isLoading={isLoading}
          onChanged={refresh}
          canManage={isAdmin}
        />
      </Card>
    </AppShell>
  );
}
