import type { ProductLevelFilter } from '@pim/dtos';
import { ListFilter, Package, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { ProductsView, StatusFilter } from '../hooks/use-products-view';
import { ColumnsMenu } from './columns-menu';
import { type Option, OptionSelect } from './option-select';
import { SearchBox } from './search-box';
import { SortMenu } from './sort-menu';

const statusOptions: readonly Option<StatusFilter>[] = [
  { value: 'all', label: 'Todos los productos' },
  { value: 'completed', label: 'Completados' },
  { value: 'draft', label: 'Borradores' },
];

const levelOptions: readonly Option<ProductLevelFilter>[] = [
  { value: 'all', label: 'Todos los niveles' },
  { value: 'parent', label: 'Productos padre' },
  { value: 'variant', label: 'Variantes' },
];

function ProductCount({ total }: { total: number }) {
  return (
    <div className="flex h-11 items-center rounded-lg border bg-card shadow-sm sm:h-10">
      <span className="flex items-center gap-2 px-3 text-sm font-semibold">
        <Package className="h-4 w-4" aria-hidden="true" />
        <span aria-label={`${total} productos`}>{total}</span>
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-11 w-11 rounded-l-none border-l text-primary sm:h-10 sm:w-10"
        aria-label="Nuevo producto (próximamente)"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

interface ProductsToolbarProps {
  view: ProductsView;
  filtersOpen: boolean;
  onToggleFilters: () => void;
}

export function ProductsToolbar({
  view,
  filtersOpen,
  onToggleFilters,
}: ProductsToolbarProps) {
  const { filters, columns, list } = view;

  return (
    <div className="flex flex-wrap items-center gap-2 px-2 py-2 sm:px-3">
      <ProductCount total={list.total} />
      <OptionSelect
        label="Estado"
        options={statusOptions}
        value={filters.status}
        onChange={filters.setStatus}
      />
      <OptionSelect
        label="Nivel"
        options={levelOptions}
        value={filters.level}
        onChange={filters.setLevel}
      />
      <ColumnsMenu
        hiddenColumns={columns.hiddenColumns}
        onToggle={columns.toggleColumn}
      />

      <div className="ml-auto flex flex-wrap items-center justify-end gap-1">
        <SortMenu value={filters.sort} onChange={filters.setSort} />
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-11 w-11',
            filtersOpen && 'bg-primary/10 text-primary hover:bg-primary/15'
          )}
          aria-label="Filtros"
          aria-pressed={filtersOpen}
          onClick={onToggleFilters}
        >
          <ListFilter className="h-5 w-5" />
        </Button>
        <SearchBox
          value={filters.searchInput}
          onChange={filters.setSearchInput}
        />
      </div>
    </div>
  );
}
