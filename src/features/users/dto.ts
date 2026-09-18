import { z } from 'zod';
import {
  createUserDtoRoleEnum,
  type CreateUserDtoRoleEnumKey,
} from '@/api/generated';

const roleValues = Object.values(createUserDtoRoleEnum) as [
  CreateUserDtoRoleEnumKey,
  ...CreateUserDtoRoleEnumKey[],
];

export const createUserSchema = z.object({
  email: z.string().min(1, 'Informe o e-mail').email('E-mail inválido'),
  role: z.enum(roleValues),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;

export const ROLE_LABELS: Record<string, string> = {
  admin: 'Admin',
  member: 'Membro',
  viewer: 'Visualizador',
};
