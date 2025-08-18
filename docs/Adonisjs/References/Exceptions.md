<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Exceptions (References) | AdonisJS Documentation](https://docs.adonisjs.com/guides/references/exceptions)

Aquí tienes un resumen detallado sobre el manejo y referencia de excepciones en AdonisJS, basado en la documentación oficial.

***

# Excepciones en AdonisJS (Referencia)

Fuente: [AdonisJS Exceptions (References)](https://docs.adonisjs.com/references/exceptions)

## Conceptos clave

- Las excepciones representan errores que ocurren durante la ejecución.
- Al ser levantadas, pueden ser manejadas globalmente mediante un manejador de excepciones (por ejemplo, `app/Exceptions/Handler.ts`).
- Algunas excepciones son **auto-manejadas**, capaces de enviar respuestas HTTP por sí mismas.


## Excepciones comunes y su manejo

| Excepción | Descripción | Código HTTP | Auto-manejada |
| :-- | :-- | :-- | :-- |
| `E_ROUTE_NOT_FOUND` | Ruta HTTP no encontrada. | 404 | No |
| `E_ROW_NOT_FOUND` | Registro no encontrado en DB (ej. `findOrFail`). | 404 | No |
| `E_AUTHORIZATION_FAILURE` | Falla de autorización con Bouncer. | 403 | Sí |
| `E_TOO_MANY_REQUESTS` | Exceso de peticiones (rate limiter). | 429 | Sí |
| `E_BAD_CSRF_TOKEN` | Token CSRF inválido o ausente. | 403 | Sí |
| `E_OAUTH_MISSING_CODE` | Código OAuth faltante en redirección. | - | No |
| `E_OAUTH_STATE_MISMATCH` | Estado OAuth no coincide durante redirección. | 400 | No |
| `E_UNAUTHORIZED_ACCESS` | Acceso no autorizado (auth guard). | 401 | Sí |
| `E_INVALID_CREDENTIALS` | Credenciales inválidas en login. | 400 | Sí |
| `E_CANNOT_LOOKUP_ROUTE` | No se puede generar URL para ruta especificada. | 500 | No |
| `E_HTTP_EXCEPTION` | Excepción HTTP genérica con capacidad de configurar status. | Custom | Sí |
| `E_HTTP_REQUEST_ABORTED` | Pedido HTTP abortado (p.ej. cancelado). | - | No |
| `E_INSECURE_APP_KEY` | Clave de aplicación insegura (corta). | 500 | No |
| `E_MISSING_APP_KEY` | Clave de aplicación no definida. | 500 | No |
| `E_INVALID_ENV_VARIABLES` | Variables de entorno inválidas o ausentes según validación. | 500 | No |
| `E_MISSING_FLAG` | Flag CLI requerida no provista. | 500 | No |
| `E_MISSING_ARG` | Argumento CLI requerido ausente. | 500 | No |
| `E_UNKNOWN_FLAG` | Flag CLI desconocida recibida. | 500 | No |
| `E_COMMAND_NOT_FOUND` | Comando CLI no encontrado. | 404 | No |
| `E_MAIL_TRANSPORT_ERROR` | Error enviando email via transporte (SMTP etc). | Variable | No |

## Cómo manejar excepciones

- Crear excepciones personalizadas heredando de `LogicalException` o `Exception`.
- Definir propiedad estáticas opcionales:
    - `static status` — código HTTP por defecto.
    - `static code` — código de error identificador.
- Implementar método `handle(error, ctx)` para auto-manejar respuesta HTTP.
- Opcionalmente definir método `report(error, ctx)` para registrar excepción (logs, servicios externos).


## Ejemplo de excepción personalizada

```ts
import { LogicalException } from '@adonisjs/generic-exceptions'
import { HttpContext } from '@adonisjs/core/build/standalone'

export default class CustomException extends LogicalException {
  static status = 400
  static code = 'E_CUSTOM_ERROR'

  public async handle(error: this, { response }: HttpContext) {
    response.status(this.status).send({ error: this.message })
  }

  public async report(error: this, { logger }: HttpContext) {
    logger.error(error.message)
  }
}
```


## Registro y uso

- Levantar una excepción en código:

```ts
throw new CustomException('Mensaje de error', 400, 'E_CUSTOM_ERROR')
```

- El manejador global decide si la excepción es auto-manejada o necesita respuesta genérica.

***

¿Quieres el resumen convertido en archivo markdown listo para guardar o un formato distinto? Solo dime.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/references/exceptions

[^2]: https://docs.adonisjs.com/guides/basics/exception-handling

[^3]: https://v5-docs.adonisjs.com/guides/exception-handling

[^4]: https://legacy.adonisjs.com/docs/4.0/exceptions

[^5]: https://docs.adonisjs.com/guides/references/exceptions

[^6]: https://betterstack.com/community/guides/scaling-nodejs/adonisjs-error-handling/

[^7]: https://legacy.adonisjs.com/docs/4.1/exceptions

[^8]: https://legacy.adonisjs.com/docs/3.2/error-and-exceptions

[^9]: https://princecurie.tech/handling-exceptions-in-adonisjs

[^10]: https://github.com/adonisjs/core/issues/1230

