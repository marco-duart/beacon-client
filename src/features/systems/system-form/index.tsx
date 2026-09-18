import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  systemsControllerCreate,
  type SystemCreatedResponseDto,
} from '@/api/generated';
import { Button } from '@/components/ui/button';
import { CredentialsReveal } from '@/components/ui/credentials-reveal';
import { TextField } from '@/components/ui/text-field';
import { getErrorMessage } from '@/lib/get-error-message';
import {
  createSystemSchema,
  RETENTION_POLICY_LABELS,
  type CreateSystemFormValues,
} from '../dto';
import { Field, FullRow, Form, Label, Select } from './index.styles';

interface SystemFormProps {
  onCreated: () => void;
}

export function SystemForm({ onCreated }: SystemFormProps) {
  const [createdSystem, setCreatedSystem] =
    useState<SystemCreatedResponseDto | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateSystemFormValues>({
    resolver: zodResolver(createSystemSchema),
    defaultValues: { retentionPolicy: 'unlimited' },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const created = await systemsControllerCreate({
        ...values,
        notifyEmails: values.notifyEmails?.trim() || undefined,
      });
      setCreatedSystem(created);
      reset({ name: '', retentionPolicy: 'unlimited', notifyEmails: '' });
      onCreated();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Não foi possível criar o sistema'));
    }
  });

  return (
    <Form onSubmit={onSubmit} noValidate>
      <TextField
        label="Nome do sistema"
        placeholder="Checkout API"
        error={errors.name?.message}
        {...register('name')}
      />

      <Field>
        <Label htmlFor="retentionPolicy">Retenção de dados</Label>
        <Select id="retentionPolicy" {...register('retentionPolicy')}>
          {Object.entries(RETENTION_POLICY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </Field>

      <FullRow>
        <TextField
          label="E-mails para notificação (opcional, separados por vírgula)"
          placeholder="oncall@empresa.com, tech-lead@empresa.com"
          error={errors.notifyEmails?.message}
          {...register('notifyEmails')}
        />
      </FullRow>

      <FullRow>
        <Button type="submit" isLoading={isSubmitting}>
          Criar sistema
        </Button>
      </FullRow>

      {createdSystem ? (
        <FullRow>
          <CredentialsReveal
            title={`Sistema "${createdSystem.name}" criado.`}
            description="Copie a API key agora — ela não será exibida novamente:"
            value={createdSystem.apiKey}
          />
        </FullRow>
      ) : null}
    </Form>
  );
}
