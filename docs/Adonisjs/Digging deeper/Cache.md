<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Cache (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/cache)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Cache (Digging deeper)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Cache (Digging deeper) | AdonisJS Documentation

> Fuente oficial: [Cache (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/cache)

***

## ¿Qué es el sistema de cache de AdonisJS?

- Wrapper liviano construido sobre [Bentocache](https://bentocache.dev). Provee API unificada con multiple drivers: Redis, DynamoDB, Postgres, memoria, más.
- Soporte para caching multinivel (multi-tier), periodos de gracia, tags, namespaces, timeouts, etc.

***

## Instalación y configuración

```bash
node ace add @adonisjs/cache
```

- Provider en `adonisrc.ts`.
- Crea `config/cache.ts`. Define el store default y stores adicionales.

```js
import { defineConfig, store, drivers } from '@adonisjs/cache'
export default defineConfig({
  default: 'redis',
  stores: {
    redis: store()
      .useL1Layer(drivers.memory({ maxSize: '100mb' }))
      .useL2Layer(drivers.redis({ connectionName: 'main' }))
      .useBus(drivers.redisBus({ connectionName: 'main' })),
    database: store().useL2Layer(drivers.database({ connectionName: 'default' })),
    dynamodb: store().useL2Layer(drivers.dynamodb({})),
  }
})
```

- Algunos drivers requieren paquetes/config extra:
    - Redis: instala y configura `@adonisjs/redis`.
    - Database: instala y configura `@adonisjs/lucid` y ejecuta migración proporcionada.

***

## Uso básico

- Importa el servicio cache:

```js
import cache from '@adonisjs/cache/services/main'

// Lee y cachea resultado 5 min
cache.getOrSet({
  key: `user:${params.id}`,
  factory: async () => (await User.find(params.id)).toJSON(),
  ttl: '5m',
})
```

- Serializa siempre tus objetos con `.toJSON()` antes de cachear modelos/fechas.

***

## Funcionalidades avanzadas

- **Tags:** agrupa claves y elimina todas juntas.

```js
await cache.getOrSet({ key: 'foo', factory: asyncFn, tags: ['tag1'] })
await cache.deleteByTag({ tags: ['tag1'] })
```

- **Namespaces:** agrupa claves bajo un namespace.

```js
const users = cache.namespace('users')
users.set({ key: '32', value: { name: 'foo' } })
users.clear()
```

- **Grace Period:** sirve datos stale dentro del periodo de gracia mientras el backend recalcula.

```js
cache.getOrSet({ key: 'slow-api', factory: slowFn, ttl: '1h', grace: '6h' })
```

- **Timeouts:** define tiempo máximo de ejecución para refrescar el valor.

```js
cache.getOrSet({ key: 'slow-api', factory: slowFn, ttl: '1h', grace: '6h', timeout: '200ms' })
cache.getOrSet({ key: 'slow-api', factory: slowFn, ttl: '1h', hardTimeout: '200ms' }) // error si se pasa
```


***

## API principal del servicio cache

- Métodos clave:

```js
await cache.set({ key, value, ttl })
await cache.setForever({ key, value })
await cache.get({ key })
await cache.getOrSet({ key, factory, ttl })
await cache.has({ key })
await cache.pull({ key }) // get + delete
await cache.delete({ key })
await cache.deleteMany({ keys: [...] })
await cache.clear()
await cache.namespace('ns').set(...)
await cache.deleteByTag({ tags: [...] })
```

- Usa `.use('driver')` para cambiar el store: `cache.use('dynamodb').put(...)`

***

## Edge Helper

- Puedes acceder a cache directo en templates Edge:

```edge
<p>Hello {{ await cache.get('username') }}</p>
```


***

## Comandos Ace

- `cache:clear [store] [--namespace ns] [--tags tag1 ...]`
- `cache:delete <key> [store]`
- `cache:prune [store]` (elimina expirados en drivers que no soportan TTL nativo)

***

¿Quieres este contenido como archivo `.md` o algún formato especial? Indícalo en tu respuesta.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/digging-deeper/cache

