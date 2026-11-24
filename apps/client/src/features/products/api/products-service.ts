import type {
  ProductListItemDto,
  ProductListQueryDto,
  ProductListResponseDto,
  ProductSortField,
} from '@pim/dtos';

import { mockProducts } from './mock-products';

const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 100;

type Predicate = (product: ProductListItemDto) => boolean;

function levelPredicate(query: ProductListQueryDto): Predicate {
  const { parentId, level = 'all' } = query;
  if (parentId) return (product) => product.parentId === parentId;
  if (level === 'all') return (product) => product.parentId === null;
  return (product) => product.level === level;
}

function buildPredicate(query: ProductListQueryDto): Predicate {
  const matchesLevel = levelPredicate(query);
  const term = query.search?.trim().toLowerCase() ?? '';
  return (product) =>
    matchesLevel(product) &&
    (!query.status || product.status === query.status) &&
    (!term ||
      product.label.toLowerCase().includes(term) ||
      product.sku.toLowerCase().includes(term));
}

const comparators: Record<
  ProductSortField,
  (a: ProductListItemDto, b: ProductListItemDto) => number
> = {
  label: (a, b) => a.label.localeCompare(b.label, 'es'),
  modifiedAt: (a, b) => b.modifiedAt.localeCompare(a.modifiedAt),
  createdAt: (a, b) => b.createdAt.localeCompare(a.createdAt),
};

function clampLimit(limit: number | undefined): number {
  return Math.min(Math.max(limit ?? DEFAULT_LIMIT, 1), MAX_LIMIT);
}

function parseCursor(cursor: string | undefined): number {
  const offset = Number(cursor ?? 0);
  return Number.isInteger(offset) && offset > 0 ? offset : 0;
}

/**
 * Listado de productos con filtros, orden y paginación por cursor.
 * Hoy lee datos mock en memoria; cuando exista el endpoint, solo cambia
 * el cuerpo de esta función (el contrato es el de `@pim/dtos`).
 */
export async function listProducts(
  query: ProductListQueryDto = {}
): Promise<ProductListResponseDto> {
  const matches = mockProducts
    .filter(buildPredicate(query))
    .sort(comparators[query.sort ?? 'modifiedAt']);
  const offset = parseCursor(query.cursor);
  const end = offset + clampLimit(query.limit);

  return {
    items: matches.slice(offset, end),
    total: matches.length,
    nextCursor: end < matches.length ? String(end) : null,
  };
}
