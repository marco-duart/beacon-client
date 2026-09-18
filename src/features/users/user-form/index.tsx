import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  usersControllerCreate,
  type UserCredentialsResponseDto,
} from '@/api/generated';
import { Button } from '@/components/ui/button';
import { CredentialsReveal } from '@/components/ui/credentials-reveal';
import { TextField } from '@/components/ui/text-field';
import { getErrorMessage } from '@/lib/get-error-message';
import {
  createUserSchema,
  ROLE_LABELS,
  type CreateUserFormValues,
} from '../dto';
import { Field, Form, FullRow, Label, Select } from './index.styles';

interface UserFormProps {
  onCreated: () => void;
}

export function UserForm({ onCreated }: UserFormProps) {
  const [created, setCreated] = useState<UserCredentialsResponseDto | null>(
    null,
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { role: 'member' },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const user = await usersControllerCreate(values);
      setCreated(user);
      reset({ email: '', role: 'member' });
      onCreated();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Não foi possível criar o usuário'));
    }
  });

  return (
    <Form onSubmit={onSubmit} noValidate>
      <TextField
        label="E-mail"
        type="email"
        placeholder="pessoa@empresa.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Field>
        <Label htmlFor="role">Papel</Label>
        <Select id="role" {...register('role')}>
          {Object.entries(ROLE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </Field>

      <Button type="submit" isLoading={isSubmitting}>
        Criar usuário
      </Button>

      {created ? (
        <FullRow>
          <CredentialsReveal
            title={`Usuário "${created.email}" criado.`}
            description="Copie a senha temporária agora — ela não será exibida novamente:"
            value={created.temporaryPassword}
          />
        </FullRow>
      ) : null}
    </Form>
  );
}
