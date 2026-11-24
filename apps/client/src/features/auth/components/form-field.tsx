import type { ReactNode } from 'react';

import { Label } from '@/components/ui/label';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  /** Contenido alineado a la derecha de la etiqueta (p. ej. "¿Olvidaste tu contraseña?"). */
  labelAside?: ReactNode;
  children: ReactNode;
}

/** Etiqueta + control + mensaje de error. El control debe usar `aria-describedby={errorId(id)}`. */
export function FormField({
  id,
  label,
  error,
  labelAside,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {labelAside}
      </div>
      {children}
      {error && (
        <p id={errorId(id)} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function errorId(id: string): string {
  return `${id}-error`;
}
