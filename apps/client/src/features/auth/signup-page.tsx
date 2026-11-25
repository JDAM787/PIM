import { useNavigate } from 'react-router-dom';

import { AuthCardLayout } from './components/auth-card-layout';
import { AuthSwitchLink } from './components/auth-switch-link';
import { OrDivider } from './components/or-divider';
import { SignupForm } from './components/signup-form';
import { SocialLoginButtons } from './components/social-login-buttons';

/**
 * Registro self-serve (solo UI): cualquier correo, sin demo ni llamada de ventas.
 * Al crear la cuenta entra directo a la app.
 */
export function SignupPage() {
  const navigate = useNavigate();

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
      <SocialLoginButtons />
      <OrDivider />
      <SignupForm onSuccess={() => navigate('/products', { replace: true })} />
    </AuthCardLayout>
  );
}
