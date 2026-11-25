import { useNavigate } from 'react-router-dom';

import { AuthCardLayout } from './components/auth-card-layout';
import { AuthSwitchLink } from './components/auth-switch-link';
import { LoginForm } from './components/login-form';
import { OrDivider } from './components/or-divider';
import { SocialLoginButtons } from './components/social-login-buttons';

/** Pantalla de login (solo UI). */
export function LoginPage() {
  const navigate = useNavigate();

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
      <SocialLoginButtons />
      <OrDivider />
      <LoginForm onSuccess={() => navigate('/products')} />
    </AuthCardLayout>
  );
}
