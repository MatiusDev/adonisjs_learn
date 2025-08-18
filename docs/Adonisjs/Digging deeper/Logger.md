<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Logger (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/logger)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Logger (Digging deeper)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Logger (Digging deeper) | AdonisJS Documentation

> Fuente oficial: [Logger (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/logger)

***

## ¿Qué es el logger de AdonisJS?

- Basado en [Pino](https://getpino.io/), ultra rápido, logs en formato NDJSON.
- Soporta salida a archivos, consola, servicios externos, múltiples loggers y targets.

***

## Uso básico

```js
import logger from '@adonisjs/core/services/logger'

logger.info('Mensaje informativo')
logger.error({ err: error }, 'Hubo un error')
```

- En rutas HTTP debes usar `ctx.logger` para logs con request-id contextual.

***

## Configuración básica (`config/logger.ts`)

```js
import env from '#start/env'
import { defineConfig } from '@adonisjs/core/logger'

export default defineConfig({
  default: 'app',
  loggers: {
    app: {
      enabled: true,
      name: env.get('APP_NAME'),
      level: env.get('LOG_LEVEL', 'info')
    }
  }
})
```

- Puedes definir múltiples loggers y loguear a uno específico con `logger.use('nombre')`.

***

## Destinos (targets) y transports

- Todos los logs pasan por *targets* (stdout, pino-pretty, archivo, etc).
- Ejemplo con targets dinámicos:

```js
import { targets, defineConfig } from '@adonisjs/core/logger'
loggers: {
  app: {
    transport: {
      targets: targets()
        .pushIf(app.inDev, targets.pretty())
        .pushIf(app.inProduction, targets.file())
        .toArray()
    }
  }
}
```

- Puedes usar `pino-roll` para rotación de logs de archivo.

***

## Métodos y niveles

- Métodos: `trace`, `debug`, `info`, `warn`, `error`, `fatal`.
- Soporte para logs condicionados:

```js
if (logger.isLevelEnabled('debug')) { /* log costoso */ }
logger.ifLevelEnabled('debug', () => { /* ... */ })
```


***

## Child logger

- Crea un logger hijo para adicionar información extra (ej: requestId).

```js
const reqLogger = logger.child({ requestId: ctx.request.id() })
reqLogger.info('Message scoped to request')
```


***

## Redacción de información sensible

- Puedes ocultar campos con la opción `redact` en la config:

```js
redact: { paths: ['password', '*.password'], remove: true }
```

- O usa el tipo `Secret` en valores:

```js
import { Secret } from '@adonisjs/core/helpers'
logger.info({ password: new Secret(val) }, 'signup')
```


***

## API y utilidades extra

- Puedes usar directamente las utilidades de pino: `multistream`, `destination`, `transport`, etc.
- Acecha métodos para escribir a archivo, rotar logs y cumplir con compliance.
- Puedes inyectar el logger usando DI en servicios/controladores.

***

¿Quieres este contenido como archivo `.md` o adaptado a tu sistema de documentación/IA? Indícalo.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/digging-deeper/logger

