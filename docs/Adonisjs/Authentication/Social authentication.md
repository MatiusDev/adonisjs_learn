<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Social authentication (Authentication) | AdonisJS Documentation](https://docs.adonisjs.com/guides/authentication/social-authentication)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Social authentication (Authentication)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Social authentication (Authentication) | AdonisJS Documentation

> Fuente oficial: [Social authentication (Authentication) | AdonisJS Documentation](https://docs.adonisjs.com/guides/authentication/social-authentication)

***

## ¿Qué es Ally?

- Ally es el paquete oficial de AdonisJS para autenticación social vía OAuth (2 y 1).
- Drivers incluidos: **Spotify, GitHub, Discord** (+ soporte para drivers custom o adicionales como Google, Facebook, Twitter, LinkedIn).

***

## Instalación y configuración básica

```bash
node ace add @adonisjs/ally
# Para definir providers desde CLI:
node ace add @adonisjs/ally --providers=github --providers=google
```

- Añade el provider en `adonisrc.ts`.
- Crea `config/ally.ts`.
- Añade variables de entorno: ej. `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`.

***

## Configuración típica en `config/ally.ts`

```ts
import { defineConfig, services } from '@adonisjs/ally'

export default defineConfig({
  github: services.github({
    clientId: env.get('GITHUB_CLIENT_ID')!,
    clientSecret: env.get('GITHUB_CLIENT_SECRET')!,
    callbackUrl: 'https://example.com/github/callback',
  }),
  google: services.google({
    clientId: env.get('GOOGLE_CLIENT_ID')!,
    clientSecret: env.get('GOOGLE_CLIENT_SECRET')!,
    callbackUrl: 'https://example.com/google/callback',
  }),
})
```

- El `callbackUrl` debe coincidir entre config del proveedor y tu OAuth app.
- Puedes poner múltiples servicios en el mismo archivo.

***

## Flujo básico de uso

#### 1. Redirigir usuario al proveedor de OAuth

```js
router.get('/github/redirect', ({ ally }) => {
  return ally.use('github').redirect()
})
```

- Puedes agregar scopes/parámetros custom durante redirect:

```js
ally.use('github').redirect((request) => {
  request.scopes(['user:email', 'repo:invite'])
  request.param('allow_signup', false)
})
```


#### 2. Manejar el callback

```js
router.get('/github/callback', async ({ ally }) => {
  const gh = ally.use('github')
  if (gh.accessDenied()) return 'Login cancelado'
  if (gh.stateMisMatch()) return 'CSRF verification error'
  if (gh.hasError()) return gh.getError()
  const user = await gh.user()
  // Aquí decides cómo registrar/login el usuario en tu BD
  return user
})
```


***

## Acceder a datos del usuario y token

- El método `.user()` retorna un objeto con:
    - `id`, `email`, `emailVerificationState`, `name`, `nickName`, `avatarUrl`
    - `token` (con info: `token`, `type`, `refreshToken`, `expiresAt`, `expiresIn`, `secret` para OAuth1)
    - `original` (respuesta raw del proveedor)

***

## Definir scopes y query params

- Puedes definir scopes en el config o en el redirect dinámicamente.
- Ejemplo de scopes para Google:

```ts
google: {
  scopes: ['userinfo.email', 'calendar.events'],
  prompt: 'select_account',
  accessType: 'offline'
}
```

- Personaliza params con `.param('key', 'value')`.
- Puedes usar `.clearParam('key')` para limpiar defaults.

***

## Modo stateless

- Por defecto, el flujo usa cookies CSRF para seguridad.
- Si necesitas flujo stateless (ej: solo API), puedes usar:

```js
ally.use('github').stateless().redirect()
// y luego:
await ally.use('github').stateless().user()
```


***

## Obtener usuario desde un access token

```js
const user = await ally.use('github').userFromToken(accessToken)
```

- Para OAuth1: `.userFromTokenAndSecret(token, secret)`

***

## Ejemplo de config avanzada (otros drivers)

Consulta el archivo en la documentación para configuraciones completas de GitHub, Google, Twitter, Discord, Linkedin, Facebook y Spotify.

***

## Custom drivers

- Ally permite implementar y publicar drivers personalizados para otros servicios OAuth (ver starter kit oficial).

***

¿Quieres este contenido como archivo `.md` o preparado para tu sistema de IA? Indícalo.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/authentication/social-authentication

