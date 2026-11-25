import { type FormEvent, useState } from 'react';

import {
  type LoginErrors,
  type LoginValues,
  validateLogin,
} from './login-validation';
import { readFormText } from './read-form-text';

/** Estado y envío del formulario de login. Solo llama a `onSuccess` si los datos son válidos. */
export function useLoginForm(onSuccess: (values: LoginValues) => void) {
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values: LoginValues = {
      email: readFormText(data, 'email').trim(),
      password: readFormText(data, 'password'),
    };
    const nextErrors = validateLogin(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSuccess(values);
  };

  return { errors, handleSubmit };
}
