import { Navigate, useParams } from 'react-router-dom';
import { AppShell } from '@/components/layout/app-shell';
import { Spinner } from '@/components/ui/spinner';
import { IssueDetail } from '@/features/issues/issue-detail';
import { useIssueDetail } from '@/features/issues/hooks/use-issue-detail';

export function IssueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const issueId = Number(id);

  if (!id || Number.isNaN(issueId)) {
    return <Navigate to="/issues" replace />;
  }

  return <IssueDetailContent issueId={issueId} />;
}

function IssueDetailContent({ issueId }: { issueId: number }) {
  const { issue, events, isLoading, refresh } = useIssueDetail(issueId);

  return (
    <AppShell title={issue ? issue.type : 'Issue'}>
      {isLoading || !issue ? (
        <Spinner />
      ) : (
        <IssueDetail issue={issue} events={events} onStatusChanged={refresh} />
      )}
    </AppShell>
  );
}
