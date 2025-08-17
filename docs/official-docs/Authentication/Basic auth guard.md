<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Basic auth guard (Authentication) | AdonisJS Documentation](https://docs.adonisjs.com/guides/authentication/basic-auth-guard)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Basic auth guard (Authentication)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Basic auth guard (Authentication) | AdonisJS Documentation

> Fuente oficial: [Basic auth guard (Authentication) | AdonisJS Documentation](https://docs.adonisjs.com/guides/authentication/basic-auth-guard)

***

## ¿Qué es el basic auth guard?

- Implementa autenticación HTTP básica: las credenciales se envían en el header `Authorization` como `Basic <base64>`.
- Si las credenciales no son válidas, el navegador muestra un prompt nativo para reintentar.

***

## Configuración del guardia

En `config/auth.ts`:

```ts
import { defineConfig } from '@adonisjs/auth'
import { basicAuthGuard, basicAuthUserProvider } from '@adonisjs/auth/basic_auth'

export default defineConfig({
  default: 'basicAuth',
  guards: {
    basicAuth: basicAuthGuard({
      provider: basicAuthUserProvider({
        model: () => import('#models/user')
      })
    }),
  },
})
```


***

## Preparando el modelo User

- Usa el mixin AuthFinder para verificación segura de credenciales:

```ts
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
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


***

## Proteger rutas

- Usa el middleware `auth` indicando el guard correspondiente:

```js
router.get('dashboard', ({ auth }) => {
  return auth.user
}).use(middleware.auth({ guards: ['basicAuth'] }))
```

- Si la autenticación falla, el middleware lanza `E_UNAUTHORIZED_ACCESS` y responde con el header `WWW-Authenticate`, activando el prompt nativo de login.

***

## Acceso al usuario autenticado

- Usa `auth.user` tras pasar por el middleware:

```js
router.get('dashboard', ({ auth }) => {
  return `You are authenticated as ${auth.user!.email}`
}).use(middleware.auth({ guards: ['basicAuth'] }))
```

- Si prefieres evitar el operador `!`, puedes usar:

```js
const user = auth.getUserOrFail()
```


***

¿Quieres este contenido en archivo `.md` para importar o alguna estructura especial para tu sistema de conocimientos? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/authentication/basic-auth-guard

