# PIM

Monorepo con [Nx](https://nx.dev): front, back y tipos compartidos en un solo repositorio y un solo historial de git.

```
pim/
├── apps/
│   ├── client/       React + TypeScript + Vite + Tailwind + shadcn/ui
│   ├── client-e2e/   Pruebas end-to-end del client (Playwright)
│   ├── server/       NestJS + TypeORM + Postgres
│   └── server-e2e/   Pruebas end-to-end del server
├── libs/
│   └── dtos/         Tipos compartidos entre front y back (@pim/dtos)
├── docker-compose.yml  Postgres local
└── package.json      Dependencias y scripts de todo el repo
```

## Arrancar en local

```bash
npm install
cp apps/server/.env.example apps/server/.env
npm run db:up        # Postgres en Docker (puerto 5432)
npm run dev          # client en http://localhost:4200, server en http://localhost:3000/api
```

En desarrollo el client llama a `/api` y Vite lo redirige al server, así que no hace falta configurar CORS ni URLs.

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Levanta client y server a la vez |
| `npm run dev:client` / `npm run dev:server` | Levanta solo uno |
| `npm run build` | Compila todo a `dist/` |
| `npm run test` | Corre los tests de todos los proyectos |
| `npm run lint` / `npm run typecheck` | Lint y chequeo de tipos |
| `npm run db:up` / `npm run db:down` | Arranca o para el Postgres local |

## Tipos compartidos

Todo lo que viaja entre front y back se define una sola vez en `libs/dtos` y se importa igual desde los dos lados:

```ts
import type { HealthResponseDto } from '@pim/dtos';
```

## Componentes de UI

shadcn/ui ya está configurado (`components.json`). Para agregar un componente:

```bash
npx shadcn@latest add dialog
```
