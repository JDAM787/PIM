const formatter = new Intl.DateTimeFormat('es', {
  dateStyle: 'medium',
  timeStyle: 'medium',
});

/** Fecha ISO → "23 sept 2026, 7:24:38" en la zona horaria del navegador. */
export function formatDateTime(iso: string): string {
  return formatter.format(new Date(iso));
}
