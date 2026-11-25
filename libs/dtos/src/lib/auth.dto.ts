/**
 * Alta de cuenta self-serve (POST /api/auth/signup).
 * Acepta cualquier correo: no se exige dominio corporativo.
 */
export interface SignupRequestDto {
  name: string;
  email: string;
  password: string;
  /** Opcional: se puede completar después desde el perfil. */
  company?: string;
}
