import type { ProductListItemDto } from '@pim/dtos';
import type { ReactNode } from 'react';

import { AuditStamp } from './components/audit-stamp';
import { CategoryChips } from './components/category-chips';
import { ProductThumbnail } from './components/product-thumbnail';
import { StatusBadge } from './components/status-badge';

export type ProductColumnId =
  | 'thumbnail'
  | 'label'
  | 'status'
  | 'categories'
  | 'modifiedAt'
  | 'createdAt';

export interface ProductColumn {
  id: ProductColumnId;
  header: string;
  /** Si el usuario puede ocultarla desde "Editar columnas". */
  hideable: boolean;
  className?: string;
  cell: (product: ProductListItemDto) => ReactNode;
}

/** Columnas de la tabla (después del SKU, que siempre va fijo al inicio). */
export const productColumns: ProductColumn[] = [
  {
    id: 'thumbnail',
    header: 'Miniatura',
    hideable: true,
    className: 'w-24',
    cell: (product) => (
      <ProductThumbnail url={product.thumbnailUrl} label={product.label} />
    ),
  },
  {
    id: 'label',
    header: 'Nombre',
    hideable: false,
    cell: (product) => (
      <span className="block max-w-[24rem] truncate" title={product.label}>
        {product.label}
      </span>
    ),
  },
  {
    id: 'status',
    header: 'Estado',
    hideable: true,
    cell: (product) => <StatusBadge status={product.status} />,
  },
  {
    id: 'categories',
    header: 'Categorías',
    hideable: true,
    cell: (product) => <CategoryChips categories={product.categories} />,
  },
  {
    id: 'modifiedAt',
    header: 'Última modificación',
    hideable: true,
    cell: (product) => (
      <AuditStamp at={product.modifiedAt} by={product.modifiedBy} />
    ),
  },
  {
    id: 'createdAt',
    header: 'Creado',
    hideable: true,
    cell: (product) => (
      <AuditStamp at={product.createdAt} by={product.createdBy} />
    ),
  },
];
