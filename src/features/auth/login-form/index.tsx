import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';
import { getErrorMessage } from '@/lib/get-error-message';
import { useAuth } from '../auth-context';
import { loginSchema, type LoginFormValues } from '../dto';
import { Form } from './index.styles';

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      await login(values.email, values.password);
      navigate('/', { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, 'E-mail ou senha inválidos'));
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Form onSubmit={onSubmit} noValidate>
      <TextField
        label="E-mail"
        type="email"
        autoComplete="email"
        placeholder="voce@empresa.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <TextField
        label="Senha"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" isLoading={isSubmitting}>
        Entrar
      </Button>
    </Form>
  );
}
