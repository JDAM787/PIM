import { NavLink } from 'react-router-dom';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { footerNavItems, mainNavGroups, type NavItem } from './nav-items';

interface SidebarNavProps {
  /** `false` en el riel de iconos; `true` en el menú móvil. */
  showLabels: boolean;
}

const itemClass =
  'flex h-11 items-center gap-3 rounded-lg px-3 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

function NavEntry({
  item,
  showLabels,
}: {
  item: NavItem;
  showLabels: boolean;
}) {
  const Icon = item.icon;
  const content = (
    <>
      <span className="relative shrink-0">
        <Icon className="h-5 w-5" aria-hidden="true" />
        {item.badge && (
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-destructive"
          />
        )}
      </span>
      <span className={cn(!showLabels && 'sr-only')}>{item.label}</span>
    </>
  );
  const layout = cn(itemClass, !showLabels && 'w-11 justify-center px-0');

  if (!item.to) {
    return (
      <button
        type="button"
        title={`${item.label} (próximamente)`}
        className={layout}
      >
        {content}
      </button>
    );
  }

  return (
    <NavLink
      to={item.to}
      title={item.label}
      className={({ isActive }) =>
        cn(layout, isActive && 'border bg-card text-foreground shadow-sm')
      }
    >
      {content}
    </NavLink>
  );
}

function NavList({
  items,
  showLabels,
}: {
  items: NavItem[];
  showLabels: boolean;
}) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item.label}>
          <NavEntry item={item} showLabels={showLabels} />
        </li>
      ))}
    </ul>
  );
}

export function SidebarNav({ showLabels }: SidebarNavProps) {
  return (
    <nav
      aria-label="Principal"
      className="flex min-h-0 flex-1 flex-col justify-between gap-4 overflow-y-auto"
    >
      <div className="flex flex-col gap-3">
        {mainNavGroups.map((group, index) => (
          <div key={group[0]?.label ?? index} className="flex flex-col gap-3">
            {index > 0 && <Separator />}
            <NavList items={group} showLabels={showLabels} />
          </div>
        ))}
      </div>
      <NavList items={footerNavItems} showLabels={showLabels} />
    </nav>
  );
}
