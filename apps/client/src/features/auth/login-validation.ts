export interface LoginValues {
  email: string;
  password: string;
}

export type LoginErrors = Partial<Record<keyof LoginValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string): string | undefined {
  if (!email) return 'Ingresa tu correo electrónico.';
  if (!EMAIL_PATTERN.test(email))
    return 'Ingresa un correo electrónico válido.';
  return undefined;
}

function validatePassword(password: string): string | undefined {
  if (!password) return 'Ingresa tu contraseña.';
  return undefined;
}

/** Valida el formulario de login. Devuelve un objeto vacío si no hay errores. */
export function validateLogin({ email, password }: LoginValues): LoginErrors {
  const errors: LoginErrors = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  return errors;
}
