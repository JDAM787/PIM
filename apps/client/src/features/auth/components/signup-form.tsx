import type { SignupRequestDto } from '@pim/dtos';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { MIN_PASSWORD_LENGTH } from '../signup-validation';
import { useSignupForm } from '../use-signup-form';
import { errorId, FormField } from './form-field';
import { PasswordInput } from './password-input';

interface SignupFormProps {
  onSuccess: (values: SignupRequestDto) => void;
  serverError?: string | null;
  isSubmitting?: boolean;
}

const PASSWORD_HINT_ID = 'signup-password-hint';

export function SignupForm({
  onSuccess,
  serverError,
  isSubmitting = false,
}: SignupFormProps) {
  const { errors, handleSubmit } = useSignupForm(onSuccess);

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField id="signup-name" label="Nombre" error={errors.name}>
        <Input
          id="signup-name"
          name="name"
          autoComplete="name"
          placeholder="Tu nombre y apellido"
          className="h-11"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? errorId('signup-name') : undefined}
        />
      </FormField>

      <FormField
        id="signup-email"
        label="Correo electrónico"
        error={errors.email}
      >
        <Input
          id="signup-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Cualquier correo sirve"
          className="h-11"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? errorId('signup-email') : undefined}
        />
      </FormField>

      <FormField
        id="signup-password"
        label="Contraseña"
        error={errors.password}
      >
        <PasswordInput
          id="signup-password"
          name="password"
          autoComplete="new-password"
          placeholder="Crea una contraseña"
          className="h-11"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={
            errors.password
              ? `${PASSWORD_HINT_ID} ${errorId('signup-password')}`
              : PASSWORD_HINT_ID
          }
        />
        <p id={PASSWORD_HINT_ID} className="text-xs text-muted-foreground">
          Mínimo {MIN_PASSWORD_LENGTH} caracteres.
        </p>
      </FormField>

      <FormField
        id="signup-company"
        label="Empresa"
        labelAside={
          <span className="text-xs text-muted-foreground">Opcional</span>
        }
      >
        <Input
          id="signup-company"
          name="company"
          autoComplete="organization"
          placeholder="Nombre de tu empresa"
          className="h-11"
        />
      </FormField>

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
        {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
      </Button>
    </form>
  );
}
