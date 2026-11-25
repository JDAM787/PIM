import type { SignupRequestDto } from '@pim/dtos';
import { type FormEvent, useState } from 'react';

import { readFormText } from './read-form-text';
import { type SignupErrors, validateSignup } from './signup-validation';

function readSignupValues(data: FormData): SignupRequestDto {
  const company = readFormText(data, 'company').trim();
  return {
    name: readFormText(data, 'name').trim(),
    email: readFormText(data, 'email').trim(),
    password: readFormText(data, 'password'),
    ...(company ? { company } : {}),
  };
}

/** Estado y envío del formulario de registro. Solo llama a `onSuccess` si los datos son válidos. */
export function useSignupForm(onSuccess: (values: SignupRequestDto) => void) {
  const [errors, setErrors] = useState<SignupErrors>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = readSignupValues(new FormData(event.currentTarget));
    const nextErrors = validateSignup(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSuccess(values);
  };

  return { errors, handleSubmit };
}
