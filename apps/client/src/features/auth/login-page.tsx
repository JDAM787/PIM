import { Link, useNavigate } from 'react-router-dom';

import { BrandLogo } from '@/components/brand-logo';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { LoginForm } from './components/login-form';
import { SocialLoginButtons } from './components/social-login-buttons';

function OrDivider() {
  return (
    <div className="flex items-center gap-3">
      <Separator className="flex-1" />
      <span className="text-xs text-muted-foreground">o</span>
      <Separator className="flex-1" />
    </div>
  );
}

/**
 * Pantalla de login (solo UI). En móvil el logo va dentro de la tarjeta;
 * desde `sm` se mueve a la esquina superior izquierda de la página.
 */
export function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-dvh items-center justify-center bg-auth-gradient px-4 py-6 sm:px-6">
      <BrandLogo className="absolute left-6 top-6 hidden sm:flex" />

      <Card className="w-full max-w-sm rounded-2xl shadow-xl">
        <CardHeader className="gap-4 space-y-0 pb-4">
          <BrandLogo className="sm:hidden" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Bienvenido a PIM
          </h1>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <SocialLoginButtons />
          <OrDivider />
          <LoginForm onSuccess={() => navigate('/')} />
        </CardContent>

        <CardFooter className="flex-wrap gap-x-1 text-sm">
          <span>¿Primera vez en PIM?</span>
          <Link
            to="/signup"
            className="inline-flex min-h-11 items-center font-medium underline underline-offset-2 hover:text-primary"
          >
            Crea una cuenta
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
