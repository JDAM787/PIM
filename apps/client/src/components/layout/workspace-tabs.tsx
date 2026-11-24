import { Ellipsis, House, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface WorkspaceTabsProps {
  /** Nombre de la vista activa (accesible y visible desde `sm`). */
  title: string;
}

/** Barra de pestañas de vistas abiertas. Hoy solo existe la vista principal. */
export function WorkspaceTabs({ title }: WorkspaceTabsProps) {
  return (
    <div className="flex items-end gap-1 px-2 pt-1 sm:px-3 sm:pt-2">
      <div
        aria-current="page"
        className="flex h-11 items-center gap-2 rounded-t-lg bg-card px-3 text-sm font-medium"
      >
        <House className="h-4 w-4" aria-hidden="true" />
        <span className="max-w-[10rem] truncate">{title}</span>
        <Ellipsis
          className="h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-11 w-11"
        aria-label="Nueva pestaña (próximamente)"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
