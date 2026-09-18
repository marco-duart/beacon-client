import { z } from 'zod';
import {
  createSystemDtoRetentionPolicyEnum,
  type CreateSystemDtoRetentionPolicyEnumKey,
} from '@/api/generated';

const retentionPolicyValues = Object.values(
  createSystemDtoRetentionPolicyEnum,
) as [
  CreateSystemDtoRetentionPolicyEnumKey,
  ...CreateSystemDtoRetentionPolicyEnumKey[],
];

export const createSystemSchema = z.object({
  name: z.string().min(2, 'Mínimo de 2 caracteres'),
  retentionPolicy: z.enum(retentionPolicyValues),
  notifyEmails: z.string().optional(),
});

export type CreateSystemFormValues = z.infer<typeof createSystemSchema>;

export const RETENTION_POLICY_LABELS: Record<string, string> = {
  unlimited: 'Sem limite',
  '90d': '90 dias',
  '30d': '30 dias',
  '7d': '7 dias',
  '72h': '72 horas',
  '24h': '24 horas',
};
