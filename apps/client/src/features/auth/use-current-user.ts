import type { UserSummaryDto } from '@pim/dtos';
import type { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

const mockUser: UserSummaryDto = {
  id: 'user-demo',
  name: 'Usuario demo',
  initials: 'UD',
};

function computeInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  const first = parts[0]?.[0] ?? '';
  const second = parts[1]?.[0] ?? '';
  return (first + second).toUpperCase() || 'U';
}

function mapSupabaseUser(user: User | undefined): UserSummaryDto {
  if (!user) return mockUser;
  const metaName =
    typeof user.user_metadata['full_name'] === 'string'
      ? user.user_metadata['full_name']
      : typeof user.user_metadata['name'] === 'string'
        ? user.user_metadata['name']
        : undefined;
  const name = metaName ?? user.email ?? 'Usuario';
  return {
    id: user.id,
    name,
    initials: computeInitials(name),
  };
}

/**
 * Usuario con sesión iniciada desde Supabase Auth.
 * Si no hay sesión activa o Supabase no está configurado, devuelve el usuario demo.
 */
export function useCurrentUser(): UserSummaryDto {
  const [user, setUser] = useState<UserSummaryDto>(mockUser);

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setUser(mapSupabaseUser(data.session?.user));
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(mapSupabaseUser(session?.user));
      }
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return user;
}
