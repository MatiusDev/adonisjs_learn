<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Exception handling (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/exception-handling)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Exception handling (Basics)** en AdonisJS v6. Todo el contenido es referenciado explícitamente a la fuente.

***

# Exception handling (Basics) | AdonisJS Documentation

> Fuente oficial: [Exception handling (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/exception-handling)

***

## Overview: Manejo de excepciones en AdonisJS

- Las excepciones HTTP se manejan centralmente por la clase `HttpExceptionHandler` (`app/exceptions/handler.ts`).
- Esta extiende `ExceptionHandler`, que provee APIs de reporting y rendering (customizar respuesta y logueo).

***

## Registro del error handler

- Se asocia en `start/kernel.ts`:

```js
server.errorHandler(() => import('#exceptions/handler'))
```


***

## ¿Cómo se procesan las excepciones?

- El método `handle` realiza:

1. Si el error tiene un método `handle`, lo ejecuta.
2. Si hay una status page definida para `status`, la usa.
3. Si no, usa tradición de content negotiation/render.
- Puedes especializar manejo para errores concretos:

```js
if (error instanceof errors.E_VALIDATION_ERROR) {
  ctx.response.status(422).send(error.messages)
  return
}
```


#### Status pages

- Puedes mapear status codes a templates (rango con `..`):

```js
protected statusPages = {
  '404': (_, { view }) => view.render('errors/not-found'),
  '500..599': (_, { view }) => view.render('errors/server-error')
}
```


#### Debug mode

- La propiedad `debug` activa/desactiva modo debug (recomendado sólo en dev):

```js
protected debug = !app.inProduction
```


***

## Reporte (logging) de excepciones

- El método `report` se encarga de logear errores:
    - Errores 400-499: `warning`
    - >=500: `error`
    - Otros: `info`
- Puedes customizar el contexto del log:

```js
protected context(ctx) {
  return {
    requestId: ctx.requestId,
    userId: ctx.auth.user?.id,
    ip: ctx.request.ip(),
  }
}
```

- Para ignorar status o códigos/errores específicos:

```js
protected ignoreStatuses = [401, 400, 422]
protected ignoreCodes = ['E_ROUTE_NOT_FOUND', 'E_INVALID_SESSION']
protected ignoreExceptions = [errors.E_ROUTE_NOT_FOUND, sessionErrors.E_INVALID_SESSION]
```

- Puedes sobreescribir `shouldReport` para lógica avanzada de exclusión.

***

## Excepciones personalizadas

- Crea excepción con:

```bash
node ace make:exception UnAuthorized
```

- Ejemplo:

```js
import { Exception } from '@adonisjs/core/exceptions'
export default class UnAuthorizedException extends Exception {
  static status = 403
  static code = 'E_UNAUTHORIZED'
  async handle(error, ctx) {
    ctx.response.status(error.status).send(error.message)
  }
  async report(error, ctx) {
    ctx.logger.error({ err: error }, error.message)
  }
}
```

- Puedes lanzar con código y status custom:

```js
throw new UnAuthorizedException('You are not authorized', { status: 403, code: 'E_UNAUTHORIZED' })
```


***

## Chequeo de error por tipo

- Identifica errores por instancia:

```js
if (error instanceof errors.E_CANNOT_LOOKUP_ROUTE) {
  // handle error
}
```


***

¿Te gustaría este contenido como archivo `.md` o alguna estructura especial para importar? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/basics/exception-handling

