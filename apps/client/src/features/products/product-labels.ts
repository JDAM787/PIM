import type { ProductLevel, ProductStatus } from '@pim/dtos';

export const statusLabels: Record<ProductStatus, string> = {
  draft: 'Borrador',
  completed: 'Completado',
};

/** Marca corta junto al SKU. Los productos simples no llevan marca. */
export const levelMarks: Record<
  ProductLevel,
  { short: string; label: string } | null
> = {
  parent: { short: 'P', label: 'Producto padre' },
  variant: { short: 'V', label: 'Variante' },
  standalone: null,
};
