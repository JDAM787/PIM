import type { ReactNode } from 'react';

import { BrandLogo } from '@/components/brand-logo';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface AuthCardLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer: ReactNode;
}

/**
 * Marco común de login y registro. En móvil el logo va dentro de la tarjeta;
 * desde `sm` se mueve a la esquina superior izquierda de la página.
 */
export function AuthCardLayout({
  title,
  description,
  children,
  footer,
}: AuthCardLayoutProps) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center bg-auth-gradient px-4 py-6 sm:px-6">
      <BrandLogo className="absolute left-6 top-6 hidden sm:flex" />

      <Card className="w-full max-w-sm rounded-2xl shadow-xl">
        <CardHeader className="gap-4 space-y-0 pb-4">
          <BrandLogo className="sm:hidden" />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">{children}</CardContent>

        <CardFooter className="flex-wrap gap-x-1 text-sm">{footer}</CardFooter>
      </Card>
    </div>
  );
}
