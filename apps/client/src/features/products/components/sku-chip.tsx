import type { ProductListItemDto } from '@pim/dtos';

import { levelMarks } from '../product-labels';

/** SKU en chip, precedido por la marca de nivel (P = padre, V = variante). */
export function SkuChip({ product }: { product: ProductListItemDto }) {
  const mark = levelMarks[product.level];

  return (
    <span className="inline-flex max-w-full items-center overflow-hidden rounded-md border bg-background text-xs">
      {mark && (
        <abbr
          title={mark.label}
          className="border-r px-1.5 py-0.5 font-semibold no-underline"
        >
          {mark.short}
        </abbr>
      )}
      <span className="truncate px-2 py-0.5" title={product.sku}>
        {product.sku}
      </span>
    </span>
  );
}
