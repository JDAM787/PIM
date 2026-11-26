import { LockKeyhole } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

import { Button } from '@/components/ui/button';

import { signInWithGoogle } from '../auth-service';
import { GoogleIcon, MicrosoftIcon } from './provider-icons';

interface Provider {
  id: 'google' | 'microsoft' | 'sso';
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const PROVIDERS: Provider[] = [
  { id: 'google', label: 'Continuar con Google', Icon: GoogleIcon },
  { id: 'microsoft', label: 'Continuar con Microsoft', Icon: MicrosoftIcon },
  { id: 'sso', label: 'Usar inicio de sesión único (SSO)', Icon: LockKeyhole },
];

interface SocialLoginButtonsProps {
  onError?: (message: string) => void;
}

/** Botones de proveedores externos. Google conectado a Supabase Auth. */
export function SocialLoginButtons({ onError }: SocialLoginButtonsProps) {
  const handleProvider = async (id: Provider['id']) => {
    if (id !== 'google') return;
    try {
      await signInWithGoogle();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'No se pudo iniciar sesión con Google.';
      onError?.(message);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {PROVIDERS.map(({ id, label, Icon }) => (
        <Button
          key={id}
          type="button"
          variant="outline"
          disabled={id !== 'google'}
          onClick={() => void handleProvider(id)}
          className="h-11 w-full gap-2 rounded-pill"
        >
          <Icon className="h-5 w-5" />
          {label}
        </Button>
      ))}
    </div>
  );
}
