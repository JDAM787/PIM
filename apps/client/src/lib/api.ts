import type { HealthResponseDto } from '@pim/dtos';
import axios from 'axios';

/** Cliente HTTP del front. En dev, Vite redirige /api al server (ver vite.config.mts). */
export const api = axios.create({ baseURL: '/api' });

export async function getHealth(): Promise<HealthResponseDto> {
  const { data } = await api.get<HealthResponseDto>('/');
  return data;
}
