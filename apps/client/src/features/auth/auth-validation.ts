const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Regla de correo compartida por login y registro. Acepta cualquier dominio. */
export function validateEmail(email: string): string | undefined {
  if (!email) return 'Ingresa tu correo electrónico.';
  if (!EMAIL_PATTERN.test(email))
    return 'Ingresa un correo electrónico válido.';
  return undefined;
}
