<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Session guard (Authentication) | AdonisJS Documentation](https://docs.adonisjs.com/guides/authentication/session-guard)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Session guard (Authentication)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Session guard (Authentication) | AdonisJS Documentation

> Fuente oficial: [Session guard (Authentication) | AdonisJS Documentation](https://docs.adonisjs.com/guides/authentication/session-guard)

***

## ¿Qué es el session guard?

- Usa el paquete `@adonisjs/session` para autenticar usuarios mediante sesión y cookies.
- Recomendado para SSR y frontend SPA bajo el mismo dominio.

***

## Configuración del session guard

- Se configuran en `config/auth.ts`:

```ts
import { defineConfig } from '@adonisjs/auth'
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session'

export default defineConfig({
  default: 'web',
  guards: {
    web: sessionGuard({
      useRememberMeTokens: false, // o true si usas "Remember Me"
      provider: sessionUserProvider({
        model: () => import('#models/user'),
      }),
    }),
  },
})
```


***

## Login del usuario

- Usualmente se usa `User.verifyCredentials(email, password)` junto al método `auth.use('web').login(user)`.
- Ejemplo:

```js
const user = await User.verifyCredentials(email, password)
await auth.use('web').login(user)
response.redirect('/dashboard')
```


***

## Proteger rutas (middleware auth)

- Usa el named middleware `auth` en tus rutas a proteger:

```js
router.get('dashboard', () => {})
  .use(middleware.auth())
```

- Soporta múltiples guards:

```js
router.get('dashboard', () => {})
  .use(middleware.auth({ guards: ['web', 'api'] }))
```


***

## Manejo de excepción de autenticación

- Si la autenticación falla, lanza `E_UNAUTHORIZED_ACCESS`.
- Contenido del error según `Accept` header:
    - JSON: array de mensajes.
    - JSON API: formato API.
    - SSR: redirección a `/login` (configurable en el middleware).

***

## Acceder al usuario autenticado

- Acceso con `auth.user` tras el middleware.
- También puedes autenticar manualmente con `await auth.authenticate()`.
- Optional chaining o asegurarse con `getUserOrFail()`:

```js
const user = await auth.getUserOrFail()
```

- Acceso también posible en Edge:

```edge
@if(auth.isAuthenticated)
  <p> Hello {{ auth.user.email }} </p>
@end
```


***

## Silent auth middleware

- Middleware que intenta autenticar pero no lanza excepción si no hay usuario.
- Útil para rutas públicas donde puedes mostrar info sólo si hay usuario logueado.

***

## Logout

- Cierra la sesión con:

```js
await auth.use('web').logout()
response.redirect('/login')
```


***

## Remember Me

- Permite re-loggear tras expiración de sesión vía cookie segura y token en DB.
- Pasos:

1. Migración para `remember_me_tokens`.
2. Configura el provider en el modelo User:

```js
static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)
```

3. Activa en `config/auth.ts`:

```js
useRememberMeTokens: true,
rememberMeTokensAge: '2 years',
```

4. Durante login, pasa el flag remember:

```js
await auth.use('web').login(user, !!request.input('remember_me'))
```


***

## Guest middleware

- Para bloquear acceso a `/login` u otras rutas si el usuario ya está autenticado.
- Así evitas sesiones duplicadas en un dispositivo.
- Uso:

```js
router.get('/login', () => {}).use(middleware.guest())
```

- Puedes indicar guards específicos y configurar ruta de redirección si ya está autenticado.

***

¿Quieres este contenido en archivo `.md` para importar, o alguna estructura especial para conocimiento IA? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/authentication/session-guard

