# Instrucciones para agentes

Monorepo Nx (`apps/client`, `apps/server`, `libs/dtos`). Ver `README.md` para estructura y scripts.

## Antes de cerrar un ticket

Corre siempre, desde la raíz:

```bash
npm run check   # nx run-many -t lint typecheck && knip
```

No des un ticket por terminado hasta que pase sin errores:

- **lint**: incluye `complexity` (máx. 10), `max-depth` (máx. 2) y `unused-imports`. Si una función se pasa, divídela o usa guard clauses; no subas el límite ni metas `eslint-disable`.
- **typecheck**: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`. Prohibido `any`, `@ts-ignore` y casts inseguros para callarlo.
- **knip**: archivos, exports y dependencias sin usar. Borra lo que reporte. Solo agrega una excepción en `knip.jsonc` si el uso es real pero Knip no lo ve, y explica por qué en un comentario.

En contenedores cloud, prefija los comandos con `NX_DAEMON=false NX_NO_CLOUD=true`.
