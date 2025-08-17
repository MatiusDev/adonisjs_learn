<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Middleware (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/middleware)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Middleware (Basics)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Middleware (Basics) | AdonisJS Documentation

> Fuente oficial: [Middleware (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/middleware)

***

## ¿Qué es un middleware?

- Un middleware es una función ejecutada durante una petición HTTP antes de alcanzar el handler de la ruta.
- Cada middleware puede terminar la petición, responderla o pasar el control al siguiente middleware (`next`).

> Usos típicos: parseo de body, sesiones, autenticación, servir archivos estáticos, lógica personalizada.

***

## Tipos de stacks de middleware

1. **Server middleware**
    - Corre en *todas* las peticiones, haya o no ruta definida.
    - Ejemplo: servir archivos estáticos.
    - Se registra en `start/kernel.ts`:

```js
import server from '@adonisjs/core/services/server'
server.use([
  () => import('@adonisjs/static/static_middleware')
])
```

2. **Router middleware (global router)**
    - Corre en todas las rutas que tengan un match.
    - Ejemplo: bodyparser, auth, sesiones.
    - Se registra en `start/kernel.ts`:

```js
import router from '@adonisjs/core/services/router'
router.use([
  () => import('@adonisjs/core/bodyparser_middleware')
])
```

3. **Named middleware**
    - Solo se ejecutan si se asignan explícitamente a una ruta o grupo.
    - Se registran en `start/kernel.ts`:

```js
import router from '@adonisjs/core/services/router'
router.named({
  auth: () => import('#middleware/auth_middleware')
})
```


***

## Creación de middleware

- Los archivos se ubican en `app/middleware/`.
- Usa:

```bash
node ace make:middleware user_location
```

- Un middleware es una clase con método `handle(ctx, next)`:

```js
import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class UserLocationMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // lógica antes de next()
    await next()
    // lógica después del next()
  }
}
```


***

## Opciones dentro del handle

- **Lanzar excepción para abortar la petición**:

```js
throw new Exception('Aborting request')
```

- **Responder y no llamar a next**:

```js
ctx.response.send('Ending request')
```

- **Continuar flujo** (llamar `next`):

```js
await next()
```


***

## Asignar middleware a rutas y grupos

- Usa el named middleware collection y asígnalo a una ruta:

```js
import { middleware } from '#start/kernel'
router.get('posts', () => {}).use(middleware.userLocation())
```

- A una ruta grupo:

```js
router.group(() => {
  router.get('posts', () => {})
}).use(middleware.userLocation())
```

- Puedes combinar middleware en array o llamadas sucesivas.

***

## Parámetros en middleware

- Puedes pasar opciones como argumento en el método handle y al asignarlo en la ruta.

```js
middleware.auth({ guard: 'web' })
```


***

## Dependency Injection en middleware

- Middleware son instanciados vía IoC Container, así que puedes inyectar dependencias vía constructor:

```js
@inject()
export default class UserLocationMiddleware {
  constructor(protected geoIpService: GeoIpService) {}
  async handle(ctx, next) { /* ... */ }
}
```


***

## Flujo de ejecución (Chain of Responsibility)

- **Downstream**: Lógica antes de `next()`.
- **Upstream**: Lógica después de `await next()`. Aquí puedes mutar la respuesta, headers o status code, según el tipo (content, stream, download).

***

## Excepciones y manejo upstream

- Todas las excepciones del pipeline y handlers son capturadas por el exception handler global.
- No necesitas envolver `next()` en try/catch.

***

## Testing de middleware

- Puedes instanciar tu middleware y probar el método handle pasando mocks:

```js
const ctx = testUtils.createHttpContext()
await middleware.handle(ctx, () => { console.log('Next function invoked') })
```

- Para pipelines multi-middleware, usa `server.pipeline([ ... ])` y ejecuta `.run(ctx)`.

***

¿Quieres este contenido como archivo `.md` para importar o alguna estructuración especial para tu base de conocimientos IA? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/basics/middleware

