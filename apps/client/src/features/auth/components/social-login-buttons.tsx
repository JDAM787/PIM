import { LockKeyhole } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

import { Button } from '@/components/ui/button';

import { GoogleIcon, MicrosoftIcon } from './provider-icons';

interface Provider {
  id: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const PROVIDERS: Provider[] = [
  { id: 'google', label: 'Continuar con Google', Icon: GoogleIcon },
  { id: 'microsoft', label: 'Continuar con Microsoft', Icon: MicrosoftIcon },
  { id: 'sso', label: 'Usar inicio de sesión único (SSO)', Icon: LockKeyhole },
];

/** Botones de proveedores externos. Solo UI: aún no hay integración de autenticación. */
export function SocialLoginButtons() {
  return (
    <div className="flex flex-col gap-3">
      {PROVIDERS.map(({ id, label, Icon }) => (
        <Button
          key={id}
          type="button"
          variant="outline"
          className="h-11 w-full gap-2 rounded-pill"
        >
          <Icon className="h-5 w-5" />
          {label}
        </Button>
      ))}
    </div>
  );
}
