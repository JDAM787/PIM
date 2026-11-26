import type { SignupRequestDto } from '@pim/dtos';

import { createAccount } from '@/lib/api';
import { getSupabase } from '@/lib/supabase';

export async function signInWithGoogle(): Promise<void> {
  const { error } = await getSupabase().auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin },
  });
  if (error) {
    throw new Error(error.message);
  }
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<void> {
  const { error } = await getSupabase().auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
}

export async function signUpWithEmail(
  values: SignupRequestDto
): Promise<{ needsEmailConfirmation: boolean }> {
  const { data, error } = await getSupabase().auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: { full_name: values.name },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  if (data.session && values.company) {
    await createAccount(values.company);
  }
  return { needsEmailConfirmation: !data.session };
}
