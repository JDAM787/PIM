import { Search, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

/** Lupa que se despliega en un campo de búsqueda; se queda abierta mientras haya texto. */
export function SearchBox({ value, onChange }: SearchBoxProps) {
  const [open, setOpen] = useState(false);

  const close = () => {
    onChange('');
    setOpen(false);
  };

  if (!open && !value) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-11 w-11"
        aria-label="Buscar productos"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div className="relative order-last w-full sm:order-none sm:w-64">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="search"
        autoFocus
        aria-label="Buscar por SKU o nombre"
        placeholder="Buscar por SKU o nombre"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => event.key === 'Escape' && close()}
        className="h-11 bg-card pl-9 pr-11 sm:h-10 [&::-webkit-search-cancel-button]:hidden"
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-11 w-11 sm:h-10 sm:w-10"
        aria-label="Cerrar búsqueda"
        onClick={close}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
