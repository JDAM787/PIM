import { useState } from 'react';

import { WorkspaceTabs } from '@/components/layout/workspace-tabs';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';

import { FilterPanel } from './components/filter-panel';
import { ProductCardList } from './components/product-card-list';
import { ProductsToolbar } from './components/products-toolbar';
import { ProductTable } from './components/product-table';
import { type ProductsView, useProductsView } from './hooks/use-products-view';

/** Breakpoint `lg` de Tailwind: a partir de aquí, tabla + panel lateral. */
const DESKTOP_QUERY = '(min-width: 1024px)';

function ListStatus({ children }: { children: string }) {
  return (
    <p className="px-4 py-10 text-center text-sm text-muted-foreground">
      {children}
    </p>
  );
}

function ProductList({
  view,
  isDesktop,
}: {
  view: ProductsView;
  isDesktop: boolean;
}) {
  const { list, columns } = view;

  if (list.error)
    return (
      <ListStatus>
        No pudimos cargar los productos. Intenta de nuevo.
      </ListStatus>
    );
  if (list.items.length === 0) {
    return (
      <ListStatus>
        {list.loading
          ? 'Cargando productos…'
          : 'No hay productos que coincidan.'}
      </ListStatus>
    );
  }

  return (
    <>
      {isDesktop ? (
        <ProductTable
          items={list.items}
          hiddenColumns={columns.hiddenColumns}
          onToggleColumn={columns.toggleColumn}
        />
      ) : (
        <ProductCardList items={list.items} />
      )}
      {list.nextCursor && (
        <div className="flex justify-center p-3">
          <Button
            variant="outline"
            className="h-11"
            disabled={list.loading}
            onClick={list.loadMore}
          >
            {list.loading ? 'Cargando…' : 'Cargar más'}
          </Button>
        </div>
      )}
    </>
  );
}

/** Listado de productos: primera pantalla tras iniciar sesión. */
export function ProductsPage() {
  const view = useProductsView();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [filtersOpen, setFiltersOpen] = useState(isDesktop);
  const closeFilters = () => setFiltersOpen(false);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <WorkspaceTabs title="Todos los productos" />
      <div className="flex min-h-0 flex-1 flex-col bg-card/40">
        <h1 className="sr-only">Productos</h1>
        <ProductsToolbar
          view={view}
          filtersOpen={filtersOpen}
          onToggleFilters={() => setFiltersOpen(!filtersOpen)}
        />
        <div className="flex min-h-0 flex-1 gap-3 px-0 pb-0 sm:px-3 sm:pb-3">
          <section
            aria-label="Listado de productos"
            className="min-h-0 min-w-0 flex-1 overflow-auto border-t bg-card sm:rounded-lg sm:border sm:shadow-sm"
          >
            <ProductList view={view} isDesktop={isDesktop} />
          </section>
          {isDesktop && filtersOpen && (
            <aside
              aria-label="Filtros"
              className="w-80 shrink-0 overflow-hidden rounded-lg border bg-card shadow-sm xl:w-96"
            >
              <FilterPanel onClose={closeFilters} />
            </aside>
          )}
        </div>
      </div>
      <Sheet open={!isDesktop && filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent hideClose className="p-0">
          <SheetTitle className="sr-only">Filtros</SheetTitle>
          <SheetDescription className="sr-only">
            Construye filtros para el listado de productos
          </SheetDescription>
          <FilterPanel onClose={closeFilters} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
