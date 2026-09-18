import { AppShell } from '@/components/layout/app-shell';
import { EmptyState } from '@/components/ui/empty-state';
import { Spinner } from '@/components/ui/spinner';
import { KpiOverview } from '@/features/dashboard/kpi-overview';
import { useKpiOverview } from '@/features/dashboard/hooks/use-kpi-overview';

export function DashboardPage() {
  const { data, isLoading, error } = useKpiOverview();

  return (
    <AppShell title="Visão geral">
      {isLoading ? <Spinner /> : null}
      {error ? (
        <EmptyState
          title="Não foi possível carregar os indicadores"
          description={error}
        />
      ) : null}
      {data ? <KpiOverview data={data} /> : null}
    </AppShell>
  );
}
