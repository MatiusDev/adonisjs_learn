<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Locks (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/locks)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Locks (Digging deeper)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Locks (Digging deeper) | AdonisJS Documentation

> Fuente oficial: [Locks (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/locks)

***

## ¿Qué es un atomic lock (mutex)?

- Permite sincronizar acceso a recursos compartidos, evitando race conditions y ejecuciones concurrentes peligrosas.
- Implementado sobre el paquete [Verrou](https://npmjs.com/package/verrou).

***

## Instalación y configuración

```bash
node ace add @adonisjs/lock
```

- Provider en `adonisrc.ts`.
- Crea el archivo de configuración `config/lock.ts` y setea almacenes:

```js
import env from '#start/env'
import { defineConfig, stores } from '@adonisjs/lock'
export default defineConfig({
  default: env.get('LOCK_STORE'),
  stores: {
    redis: stores.redis({ connectionName: 'main' }),
    database: stores.database({ tableName: 'locks' }),
    memory: stores.memory(),
  }
})
```

- Configura variable `LOCK_STORE` (`redis`, `database`, `memory`) y valida en `start/env.ts`.

***

## Almacenes soportados

- **Redis** — Requiere `@adonisjs/redis`.
- **Database** — Requiere `@adonisjs/lucid` y migración de tabla.
- **Memory** — Solo para procesos locales (útil en tests).

***

## Usar un lock

Protegiendo un recurso:

```js
import locks from '@adonisjs/lock/services/main'

const lock = locks.createLock(`order.processing.${orderId}`)
const acquired = await lock.acquireImmediately()
if (!acquired) return 'Order is already being processed'
try {
  //... lógica protegida
} finally {
  await lock.release()
}
```

O más sucinto:

```js
const [executed, result] = await locks.createLock(`order.processing.${orderId}`).runImmediately(async (lock) => {
  await processOrder()
  return 'Order processed successfully'
})
if (!executed) return 'Order is already being processed'
```


***

## Cambiar de almacén en runtime

```js
const lock = locks.use('redis').createLock('order.processing.1')
```


***

## Locks entre procesos

Guarda/serializa el lock en un job de background:

```js
const lock = locks.createLock(`order.processing.${orderId}`)
await lock.acquire()
queue.dispatch('app/jobs/process_order', { lock: lock.serialize() })

// ... en el job
const handle = locks.restoreLock(lock)
await processOrder()
await handle.release()
```


***

## Métodos extra

- `extend`: extender duración.
- `getRemainingTime`: tiempo hasta que expira.
- Lee la doc de Verrou para casos avanzados.

***

## Testing

- Usa el store `memory` en testing (`LOCK_STORE=memory` en `.env.testing`).

***

## Custom store

- Implementa la interfaz `LockStore` y un factory para inyección en config.

***

¿Quieres este contenido como archivo `.md` o para tu sistema de documentación/IA? Indícalo.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/digging-deeper/locks

