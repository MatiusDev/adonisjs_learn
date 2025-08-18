<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Redis (Database) | AdonisJS Documentation](https://docs.adonisjs.com/guides/database/redis)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Redis (Database)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Redis (Database) | AdonisJS Documentation

> Fuente oficial: [Redis (Database) | AdonisJS Documentation](https://docs.adonisjs.com/guides/database/redis)

***

## ¿Qué es y cómo usar Redis en AdonisJS?

- El paquete oficial es `@adonisjs/redis`.
- Es un wrapper sobre ioredis, con DX mejorada para Pub/Sub y múltiples conexiones automáticas.

***

## Instalación

```bash
node ace add @adonisjs/redis
```

- Instala el paquete.
- Añade el service provider en `adonisrc.ts`.
- Crea el archivo de configuración `config/redis.ts`.
- Define variables de entorno: `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`.

***

## Configuración básica

```ts
import env from '#start/env'
import { defineConfig } from '@adonisjs/redis'

export default defineConfig({
  connection: 'main',
  connections: {
    main: {
      host: env.get('REDIS_HOST'),
      port: env.get('REDIS_PORT'),
      password: env.get('REDIS_PASSWORD', ''),
      db: 0,
      keyPrefix: '',
    },
  }
})
```

- Puedes usar Unix socket (`path`) o definir un cluster (`clusters: [...]`).
- Configuración para sentinels también soportada.

***

## Uso básico

- Operaciones estándar vía el servicio singleton:

```js
import redis from '@adonisjs/redis/services/main'
await redis.set('username', 'virk')
const username = await redis.get('username')
```

- Conexión explícita con `.connection('name')`.

***

## Cerrando conexiones

- Para finalizar:

```js
await redis.quit('main') // suave
await redis.disconnect('main') // forzado
// o vía instancia:
redis.connection('main').quit()
redis.connection('main').disconnect()
```


***

## Estrategia de error y reconexión

- AdonisJS loguea y reintenta 10 veces por default antes de cerrar conexión.
- Puedes customizar el `retryStrategy` en config.

***

## Pub/Sub simplificado

- Suscribirse a canal:

```js
redis.subscribe('user:add', message => { console.log(message) })
```

- Publicar mensaje:

```js
redis.publish('user:add', JSON.stringify({ id: 1, username: 'virk' }))
```

- Suscribirse a patrones:

```js
redis.psubscribe('user:*', (channel, message) => {})
```

- Desuscribirse:

```js
await redis.unsubscribe('user:add')
await redis.punsubscribe('user:*add*')
```


***

## Uso de comandos y scripts LUA

- Definir comandos personalizados:

```js
redis.defineCommand('release', {
  numberOfKeys: 2,
  lua: `redis.call('zrem', KEYS[^2], ARGV[^1])
        redis.call('zadd', KEYS[^1], ARGV, ARGV[^1])
        return true`
})
// Ejecutar:
redis.runCommand('release', 'jobs:completed', 'jobs:running', '11023', 100)
```

- Transformers de argumentos/replies iguales a la API de ioredis:

```js
redis.Command.setArgumentTransformer('hmset', args => { /* ... */ })
redis.Command.setReplyTransformer('hgetall', result => { /* ... */ })
```


***

## Manejo de eventos

- El servicio redis y cada conexión emiten eventos: `connect`, `error`, `ready`, `close`, `reconnecting`, `end`, `node:added`, `node:removed`, `node:error`, `subscription:ready`, entre otros.
- Puedes conectar listeners y reaccionar según tu flujo de negocio.

***

¿Necesitas este contenido en archivo `.md`, o alguna estructura especial para importar en tu sistema de conocimiento IA? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/database/redis

