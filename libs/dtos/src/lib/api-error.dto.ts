/** Forma estándar de los errores que devuelve NestJS. */
export interface ApiErrorDto {
  statusCode: number;
  message: string | string[];
  error?: string;
}
