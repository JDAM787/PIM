/** Estado editorial de un producto. */
export type ProductStatus = 'draft' | 'completed';

/**
 * Nivel en la jerarquía de producto:
 * - `parent`: agrupa variantes.
 * - `variant`: hija de un `parent`.
 * - `standalone`: producto simple, sin variantes.
 */
export type ProductLevel = 'parent' | 'variant' | 'standalone';

/** Resumen de usuario para mostrar autoría (avatar + nombre). */
export interface UserSummaryDto {
  id: string;
  name: string;
  initials: string;
}

/** Fila del listado de productos. Las fechas van en ISO 8601. */
export interface ProductListItemDto {
  id: string;
  sku: string;
  label: string;
  thumbnailUrl: string | null;
  status: ProductStatus;
  level: ProductLevel;
  parentId: string | null;
  variantCount: number;
  categories: string[];
  modifiedAt: string;
  /** `null` cuando el cambio lo hizo el sistema (importación, automatización). */
  modifiedBy: UserSummaryDto | null;
  createdAt: string;
  createdBy: UserSummaryDto | null;
}

export type ProductSortField = 'modifiedAt' | 'createdAt' | 'label';

/** `all` = productos de primer nivel (padres y simples), sin variantes sueltas. */
export type ProductLevelFilter = 'all' | 'parent' | 'variant';

export interface ProductListQueryDto {
  status?: ProductStatus;
  level?: ProductLevelFilter;
  /** Si viene, devuelve solo las variantes de ese padre e ignora `level`. */
  parentId?: string;
  /** Busca en SKU y nombre, sin distinguir mayúsculas. */
  search?: string;
  sort?: ProductSortField;
  cursor?: string;
  limit?: number;
}

/** Página de resultados con paginación por cursor. */
export interface ProductListResponseDto {
  items: ProductListItemDto[];
  total: number;
  nextCursor: string | null;
}
