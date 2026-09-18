import { useNavigate } from 'react-router-dom';
import type { IssueResponseDto } from '@/api/generated';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { formatRelativeTime } from '@/lib/format-date';
import { LEVEL_TONE, STATUS_LABELS, STATUS_TONE } from '../dto';
import {
  Count,
  IssueMessage,
  IssueType,
  Row,
  Table,
  Td,
  Th,
  TimeText,
} from './index.styles';

interface IssueListProps {
  issues: IssueResponseDto[];
  isLoading: boolean;
}

export function IssueList({ issues, isLoading }: IssueListProps) {
  const navigate = useNavigate();

  if (!isLoading && issues.length === 0) {
    return (
      <EmptyState
        title="Nenhuma issue encontrada"
        description="Assim que um sistema reportar um erro, ele aparece aqui."
      />
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>Erro</Th>
          <Th>Nível</Th>
          <Th>Status</Th>
          <Th>Ocorrências</Th>
          <Th>Última vez</Th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <Row key={issue.id} onClick={() => navigate(`/issues/${issue.id}`)}>
            <Td>
              <IssueType>{issue.type}</IssueType>
              <IssueMessage>{issue.message}</IssueMessage>
            </Td>
            <Td>
              <Badge tone={LEVEL_TONE[issue.level]}>{issue.level}</Badge>
            </Td>
            <Td>
              <Badge tone={STATUS_TONE[issue.status]}>
                {STATUS_LABELS[issue.status]}
              </Badge>
            </Td>
            <Td>
              <Count>{issue.count}</Count>
            </Td>
            <Td>
              <TimeText>{formatRelativeTime(issue.lastSeen)}</TimeText>
            </Td>
          </Row>
        ))}
      </tbody>
    </Table>
  );
}
