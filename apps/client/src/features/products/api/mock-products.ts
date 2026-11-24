import type {
  ProductListItemDto,
  ProductStatus,
  UserSummaryDto,
} from '@pim/dtos';

/**
 * Datos de ejemplo mientras no exista la base de datos de productos.
 * Se borran cuando `products-service.ts` apunte al API real.
 */

const demoUser: UserSummaryDto = {
  id: 'user-demo',
  name: 'Usuario demo',
  initials: 'UD',
};

interface ProductSeed {
  label: string;
  categories: string[];
  variants: number;
  status?: ProductStatus;
}

const seeds: ProductSeed[] = [
  {
    label: 'Camiseta básica manga corta, blanca, unisex',
    categories: ['Camisetas', 'Ropa'],
    variants: 5,
  },
  {
    label: 'Funda para laptop, morada',
    categories: ['Fundas para laptop', 'Accesorios'],
    variants: 2,
  },
  {
    label: 'Sticker de burbuja "Superestrella", verde',
    categories: ['Stickers', 'Papelería'],
    variants: 3,
  },
  {
    label: 'Funda para teléfono Samsung Galaxy',
    categories: ['Fundas Samsung', 'Accesorios'],
    variants: 2,
  },
  {
    label: 'Sticker de burbuja con logo, morado',
    categories: ['Stickers', 'Papelería'],
    variants: 2,
  },
  {
    label: 'Funda para iPhone biodegradable, negra',
    categories: ['Fundas iPhone', 'Accesorios'],
    variants: 4,
  },
  {
    label: 'Sudadera helado, gris, unisex',
    categories: ['Sudaderas', 'Ropa'],
    variants: 6,
  },
  {
    label: 'Short estampado confeti, hombre',
    categories: ['Shorts', 'Ropa'],
    variants: 6,
  },
  {
    label: 'Hoodie con logo, negro, unisex',
    categories: ['Hoodies', 'Ropa'],
    variants: 6,
  },
  {
    label: 'Tote bag "Querido Excel", beige orgánico',
    categories: ['Tote bags', 'Accesorios'],
    variants: 1,
  },
  {
    label: 'Gorra bordada, azul marino',
    categories: ['Gorras', 'Accesorios'],
    variants: 0,
  },
  {
    label: 'Taza de cerámica mate, 350 ml',
    categories: ['Tazas', 'Hogar'],
    variants: 0,
    status: 'draft',
  },
];

const DAY_MS = 24 * 60 * 60 * 1000;
const MODIFIED_BASE = Date.parse('2026-09-23T07:24:38Z');
const CREATED_BASE = Date.parse('2023-09-27T08:56:53Z');

function isoFrom(base: number, offsetDays: number): string {
  return new Date(base - offsetDays * DAY_MS).toISOString();
}

function skuFor(index: number): string {
  return `NSP-${String(1000 + index)}`;
}

function buildParent(seed: ProductSeed, index: number): ProductListItemDto {
  return {
    id: `product-${index}`,
    sku: skuFor(index * 10),
    label: seed.label,
    thumbnailUrl: null,
    status: seed.status ?? 'completed',
    level: seed.variants > 0 ? 'parent' : 'standalone',
    parentId: null,
    variantCount: seed.variants,
    categories: seed.categories,
    modifiedAt: isoFrom(MODIFIED_BASE, index),
    modifiedBy: null,
    createdAt: isoFrom(CREATED_BASE, index * 3),
    createdBy: seed.status === 'draft' ? demoUser : null,
  };
}

function buildVariants(
  parent: ProductListItemDto,
  index: number
): ProductListItemDto[] {
  return Array.from({ length: parent.variantCount }, (_, position) => ({
    ...parent,
    id: `${parent.id}-v${position + 1}`,
    sku: skuFor(index * 10 + position + 1),
    label: `${parent.label} · variante ${position + 1}`,
    level: 'variant',
    parentId: parent.id,
    variantCount: 0,
  }));
}

/** Producto suelto creado a mano, sin SKU de catálogo ni categorías. */
const draftProduct: ProductListItemDto = {
  id: 'product-draft',
  sku: '98f8gf',
  label: 'Producto sin terminar',
  thumbnailUrl: null,
  status: 'draft',
  level: 'standalone',
  parentId: null,
  variantCount: 0,
  categories: [],
  modifiedAt: isoFrom(MODIFIED_BASE, 0),
  modifiedBy: demoUser,
  createdAt: '2024-01-06T13:31:02Z',
  createdBy: demoUser,
};

function buildCatalog(): ProductListItemDto[] {
  const catalog: ProductListItemDto[] = [draftProduct];
  seeds.forEach((seed, index) => {
    const parent = buildParent(seed, index + 1);
    catalog.push(parent, ...buildVariants(parent, index + 1));
  });
  return catalog;
}

export const mockProducts: readonly ProductListItemDto[] = buildCatalog();
