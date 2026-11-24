import type { UserSummaryDto } from '@pim/dtos';

const mockUser: UserSummaryDto = {
  id: 'user-demo',
  name: 'Usuario demo',
  initials: 'UD',
};

/**
 * Usuario con sesión iniciada. Mientras no exista la base de datos de usuarios
 * devuelve un usuario de ejemplo; después leerá la sesión real.
 */
export function useCurrentUser(): UserSummaryDto {
  return mockUser;
}
