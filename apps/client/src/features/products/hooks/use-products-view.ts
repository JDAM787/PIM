import type {
  ProductLevelFilter,
  ProductSortField,
  ProductStatus,
} from '@pim/dtos';
import { useState } from 'react';

import { useDebouncedValue } from '@/hooks/use-debounced-value';

import type { ProductColumnId } from '../product-columns';
import { useProductList } from './use-product-list';

export type StatusFilter = 'all' | ProductStatus;

const SEARCH_DEBOUNCE_MS = 250;

/** Estado de la vista de productos (filtros, orden, búsqueda, columnas) + datos. */
export function useProductsView() {
  const [status, setStatus] = useState<StatusFilter>('all');
  const [level, setLevel] = useState<ProductLevelFilter>('all');
  const [sort, setSort] = useState<ProductSortField>('modifiedAt');
  const [searchInput, setSearchInput] = useState('');
  const [hiddenColumns, setHiddenColumns] = useState<
    ReadonlySet<ProductColumnId>
  >(() => new Set());
  const search = useDebouncedValue(searchInput, SEARCH_DEBOUNCE_MS);

  const list = useProductList({
    status: status === 'all' ? undefined : status,
    level,
    search: search || undefined,
    sort,
  });

  const toggleColumn = (id: ProductColumnId, visible: boolean) => {
    setHiddenColumns((previous) => {
      const next = new Set(previous);
      if (visible) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return {
    list,
    filters: {
      status,
      setStatus,
      level,
      setLevel,
      sort,
      setSort,
      searchInput,
      setSearchInput,
    },
    columns: { hiddenColumns, toggleColumn },
  };
}

export type ProductsView = ReturnType<typeof useProductsView>;
