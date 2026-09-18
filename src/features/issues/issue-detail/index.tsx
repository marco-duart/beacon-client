import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  issuesControllerUpdateStatus,
  type EventResponseDto,
  type IssueResponseDto,
} from '@/api/generated';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/features/auth/auth-context';
import { getErrorMessage } from '@/lib/get-error-message';
import { formatDateTime } from '@/lib/format-date';
import { LEVEL_TONE, STATUS_LABELS, STATUS_TONE } from '../dto';
import {
  ActionsRow,
  EventCard,
  EventMeta,
  Header,
  IssueMessage,
  IssueType,
  MetaItem,
  MetaRow,
  Pre,
  SectionTitle,
  TitleBlock,
} from './index.styles';

interface IssueDetailProps {
  issue: IssueResponseDto;
  events: EventResponseDto[];
  onStatusChanged: () => void;
}

export function IssueDetail({
  issue,
  events,
  onStatusChanged,
}: IssueDetailProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { hasRole } = useAuth();
  const canChangeStatus = hasRole('admin', 'member');

  async function updateStatus(status: 'resolved' | 'ignored' | 'open') {
    setIsUpdating(true);
    try {
      await issuesControllerUpdateStatus(issue.id, { status });
      onStatusChanged();
    } catch (error) {
      toast.error(
        getErrorMessage(error, 'Não foi possível atualizar o status'),
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <>
      <Card>
        <Header>
          <TitleBlock>
            <MetaRow>
              <Badge tone={LEVEL_TONE[issue.level]}>{issue.level}</Badge>
              <Badge tone={STATUS_TONE[issue.status]}>
                {STATUS_LABELS[issue.status]}
              </Badge>
            </MetaRow>
            <IssueType>{issue.type}</IssueType>
            <IssueMessage>{issue.message}</IssueMessage>
            <MetaRow>
              <MetaItem>{issue.count} ocorrências</MetaItem>
              <MetaItem>
                Primeira vez: {formatDateTime(issue.firstSeen)}
              </MetaItem>
              <MetaItem>Última vez: {formatDateTime(issue.lastSeen)}</MetaItem>
              {issue.environment ? (
                <MetaItem>Ambiente: {issue.environment}</MetaItem>
              ) : null}
              {issue.release ? (
                <MetaItem>Release: {issue.release}</MetaItem>
              ) : null}
            </MetaRow>
          </TitleBlock>
          {canChangeStatus ? (
            <ActionsRow>
              {issue.status !== 'resolved' ? (
                <Button
                  variant="secondary"
                  isLoading={isUpdating}
                  onClick={() => updateStatus('resolved')}
                >
                  Marcar como resolvida
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  isLoading={isUpdating}
                  onClick={() => updateStatus('open')}
                >
                  Reabrir
                </Button>
              )}
              {issue.status !== 'ignored' ? (
                <Button
                  variant="ghost"
                  isLoading={isUpdating}
                  onClick={() => updateStatus('ignored')}
                >
                  Ignorar
                </Button>
              ) : null}
            </ActionsRow>
          ) : null}
        </Header>
      </Card>

      <Card>
        <SectionTitle>Eventos recentes</SectionTitle>
        {events.map((event) => (
          <EventCard key={event.id}>
            <EventMeta>
              <span>{formatDateTime(event.timestamp)}</span>
              {event.environment ? <span>{event.environment}</span> : null}
              {event.release ? <span>{event.release}</span> : null}
            </EventMeta>
            {event.stacktrace ? (
              <Pre>
                {typeof event.stacktrace === 'string'
                  ? event.stacktrace
                  : JSON.stringify(event.stacktrace, null, 2)}
              </Pre>
            ) : null}
            {event.tags && Object.keys(event.tags).length > 0 ? (
              <Pre>{JSON.stringify(event.tags, null, 2)}</Pre>
            ) : null}
            {event.extra && Object.keys(event.extra).length > 0 ? (
              <Pre>{JSON.stringify(event.extra, null, 2)}</Pre>
            ) : null}
          </EventCard>
        ))}
      </Card>
    </>
  );
}
