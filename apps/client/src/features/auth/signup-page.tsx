import type { SignupRequestDto } from '@pim/dtos';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signUpWithEmail } from './auth-service';
import { AuthCardLayout } from './components/auth-card-layout';
import { AuthSwitchLink } from './components/auth-switch-link';
import { OrDivider } from './components/or-divider';
import { SignupForm } from './components/signup-form';
import { SocialLoginButtons } from './components/social-login-buttons';

/**
 * Registro self-serve conectado a Supabase Auth.
 * Si el proyecto no exige confirmación por correo, entra directo a la app.
 */
export function SignupPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (values: SignupRequestDto) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      const { needsEmailConfirmation } = await signUpWithEmail(values);
      if (needsEmailConfirmation) {
        setConfirmationSent(true);
        return;
      }
      navigate('/products', { replace: true });
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'No se pudo crear la cuenta.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCardLayout
      title="Crea tu cuenta"
      description="Empieza a usar PIM en un minuto. Solo necesitas un correo."
      footer={
        <AuthSwitchLink
          prompt="¿Ya tienes cuenta?"
          to="/login"
          label="Inicia sesión"
        />
      }
    >
      <SocialLoginButtons onError={setServerError} />
      <OrDivider />
      {confirmationSent ? (
        <p role="status" className="text-center text-sm text-muted-foreground">
          Revisa tu correo para confirmar tu cuenta y luego inicia sesión.
        </p>
      ) : (
        <SignupForm
          onSuccess={(values) => void handleSignup(values)}
          serverError={serverError}
          isSubmitting={isSubmitting}
        />
      )}
    </AuthCardLayout>
  );
}
