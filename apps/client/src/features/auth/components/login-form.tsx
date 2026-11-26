import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { LoginValues } from '../login-validation';
import { useLoginForm } from '../use-login-form';
import { errorId, FormField } from './form-field';
import { PasswordInput } from './password-input';

interface LoginFormProps {
  onSuccess: (values: LoginValues) => void;
  serverError?: string | null;
  isSubmitting?: boolean;
}

export function LoginForm({
  onSuccess,
  serverError,
  isSubmitting = false,
}: LoginFormProps) {
  const { errors, handleSubmit } = useLoginForm(onSuccess);

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField id="email" label="Correo electrónico" error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Ingresa tu correo"
          className="h-11"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? errorId('email') : undefined}
        />
      </FormField>

      <FormField
        id="password"
        label="Contraseña"
        error={errors.password}
        labelAside={
          <Link
            to="/forgot-password"
            className="inline-flex min-h-11 items-center text-xs underline underline-offset-2 hover:text-primary"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        }
      >
        <PasswordInput
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="Ingresa tu contraseña"
          className="h-11"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? errorId('password') : undefined}
        />
      </FormField>

      <Label
        htmlFor="remember"
        className="flex min-h-11 cursor-pointer items-center gap-2 font-normal"
      >
        <Checkbox id="remember" name="remember" />
        Recordarme
      </Label>

      {serverError && (
        <p role="alert" className="text-sm text-destructive">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-pill"
      >
        {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </Button>
    </form>
  );
}
