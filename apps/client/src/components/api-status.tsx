import type { HealthResponseDto } from '@pim/dtos';
import { useEffect, useState } from 'react';

import { getHealth } from '@/lib/api';

/** Muestra si el server y la base de datos responden. Usa el tipo compartido de @pim/dtos. */
export function ApiStatus() {
  const [health, setHealth] = useState<HealthResponseDto | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getHealth()
      .then(setHealth)
      .catch(() => setError(true));
  }, []);

  const label = error
    ? 'API sin conexión'
    : !health
      ? 'Comprobando API...'
      : `API ok · base de datos ${health.database === 'up' ? 'ok' : 'sin conexión'}`;

  return <p className="text-sm text-muted-foreground">{label}</p>;
}
