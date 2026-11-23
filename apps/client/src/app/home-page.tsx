import { Link, Route, Routes } from 'react-router-dom';

import { ApiStatus } from '@/components/api-status';
import { Button } from '@/components/ui/button';

export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">PIM client</p>
            <h1 className="text-2xl font-semibold leading-tight">
              Tailwind + shadcn/ui listos para usar
            </h1>
            <p className="text-muted-foreground">
              Componentes con tokens de diseño y modo claro/oscuro habilitados.
            </p>
            <ApiStatus />
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link to="/">Home</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/page-2">Page 2</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="container py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="space-y-4 rounded-xl border bg-card p-6 shadow-sm lg:col-span-2">
            <div>
              <h2 className="text-xl font-semibold">Primeros pasos</h2>
              <p className="text-muted-foreground">
                Usa los componentes de shadcn/ui en tus rutas de React.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button>Acci&oacute;n principal</Button>
              <Button variant="secondary">Secundaria</Button>
              <Button variant="outline">Borde</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </section>
          <section className="space-y-3 rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Siguientes pasos</h3>
            <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
              <li>
                Agrega componentes con <code>npx shadcn@latest add button</code>{' '}
                (ya configurado).
              </li>
              <li>
                Usa el helper <code>cn</code> desde <code>@/lib/utils</code>{' '}
                para combinar clases.
              </li>
              <li>
                Activa el modo oscuro agregando{' '}
                <code>className=&quot;dark&quot;</code> en{' '}
                <code>&lt;body&gt;</code> o usando un toggler.
              </li>
            </ul>
          </section>
        </div>
        <Routes>
          <Route path="/" element={<div className="sr-only">Inicio</div>} />
          <Route
            path="/page-2"
            element={<div className="sr-only">Segunda p&aacute;gina</div>}
          />
        </Routes>
      </main>
    </div>
  );
}
