<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Health checks (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/health-checks)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Health checks (Digging deeper)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Health checks (Digging deeper) | AdonisJS Documentation

> Fuente oficial: [Health checks (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/health-checks)

***

## ¿Qué son los health checks en AdonisJS?

- Permiten monitorizar el estado de tu aplicación en producción: espacio en disco, memoria, conexiones de BD, Redis, etc.
- Puedes crear health checks customizados.

***

## Configuración básica

- Ejecuta:

```bash
node ace configure health_checks
```

    - Crea `start/health.ts` con ejemplos base.
- Registrar health checks:

```js
import { HealthChecks, DiskSpaceCheck, MemoryHeapCheck } from '@adonisjs/core/health'
export const healthChecks = new HealthChecks().register([
  new DiskSpaceCheck(),
  new MemoryHeapCheck(),
])
```


***

## Endpoint recomendado

- Expón una ruta protegida (`/health`) para ser consultada por tu sistema de monitoreo:

```js
import router from '@adonisjs/core/services/router'
const HealthChecksController = () => import('#controllers/health_checks_controller')
router.get('/health', [HealthChecksController])
```

- Puedes proteger la route (auth o por header de API secret).

***

## Ejemplo de respuesta de health

- Formato:

```json
{
  "isHealthy": true,
  "status": "ok" | "warning" | "error",
  "finishedAt": "...",
  "debugInfo": { "pid": 123, "platform": "darwin", ... },
  "checks": [
    {
      "name": "...",
      "status": "...",
      "message": "...",
      "meta": { ... }
    }
  ]
}
```


***

## Health checks disponibles nativamente

- **DiskSpaceCheck:** revisa porcentaje usado; puedes personalizar thresholds `.warnWhenExceeds(n)`, `.failWhenExceeds(n)`.
- **MemoryHeapCheck / MemoryRSSCheck:** monitorean heap y memoria consumida; thresholds personalizables.
- **DbCheck:** (requiere @adonisjs/lucid) valida conexión DB.
- **DbConnectionCountCheck:** monitorea conexiones activas a la DB (Postgres/MySQL).
- **RedisCheck / RedisMemoryUsageCheck:** monitorean estado y memoria del Redis (requiere @adonisjs/redis).

***

## Caching de health checks

- Puedes cachear individualmente health checks propensos a no cambiar seguido (ej: disk space):

```js
new DiskSpaceCheck().cacheFor('1 hour')
```


***

## Health checks personalizados

- Implementa una clase que extienda `BaseCheck` y el método `run()`. Usa la clase `Result` para retornar estados.

```js
import { Result, BaseCheck } from '@adonisjs/core/health'
export class MyCheck extends BaseCheck {
  async run() {
    if (todoOk) return Result.ok('Todo ok')
    if (warning) return Result.warning('Atención...')
    return Result.failed('¡Error crítico!')
  }
}
```

- Añade tu check en `start/health.ts`.

***

¿Quieres este contenido como archivo `.md` o adaptado para tu sistema de documentación o IA? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/digging-deeper/health-checks

