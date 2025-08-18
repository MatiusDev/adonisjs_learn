<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [HTTP context (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/http-context)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **HTTP context (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# HTTP context (Concepts) | AdonisJS Documentation

> Fuente oficial: [HTTP context (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/http-context)

***

## ¿Qué es el HTTP Context?

Cada vez que recibes una petición HTTP, AdonisJS genera una nueva instancia de la clase `HttpContext`, la cual se pasa a handlers, middleware y al exception handler.

El contexto contiene toda la información relevante para la petición, incluyendo:

- Body, headers y query params (`ctx.request`)
- Manejo de la respuesta (`ctx.response`)
- Usuario autenticado (`ctx.auth`)
- Control de autorización (`ctx.bouncer`)
- Y más

***

## ¿Cómo acceder al contexto HTTP?

El `HttpContext` se pasa por referencia como primer parámetro a:

### Handler de ruta

```js
router.get('/', (ctx) => { console.log(ctx.inspect()) })
```

Destructuración ejemplo:

```js
router.get('/', ({ request, response }) => {
  console.log(request.url())
  response.send('hello world')
})
```


### Método de controlador

```js
export default class HomeController {
  async index({ request, response }: HttpContext) { /* ... */ }
}
```


### Middleware

```js
export default class AuthMiddleware {
  async handle({ request, response }: HttpContext) { /* ... */ }
}
```


### Exception handler

```js
export default class ExceptionHandler extends HttpExceptionHandler {
  async handle(error: unknown, ctx: HttpContext) { /* ... */ }
  async report(error: unknown, ctx: HttpContext) { /* ... */ }
}
```


***

## Inyección de contexto con Dependency Injection

Puedes inyectar `HttpContext` en servicios o métodos usando el decorador `@inject`, si tienes registrado el middleware `#middleware/container_bindings_middleware` en `start/kernel.ts`.

Ejemplo:

```js
@inject()
export default class UserService {
  constructor(protected ctx: HttpContext) {}
  all() { /* ... */ }
}

@inject()
export default class UsersController {
  index(ctx: HttpContext, userService: UserService) {
    return userService.all()
  }
}
```


***

## Acceso global al contexto (Async Local Storage)

Si no usas DI, también puedes obtener el contexto para la petición en curso usando el método estático:

```js
const ctx = HttpContext.getOrFail()
console.log(ctx.request.url())
```


***

## Propiedades del contexto

El contexto puede tener, según paquetes instalados:

- `ctx.request`: instancia de Request
- `ctx.response`: instancia de Response
- `ctx.logger`
- `ctx.route`
- `ctx.params`
- `ctx.subdomains`
- `ctx.session`
- `ctx.auth`
- `ctx.view` (Edge renderer)
- `ctx.ally` (Social login)
- `ctx.bouncer` (Autorización)
- `ctx.i18n` (internacionalización)
- Y extensiones de otros paquetes

***

## Extender el HTTP Context

Puedes agregar métodos o getters propios usando macros o getters:

```js
HttpContext.macro('aMethod', function (this: HttpContext) { return value })
HttpContext.getter('aProperty', function (this: HttpContext) { return value })
```

Asegúrate de informar a TypeScript con module augmentation:

```js
declare module '@adonisjs/core/http' {
  interface HttpContext {
    aMethod: () => ValueType
    aProperty: ValueType
  }
}
```


***

## Crear contexto dummy para tests

Usa `testUtils` para crear contextos HTTP falsos en tests:

```js
import testUtils from '@adonisjs/core/services/test_utils'
const ctx = testUtils.createHttpContext()
```

También puedes generar contextos con `req` y `res` personalizados:

```js
import { createServer } from 'node:http'
createServer((req, res) => {
  const ctx = testUtils.createHttpContext({ req, res })
})
```

En paquetes, puedes usar:

```js
import { HttpContextFactory } from '@adonisjs/core/factories/http'
const ctx = new HttpContextFactory().create()
```


***

¿Te gustaría este contenido como archivo `.md` o necesitas una adaptación especial para tu base de conocimientos IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/http-context

