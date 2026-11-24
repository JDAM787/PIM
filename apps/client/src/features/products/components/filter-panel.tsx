import {
  CalendarDays,
  Globe,
  Images,
  List,
  type LucideIcon,
  Network,
  PanelRightClose,
  Plus,
  Save,
  Shapes,
  Tag,
  WalletCards,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

interface FilterSource {
  label: string;
  icon: LucideIcon;
}

const filterSources: FilterSource[] = [
  { label: 'Atributos', icon: Tag },
  { label: 'Multimedia', icon: Images },
  { label: 'Familia o tipo de producto', icon: WalletCards },
  { label: 'Creación o modificación', icon: CalendarDays },
  { label: 'Categorías', icon: Shapes },
  { label: 'Destinos', icon: Globe },
  { label: 'Relaciones', icon: Network },
];

interface FilterPanelProps {
  onClose: () => void;
}

/**
 * Constructor de filtros avanzados. Por ahora solo la estructura visual:
 * los filtros reales llegarán cuando el API exponga atributos y categorías.
 */
export function FilterPanel({ onClose }: FilterPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b px-2 py-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11"
          aria-label="Ocultar filtros"
          onClick={onClose}
        >
          <PanelRightClose className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            className="h-11 px-3 text-muted-foreground"
            disabled
          >
            Limpiar todo
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11"
            aria-label="Filtros guardados"
          >
            <List className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11"
            aria-label="Guardar filtro"
          >
            <Save className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <Button
          variant="outline"
          className="h-14 gap-2 border-dashed font-medium"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nuevo filtro
        </Button>

        <p className="text-sm text-muted-foreground">Empezar desde:</p>
        <ul className="flex flex-col gap-3">
          {filterSources.map(({ label, icon: Icon }) => (
            <li key={label}>
              <Button
                variant="outline"
                className="h-12 w-full justify-start gap-3 font-medium"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
