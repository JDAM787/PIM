import { Columns3 } from 'lucide-react';
import type { ReactNode } from 'react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { type ProductColumnId, productColumns } from '../product-columns';

const hideableColumns = productColumns.filter((column) => column.hideable);

interface ColumnsMenuProps {
  hiddenColumns: ReadonlySet<ProductColumnId>;
  onToggle: (id: ProductColumnId, visible: boolean) => void;
  /** Botón que abre el menú; por defecto "Editar columnas" (solo `lg`+, donde hay tabla). */
  trigger?: ReactNode;
}

export function ColumnsMenu({
  hiddenColumns,
  onToggle,
  trigger,
}: ColumnsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ?? (
          <Button
            variant="ghost"
            className="hidden h-10 gap-2 px-3 lg:inline-flex"
          >
            <Columns3 className="h-4 w-4" aria-hidden="true" />
            Editar columnas
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Columnas visibles</DropdownMenuLabel>
        {hideableColumns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={!hiddenColumns.has(column.id)}
            onCheckedChange={(checked) => onToggle(column.id, checked)}
            onSelect={(event) => event.preventDefault()}
          >
            {column.header}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
