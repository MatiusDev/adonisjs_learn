<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Access tokens guard (Authentication) | AdonisJS Documentation](https://docs.adonisjs.com/guides/authentication/access-tokens-guard)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Access tokens guard (Authentication)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Access tokens guard (Authentication) | AdonisJS Documentation

> Fuente oficial: [Access tokens guard (Authentication) | AdonisJS Documentation](https://docs.adonisjs.com/guides/authentication/access-tokens-guard)

***

## ¿Qué es el access tokens guard?

- Autentica requests HTTP en contextos API donde el servidor no puede persistir cookies (apps móviles, APIs externas, etc).
- AdonisJS usa tokens opacos (opaque access tokens), no JWT.
    - Valor seguro y aleatorio + checksum.
    - El hash se guarda en la base de datos, el valor completo solo se muestra al usuario al generarlo.
    - Prefijo `oat_` para detectar tokens en escaneos de seguridad (puede cambiarse, se recomienda fijarlo).

***

## Configuración del modelo y provider

- La propiedad estática `accessTokens` en el modelo User permite crear/verificar/listar tokens:

```js
import { BaseModel } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

export default class User extends BaseModel {
  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days', // tokens expiran en 30 días
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40
  })
}
```

- Crea la migración para tokens:

```bash
node ace make:migration auth_access_tokens
```

Estructura recomendada (tabla `auth_access_tokens`).

***

## Creación y emisión de tokens

- Para generar un token:

```js
const token = await User.accessTokens.create(user, ['server:create', 'server:read'])
return { type: 'bearer', value: token.value!.release() }
```

- Puedes agregar abilities, nombre, expiración, etc.

```js
await User.accessTokens.create(user, ['*'], { name: 'API Key', expiresIn: '30 days' })
```

- El valor `.value` solo se muestra al momento de creación.

***

## Habilitar y configurar el guard

- En `config/auth.ts`:

```js
import { defineConfig } from '@adonisjs/auth'
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'

export default defineConfig({
  default: 'api',
  guards: {
    api: tokensGuard({
      provider: tokensUserProvider({
        tokens: 'accessTokens',
        model: () => import('#models/user')
      }),
    }),
  },
})
```


***

## Autenticación de requests

- Autentica usando middleware o el método `auth.authenticate()`:

```js
const user = await auth.authenticate()
// o
const user = await auth.authenticateUsing(['api'])
```

- Enrutamiento protegido:

```js
router.post('projects', async ({ auth }) => {
  console.log(auth.user) // User
  console.log(auth.authenticatedViaGuard) // 'api'
  console.log(auth.user!.currentAccessToken) // AccessToken
}).use(middleware.auth({ guards: ['api'] }))
```

- Estado: `auth.isAuthenticated`, `auth.getUserOrFail()`.

***

## currentAccessToken y abilities

- Tras autenticar, `user.currentAccessToken` está disponible.
- Úsalo para chequear abilities y expiración.
- Ejemplo de bouncer:

```js
if (!user.currentAccessToken) return user.isAdmin
return user.isAdmin && user.currentAccessToken.allows('project:create')
```

- Declara `currentAccessToken?: AccessToken` en el modelo para tipado TS.

***

## Listar y borrar tokens

- Lista todos los tokens (incluye expirados):

```js
User.accessTokens.all(auth.user!)
```

- Borrar un token:

```js
await User.accessTokens.delete(user, token.identifier)
```


***

## API login/logout

- Login (crear token):

```js
const token = await auth.use('api').createToken(user)
```

- Logout (invalidar token actual):

```js
await auth.use('api').invalidateToken()
```

- Ejemplo controlador de sesión:

```js
async store({ request, auth }) {
  const { email, password } = request.only(['email', 'password'])
  const user = await User.verifyCredentials(email, password)
  return await auth.use('api').createToken(user)
}

async destroy({ auth }) {
  await auth.use('api').invalidateToken()
}
```


***

## Notas de seguridad

- La verificación de credenciales lanza E_INVALID_CREDENTIALS; el middleware provee respuestas json según content negotiation.
- Si solo tienes frontend externo, considera deshabilitar CSRF en rutas de login.

***

¿Quieres este contenido listo como markdown o con estructura especial para tu sistema de documentación IA? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/authentication/access-tokens-guard

