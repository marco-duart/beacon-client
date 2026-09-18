import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';
import {
  usersControllerRemove,
  usersControllerResetPassword,
  usersControllerUpdateRole,
  type UserResponseDto,
} from '@/api/generated';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { useAuth } from '@/features/auth/auth-context';
import { getErrorMessage } from '@/lib/get-error-message';
import { formatDateTime } from '@/lib/format-date';
import { ROLE_LABELS } from '../dto';
import {
  Actions,
  Email,
  RevealCell,
  RevealRow,
  RoleSelect,
  Table,
  Td,
  Th,
  YouTag,
} from './index.styles';

interface UserListProps {
  users: UserResponseDto[];
  isLoading: boolean;
  onChanged: () => void;
}

export function UserList({ users, isLoading, onChanged }: UserListProps) {
  const { email: currentEmail } = useAuth();
  const [revealedFor, setRevealedFor] = useState<{
    userId: number;
    password: string;
  } | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  async function handleRoleChange(
    user: UserResponseDto,
    role: UserResponseDto['role'],
  ) {
    setBusyId(user.id);
    try {
      await usersControllerUpdateRole(user.id, { role });
      onChanged();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Não foi possível alterar o papel'));
    } finally {
      setBusyId(null);
    }
  }

  async function handleResetPassword(user: UserResponseDto) {
    setBusyId(user.id);
    try {
      const result = await usersControllerResetPassword(user.id);
      setRevealedFor({ userId: user.id, password: result.temporaryPassword });
    } catch (error) {
      toast.error(getErrorMessage(error, 'Não foi possível resetar a senha'));
    } finally {
      setBusyId(null);
    }
  }

  async function handleRemove(user: UserResponseDto) {
    if (!window.confirm(`Remover o usuário "${user.email}"?`)) {
      return;
    }
    try {
      await usersControllerRemove(user.id);
      toast.success(`Usuário "${user.email}" removido`);
      onChanged();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Não foi possível remover o usuário'));
    }
  }

  if (!isLoading && users.length === 0) {
    return <EmptyState title="Nenhum usuário cadastrado" />;
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>Usuário</Th>
          <Th>Papel</Th>
          <Th>Criado em</Th>
          <Th />
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const isSelf = user.email === currentEmail;
          return (
            <Fragment key={user.id}>
              <tr>
                <Td>
                  <Email>
                    {user.email}
                    {isSelf ? <YouTag>(você)</YouTag> : null}
                  </Email>
                </Td>
                <Td>
                  <RoleSelect
                    value={user.role}
                    disabled={isSelf || busyId === user.id}
                    onChange={(e) =>
                      handleRoleChange(
                        user,
                        e.target.value as UserResponseDto['role'],
                      )
                    }
                  >
                    {Object.entries(ROLE_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </RoleSelect>
                </Td>
                <Td>{formatDateTime(user.createdAt)}</Td>
                <Td>
                  <Actions>
                    <Button
                      variant="secondary"
                      size="sm"
                      isLoading={busyId === user.id}
                      onClick={() => handleResetPassword(user)}
                    >
                      Resetar senha
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      disabled={isSelf}
                      onClick={() => handleRemove(user)}
                    >
                      Remover
                    </Button>
                  </Actions>
                </Td>
              </tr>
              {revealedFor?.userId === user.id ? (
                <RevealRow>
                  <RevealCell colSpan={4}>
                    Nova senha temporária: {revealedFor.password}
                  </RevealCell>
                </RevealRow>
              ) : null}
            </Fragment>
          );
        })}
      </tbody>
    </Table>
  );
}
