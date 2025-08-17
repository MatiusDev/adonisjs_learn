<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Verifying user credentials (Authentication) | AdonisJS Documentation](https://docs.adonisjs.com/guides/authentication/verifying-user-credentials)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Verifying user credentials (Authentication)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Verifying user credentials (Authentication) | AdonisJS Documentation

> Fuente oficial: [Verifying user credentials (Authentication) | AdonisJS Documentation](https://docs.adonisjs.com/guides/authentication/verifying-user-credentials)

***

## Verificación de credenciales en AdonisJS

- Verificar credenciales está desacoplado de los guards de autenticación.
- Puedes usar la API segura predefinida, o implementar otros métodos (OTP, 2FA, etc).

***

## Ejemplo básico sin protección

```js
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class SessionController {
  async store({ request, response }) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.findBy('email', email)
    if (!user) return response.abort('Invalid credentials')
    const isPasswordValid = await hash.verify(user.password, password)
    if (!isPasswordValid) return response.abort('Invalid credentials')
    // login user o crea el token
  }
}
```

> Este enfoque es vulnerable a timing attacks, ya que la diferencia de tiempos revela si el email existe o no.

***

## Solución recomendada: AuthFinder mixin

- Usa el mixin `AuthFinder` en tu modelo User:

```js
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password'
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true }) declare id: number
  @column() declare fullName: string | null
  @column() declare email: string
  @column() declare password: string
  @column.dateTime({ autoCreate: true }) declare createdAt
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt
}
```

    - El método `withAuthFinder` recibe un callback para el hasher y un objeto config con:
        - `uids`: array de campos únicos identificadores (email, username, phone, etc).
        - `passwordColumnName`: campo de la contraseña.

***

## Verificación automática y segura

En el controlador simplificas todo así:

```js
const user = await User.verifyCredentials(email, password)
// Si falla, lanza E_INVALID_CREDENTIALS (protegido de timing attacks)
```


***

## Manejo de excepciones

- Si las credenciales son incorrectas, `verifyCredentials` lanza la excepción `E_INVALID_CREDENTIALS`.
- La excepción está autogestionada:
    - Requests JSON reciben un array de errores.
    - Requests JSON API reciben el formato API estándar.
    - Si usas sesión, se redirige y los errores van por flash messages.
    - Otros: mensaje en texto plano.
- Puedes interceptarla en el global exception handler, por ejemplo:

```js
import { errors } from '@adonisjs/auth'
export default class HttpExceptionHandler extends ExceptionHandler {
  async handle(error, ctx) {
    if (error instanceof errors.E_INVALID_CREDENTIALS) {
      return ctx.response.status(error.status).send(error.getResponseMessage(error, ctx))
    }
    return super.handle(error, ctx)
  }
}
```


***

## Hash automático de contraseñas

- El mixin AuthFinder añade un hook `beforeSave` para hashear contraseñas automáticamente en INSERT y UPDATE.
- ¡No tienes que llamar manualmente al hasher en tu modelo!

***

¿Quieres este contenido como archivo `.md` para importar o alguna estructuración especial para conocimiento IA? Indícalo.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/authentication/verifying-user-credentials

