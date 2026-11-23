# @pim/dtos

Tipos compartidos entre `apps/client` y `apps/server`.

```ts
import type { HealthResponseDto } from '@pim/dtos';
```

Regla: aquí van solo tipos e interfaces de TypeScript, sin dependencias de
NestJS ni de React, para que el bundle del front no arrastre código del back.
Las validaciones con `class-validator` viven en el server y implementan estas
interfaces.
