import type { ProductSortField } from '@pim/dtos';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Option } from './option-select';

const sortOptions: readonly Option<ProductSortField>[] = [
  { value: 'modifiedAt', label: 'Última modificación' },
  { value: 'createdAt', label: 'Fecha de creación' },
  { value: 'label', label: 'Nombre (A-Z)' },
];

interface SortMenuProps {
  value: ProductSortField;
  onChange: (value: ProductSortField) => void;
}

export function SortMenu({ value, onChange }: SortMenuProps) {
  const handleChange = (next: string) => {
    const option = sortOptions.find((candidate) => candidate.value === next);
    if (option) onChange(option.value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11"
          aria-label="Ordenar"
        >
          <ArrowUpDown className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={value} onValueChange={handleChange}>
          {sortOptions.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
