import type { HealthResponseDto } from '@pim/dtos';
import axios from 'axios';

import { supabase } from './supabase';

/** Cliente HTTP del front. En dev, Vite redirige /api al server (ver vite.config.mts). */
const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use(async (config) => {
  if (!supabase) return config;
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getHealth(): Promise<HealthResponseDto> {
  const { data } = await api.get<HealthResponseDto>('/');
  return data;
}

export async function createAccount(name: string): Promise<void> {
  await api.post('/accounts', { name });
}
