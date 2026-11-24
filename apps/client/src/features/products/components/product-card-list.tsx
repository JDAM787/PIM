import type { ProductListItemDto } from '@pim/dtos';

import { formatDateTime } from '../format-date-time';
import { CategoryChips } from './category-chips';
import { ProductThumbnail } from './product-thumbnail';
import { SkuChip } from './sku-chip';
import { StatusBadge } from './status-badge';

function ProductCard({ product }: { product: ProductListItemDto }) {
  return (
    <article className="flex gap-3 border-b px-3 py-3">
      <ProductThumbnail
        url={product.thumbnailUrl}
        label={product.label}
        className="h-12 w-12"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-medium">{product.label}</h3>
          <StatusBadge status={product.status} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SkuChip product={product} />
          {product.variantCount > 0 && (
            <span className="text-xs text-muted-foreground">
              {product.variantCount} variantes
            </span>
          )}
          <CategoryChips categories={product.categories} />
        </div>
        <p className="text-xs text-muted-foreground">
          Modificado{' '}
          <time dateTime={product.modifiedAt}>
            {formatDateTime(product.modifiedAt)}
          </time>
        </p>
      </div>
    </article>
  );
}

/** Listado de productos en tarjetas para móvil y tablet (< `lg`). */
export function ProductCardList({ items }: { items: ProductListItemDto[] }) {
  return (
    <div>
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
