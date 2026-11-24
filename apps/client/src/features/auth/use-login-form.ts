import { type FormEvent, useState } from 'react';

import {
  type LoginErrors,
  type LoginValues,
  validateLogin,
} from './login-validation';

function readText(data: FormData, name: string): string {
  const value = data.get(name);
  return typeof value === 'string' ? value : '';
}

/** Estado y envío del formulario de login. Solo llama a `onSuccess` si los datos son válidos. */
export function useLoginForm(onSuccess: (values: LoginValues) => void) {
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values: LoginValues = {
      email: readText(data, 'email').trim(),
      password: readText(data, 'password'),
    };
    const nextErrors = validateLogin(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSuccess(values);
  };

  return { errors, handleSubmit };
}
