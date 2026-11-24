import type { ProductListItemDto } from '@pim/dtos';
import { ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

import { useProductList } from '../hooks/use-product-list';
import { type RowSelection, useRowSelection } from '../hooks/use-row-selection';
import {
  type ProductColumn,
  type ProductColumnId,
  productColumns,
} from '../product-columns';
import { ColumnsMenu } from './columns-menu';
import { SkuChip } from './sku-chip';

const cellClass = 'h-11 px-3 py-1.5 align-middle';
const MAX_VARIANTS = 100;

function HeaderLabel({ children }: { children: string }) {
  return (
    <span className="whitespace-nowrap font-normal text-muted-foreground">
      <span className="mr-1 text-[0.625rem] font-semibold text-foreground">
        SYS
      </span>
      {children}
    </span>
  );
}

interface RowProps {
  product: ProductListItemDto;
  columns: ProductColumn[];
  selection: RowSelection;
}

function VariantToggle({
  product,
  expanded,
  onToggle,
}: {
  product: ProductListItemDto;
  expanded: boolean;
  onToggle: () => void;
}) {
  if (product.variantCount === 0) return null;

  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-label={`${expanded ? 'Ocultar' : 'Mostrar'} ${
        product.variantCount
      } variantes`}
      onClick={onToggle}
      className="flex h-11 items-center gap-2 rounded-md px-1 text-xs hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="min-w-6 rounded-md border bg-background px-1.5 py-0.5 font-semibold">
        {product.variantCount}
      </span>
      <ChevronRight
        className={cn('h-4 w-4 transition-transform', expanded && 'rotate-90')}
        aria-hidden="true"
      />
    </button>
  );
}

function VariantRows({
  parentId,
  columns,
  selection,
}: Omit<RowProps, 'product'> & { parentId: string }) {
  const { items, loading } = useProductList({ parentId, limit: MAX_VARIANTS });

  if (loading && items.length === 0) {
    return (
      <tr>
        <td
          colSpan={columns.length + 4}
          className={cn(cellClass, 'pl-24 text-muted-foreground')}
        >
          Cargando variantes…
        </td>
      </tr>
    );
  }

  return items.map((variant) => (
    <ProductRow
      key={variant.id}
      product={variant}
      columns={columns}
      selection={selection}
    />
  ));
}

function ProductRow({ product, columns, selection }: RowProps) {
  const [expanded, setExpanded] = useState(false);
  const selected = selection.isSelected(product.id);

  return (
    <>
      <tr
        className={cn(
          'border-b transition-colors hover:bg-accent/60',
          selected && 'bg-primary/10 hover:bg-primary/15'
        )}
      >
        <td className={cn(cellClass, 'w-12')}>
          <Checkbox
            aria-label={`Seleccionar ${product.label}`}
            checked={selected}
            onCheckedChange={(checked) =>
              selection.toggle(product.id, checked === true)
            }
          />
        </td>
        <td className={cn(cellClass, 'w-20 px-1')}>
          <VariantToggle
            product={product}
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
          />
        </td>
        <td
          className={cn(
            cellClass,
            'w-40 max-w-40 border-r',
            product.parentId && 'pl-6'
          )}
        >
          <SkuChip product={product} />
        </td>
        {columns.map((column) => (
          <td
            key={column.id}
            className={cn(cellClass, 'border-r', column.className)}
          >
            {column.cell(product)}
          </td>
        ))}
        <td className={cellClass} />
      </tr>
      {expanded && (
        <VariantRows
          parentId={product.id}
          columns={columns}
          selection={selection}
        />
      )}
    </>
  );
}

interface ProductTableProps {
  items: ProductListItemDto[];
  hiddenColumns: ReadonlySet<ProductColumnId>;
  onToggleColumn: (id: ProductColumnId, visible: boolean) => void;
}

/** Tabla de productos para pantallas anchas (`lg`+). */
export function ProductTable({
  items,
  hiddenColumns,
  onToggleColumn,
}: ProductTableProps) {
  const columns = productColumns.filter(
    (column) => !hiddenColumns.has(column.id)
  );
  const { selection, allState, toggleAll } = useRowSelection(
    items.map((item) => item.id)
  );

  return (
    <table className="w-full border-collapse text-sm">
      <thead className="sticky top-0 z-10 bg-card">
        <tr className="border-b text-left text-xs">
          <th scope="col" className={cn(cellClass, 'w-12')}>
            <Checkbox
              aria-label="Seleccionar todos"
              checked={allState}
              onCheckedChange={(checked) => toggleAll(checked === true)}
            />
          </th>
          <th scope="col" className={cn(cellClass, 'w-20')}>
            <span className="sr-only">Variantes</span>
          </th>
          <th scope="col" className={cn(cellClass, 'border-r')}>
            <HeaderLabel>SKU</HeaderLabel>
          </th>
          {columns.map((column) => (
            <th
              key={column.id}
              scope="col"
              className={cn(cellClass, 'border-r', column.className)}
            >
              <HeaderLabel>{column.header}</HeaderLabel>
            </th>
          ))}
          <th scope="col" className={cn(cellClass, 'w-12 text-right')}>
            <ColumnsMenu
              hiddenColumns={hiddenColumns}
              onToggle={onToggleColumn}
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  aria-label="Editar columnas"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              }
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            columns={columns}
            selection={selection}
          />
        ))}
      </tbody>
    </table>
  );
}
