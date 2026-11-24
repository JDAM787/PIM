import { Menu } from 'lucide-react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { BrandLogo } from '@/components/brand-logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { UserAvatar } from '@/components/user-avatar';
import { useCurrentUser } from '@/features/auth/use-current-user';

import { SidebarNav } from './sidebar-nav';

/** Menú lateral completo para móvil (< sm). */
function MobileHeader() {
  const user = useCurrentUser();

  return (
    <header className="flex items-center justify-between gap-2 px-2 py-1 sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-shell p-3 pt-14">
          <SheetTitle className="sr-only">Menú principal</SheetTitle>
          <SheetDescription className="sr-only">
            Secciones de PIM
          </SheetDescription>
          <SidebarNav showLabels />
        </SheetContent>
      </Sheet>
      <BrandLogo />
      <UserAvatar user={user} className="mx-2.5 h-8 w-8 text-xs" />
    </header>
  );
}

/** Riel de iconos desde `sm`. */
function SidebarRail() {
  const user = useCurrentUser();

  return (
    <aside className="hidden w-16 shrink-0 flex-col items-center gap-4 border-r bg-shell py-3 sm:flex">
      <BrandLogo showName={false} />
      <SidebarNav showLabels={false} />
      <UserAvatar user={user} className="h-9 w-9 text-xs" />
    </aside>
  );
}

/** Marco de las pantallas con sesión: navegación + contenido de la ruta. */
export function AppShell() {
  return (
    <div className="flex h-dvh flex-col bg-shell text-foreground sm:flex-row">
      <MobileHeader />
      <SidebarRail />
      <main className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
