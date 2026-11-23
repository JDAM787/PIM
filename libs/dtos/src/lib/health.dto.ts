/**
 * Respuesta del endpoint de salud del API (GET /api).
 * Lo usan tanto el server (al responder) como el client (al consumir).
 */
export interface HealthResponseDto {
  message: string;
  database: 'up' | 'down';
  timestamp: string;
}
