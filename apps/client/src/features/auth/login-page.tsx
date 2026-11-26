import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signInWithEmail } from './auth-service';
import { AuthCardLayout } from './components/auth-card-layout';
import { AuthSwitchLink } from './components/auth-switch-link';
import { LoginForm } from './components/login-form';
import { OrDivider } from './components/or-divider';
import { SocialLoginButtons } from './components/social-login-buttons';
import type { LoginValues } from './login-validation';

/** Pantalla de login conectada a Supabase Auth. */
export function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (values: LoginValues) => {
    setServerError(null);
    setIsSubmitting(true);
    try {
      await signInWithEmail(values.email, values.password);
      navigate('/products');
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : 'No se pudo iniciar sesión.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCardLayout
      title="Bienvenido a PIM"
      footer={
        <AuthSwitchLink
          prompt="¿Primera vez en PIM?"
          to="/signup"
          label="Crea una cuenta"
        />
      }
    >
      <SocialLoginButtons onError={setServerError} />
      <OrDivider />
      <LoginForm
        onSuccess={(values) => void handleLogin(values)}
        serverError={serverError}
        isSubmitting={isSubmitting}
      />
    </AuthCardLayout>
  );
}
