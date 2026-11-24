import type {
  ProductListItemDto,
  ProductListQueryDto,
  ProductListResponseDto,
} from '@pim/dtos';
import { useEffect, useRef, useState } from 'react';

import { listProducts } from '../api/products-service';

interface ProductListState {
  items: ProductListItemDto[];
  total: number;
  nextCursor: string | null;
  loading: boolean;
  error: boolean;
}

const initialState: ProductListState = {
  items: [],
  total: 0,
  nextCursor: null,
  loading: true,
  error: false,
};

type ListFilters = Omit<ProductListQueryDto, 'cursor'>;

/**
 * Carga la primera página al cambiar los filtros y expone `loadMore` para la siguiente.
 * Las respuestas de filtros anteriores se descartan para evitar condiciones de carrera.
 */
export function useProductList({
  status,
  level,
  parentId,
  search,
  sort,
  limit,
}: ListFilters) {
  const [state, setState] = useState<ProductListState>(initialState);
  const generation = useRef(0);

  useEffect(() => {
    const current = ++generation.current;
    setState((previous) => ({ ...previous, loading: true, error: false }));
    listProducts({ status, level, parentId, search, sort, limit })
      .then((page) => {
        if (current !== generation.current) return;
        setState({ ...page, loading: false, error: false });
      })
      .catch(() => {
        if (current !== generation.current) return;
        setState({ ...initialState, loading: false, error: true });
      });
    return () => {
      generation.current += 1;
    };
  }, [status, level, parentId, search, sort, limit]);

  const appendPage = (page: ProductListResponseDto) => {
    setState((previous) => ({
      ...page,
      items: [...previous.items, ...page.items],
      loading: false,
      error: false,
    }));
  };

  const loadMore = () => {
    if (!state.nextCursor || state.loading) return;
    const current = generation.current;
    setState((previous) => ({ ...previous, loading: true }));
    listProducts({
      status,
      level,
      parentId,
      search,
      sort,
      limit,
      cursor: state.nextCursor,
    })
      .then((page) => {
        if (current === generation.current) appendPage(page);
      })
      .catch(() => {
        if (current !== generation.current) return;
        setState((previous) => ({ ...previous, loading: false, error: true }));
      });
  };

  return { ...state, loadMore };
}
