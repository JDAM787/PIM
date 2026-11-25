import type { SignupRequestDto } from '@pim/dtos';

import { validateEmail } from './auth-validation';

export type SignupErrors = Partial<Record<keyof SignupRequestDto, string>>;

export const MIN_PASSWORD_LENGTH = 8;

function validateName(name: string): string | undefined {
  if (!name) return 'Ingresa tu nombre.';
  return undefined;
}

function validateNewPassword(password: string): string | undefined {
  if (!password) return 'Crea una contraseña.';
  if (password.length < MIN_PASSWORD_LENGTH)
    return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  return undefined;
}

/**
 * Valida el registro. Solo nombre, correo y contraseña son obligatorios;
 * la empresa es opcional. Devuelve un objeto vacío si no hay errores.
 */
export function validateSignup({
  name,
  email,
  password,
}: SignupRequestDto): SignupErrors {
  const errors: SignupErrors = {};
  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validateNewPassword(password);
  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  return errors;
}
