import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('E-mail inválido').min(1, 'Informe o e-mail'),
  password: z.string().min(8, 'Mínimo de 8 caracteres'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
