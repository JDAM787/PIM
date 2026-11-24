import {
  Activity,
  BookOpen,
  CircleHelp,
  Download,
  Gem,
  Headset,
  Image,
  type LucideIcon,
  Package,
  ShoppingBag,
  SlidersHorizontal,
  Store,
  Zap,
} from 'lucide-react';

export interface NavItem {
  label: string;
  icon: LucideIcon;
  /** Sin ruta = sección aún no construida. */
  to?: string;
  /** Punto de aviso (p. ej. novedades sin leer). */
  badge?: boolean;
}

/** Navegación principal, agrupada como en el riel lateral. */
export const mainNavGroups: NavItem[][] = [
  [
    { label: 'Productos', icon: Package, to: '/products' },
    { label: 'Multimedia', icon: Image },
  ],
  [
    { label: 'Canales', icon: Store },
    { label: 'Catálogos', icon: ShoppingBag },
    { label: 'Guías', icon: BookOpen },
  ],
  [{ label: 'Automatizaciones', icon: Zap }],
  [
    { label: 'Importar y exportar', icon: Download },
    { label: 'Configuración', icon: SlidersHorizontal },
  ],
];

export const footerNavItems: NavItem[] = [
  { label: 'Actividad', icon: Activity },
  { label: 'Soporte', icon: Headset },
  { label: 'Ayuda', icon: CircleHelp, badge: true },
  { label: 'Novedades', icon: Gem },
];
