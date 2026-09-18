import { useSearchParams } from 'react-router-dom';
import type { IssuesControllerFindAllQueryParams } from '@/api/generated';
import { AppShell } from '@/components/layout/app-shell';
import { Card } from '@/components/ui/card';
import { Pager } from '@/components/ui/pager';
import {
  ISSUE_LEVELS,
  ISSUE_STATUSES,
  STATUS_LABELS,
} from '@/features/issues/dto';
import { useIssues } from '@/features/issues/hooks/use-issues';
import { IssueList } from '@/features/issues/issue-list';
import { useSystems } from '@/features/systems/hooks/use-systems';
import { Filters, Select } from './index.styles';

const PAGE_SIZE = 25;

export function IssuesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { systems } = useSystems();

  const systemId = searchParams.get('systemId');
  const status = searchParams.get('status');
  const level = searchParams.get('level');
  const page = Number(searchParams.get('page') ?? '1');

  const filters: IssuesControllerFindAllQueryParams = {
    systemId: systemId ? Number(systemId) : undefined,
    status:
      (status as IssuesControllerFindAllQueryParams['status']) || undefined,
    level: (level as IssuesControllerFindAllQueryParams['level']) || undefined,
    page,
    pageSize: PAGE_SIZE,
  };

  const { items, total, isLoading } = useIssues(filters);

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.delete('page');
    setSearchParams(next);
  }

  function goToPage(nextPage: number) {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    setSearchParams(next);
  }

  return (
    <AppShell title="Issues">
      <Filters>
        <Select
          value={systemId ?? ''}
          onChange={(e) => updateParam('systemId', e.target.value)}
        >
          <option value="">Todos os sistemas</option>
          {systems.map((system) => (
            <option key={system.id} value={system.id}>
              {system.name}
            </option>
          ))}
        </Select>
        <Select
          value={status ?? ''}
          onChange={(e) => updateParam('status', e.target.value)}
        >
          <option value="">Todos os status</option>
          {ISSUE_STATUSES.map((value) => (
            <option key={value} value={value}>
              {STATUS_LABELS[value]}
            </option>
          ))}
        </Select>
        <Select
          value={level ?? ''}
          onChange={(e) => updateParam('level', e.target.value)}
        >
          <option value="">Todos os níveis</option>
          {ISSUE_LEVELS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </Filters>

      <Card padding="none">
        <IssueList issues={items} isLoading={isLoading} />
        <Pager
          page={page}
          pageSize={PAGE_SIZE}
          total={total}
          onPageChange={goToPage}
        />
      </Card>
    </AppShell>
  );
}
