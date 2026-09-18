import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  systemsControllerRemove,
  systemsControllerRotateKey,
  type SystemResponseDto,
} from '@/api/generated';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { getErrorMessage } from '@/lib/get-error-message';
import { RETENTION_POLICY_LABELS } from '../dto';
import {
  Actions,
  KeyPrefix,
  SystemName,
  SystemSlug,
  Table,
  Td,
  Th,
} from './index.styles';

interface SystemListProps {
  systems: SystemResponseDto[];
  isLoading: boolean;
  onChanged: () => void;
  canManage: boolean;
}

export function SystemList({
  systems,
  isLoading,
  onChanged,
  canManage,
}: SystemListProps) {
  const [rotatingId, setRotatingId] = useState<number | null>(null);
  const [revealedKey, setRevealedKey] = useState<{
    systemId: number;
    apiKey: string;
  } | null>(null);

  async function handleRotate(system: SystemResponseDto) {
    setRotatingId(system.id);
    try {
      const rotated = await systemsControllerRotateKey(system.id);
      setRevealedKey({ systemId: system.id, apiKey: rotated.apiKey });
      onChanged();
    } catch (error) {
      toast.error(
        getErrorMessage(error, 'Não foi possível rotacionar a chave'),
      );
    } finally {
      setRotatingId(null);
    }
  }

  async function handleRemove(system: SystemResponseDto) {
    if (
      !window.confirm(
        `Excluir "${system.name}"? Todas as issues e eventos desse sistema serão apagados.`,
      )
    ) {
      return;
    }
    try {
      await systemsControllerRemove(system.id);
      toast.success(`Sistema "${system.name}" removido`);
      onChanged();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Não foi possível remover o sistema'));
    }
  }

  if (!isLoading && systems.length === 0) {
    return (
      <EmptyState
        title="Nenhum sistema cadastrado"
        description="Crie o primeiro sistema para gerar uma API key e começar a reportar erros."
      />
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>Sistema</Th>
          <Th>API key</Th>
          <Th>Retenção</Th>
          <Th>Notificações</Th>
          <Th />
        </tr>
      </thead>
      <tbody>
        {systems.map((system) => (
          <tr key={system.id}>
            <Td>
              <SystemName>
                <Link to={`/issues?systemId=${system.id}`}>{system.name}</Link>
              </SystemName>
              <SystemSlug>{system.slug}</SystemSlug>
            </Td>
            <Td>
              {revealedKey?.systemId === system.id ? (
                <KeyPrefix>{revealedKey.apiKey}</KeyPrefix>
              ) : (
                <KeyPrefix>{system.apiKeyPrefix}…</KeyPrefix>
              )}
            </Td>
            <Td>
              <Badge tone="info">
                {RETENTION_POLICY_LABELS[system.retentionPolicy]}
              </Badge>
            </Td>
            <Td>{system.notifyEmails || '—'}</Td>
            <Td>
              {canManage ? (
                <Actions>
                  <Button
                    variant="secondary"
                    size="sm"
                    isLoading={rotatingId === system.id}
                    onClick={() => handleRotate(system)}
                  >
                    Rotacionar chave
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemove(system)}
                  >
                    Excluir
                  </Button>
                </Actions>
              ) : null}
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
