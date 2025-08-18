<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Continua haciendo lo mismo para todas las urls que te ponga en el chat [Rate limiting (Security) | AdonisJS Documentation](https://docs.adonisjs.com/guides/security/rate-limiting)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Rate limiting (Security)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Rate limiting (Security) | AdonisJS Documentation

> Fuente oficial: [Rate limiting (Security) | AdonisJS Documentation](https://docs.adonisjs.com/guides/security/rate-limiting)

***

## ¿Qué es el rate limiting?

- Permite limitar el número de requests por usuario, IP o clave personalizada ante tu backend o API.
- Evita abusos y ataques de fuerza bruta.
- Soporta `redis`, `mysql`, `postgresql`, `sqlite` y almacenamiento en memoria (testing/dev).

***

## Instalación y configuración

```bash
node ace add @adonisjs/limiter
```

- Registra el provider en `adonisrc.ts`.
- Crea `config/limiter.ts` y `start/limiter.ts`.
- Define la env var `LIMITER_STORE` (ejemplo: redis, memory).
- Si usas el store database, crea la migración de `rate_limits`.


### Configuración básica en `config/limiter.ts`

```js
import env from '#start/env'
import { defineConfig, stores } from '@adonisjs/limiter'

export default defineConfig({
  default: env.get('LIMITER_STORE'),
  stores: {
    redis: stores.redis({}),
    database: stores.database({ tableName: 'rate_limits' }),
    memory: stores.memory({}),
  }
})
```

- El store memory es útil durante tests.

***

## Usando el rate limiter como middleware

- Usualmente defines middlewares en `start/limiter.ts` usando `limiter.define`.

```js
import limiter from '@adonisjs/limiter/services/main'

export const throttle = limiter.define('global', () => {
  return limiter.allowRequests(10).every('1 minute')
})
```

- Aplícalo a rutas:

```js
router.get('/', () => {}).use(throttle)
```


### Rate limit dinámico

Aplica límites personalizados para usuarios autenticados/invitados:

```js
export const apiThrottle = limiter.define('api', (ctx) => {
  if (ctx.auth.user) {
    return limiter.allowRequests(100).every('1 minute').usingKey(`user_${ctx.auth.user.id}`)
  }
  return limiter.allowRequests(10).every('1 minute').usingKey(`ip_${ctx.request.ip()}`)
})
```


***

## Opciones avanzadas

- **store(nombre):** cambia el backend de persistencia.
- **usingKey(clave):** personaliza la clave de rate limit (IP, user ID, etc).
- **blockFor(duración):** bloquea al usuario tras exceder el límite.

***

## Manejo de errores y personalización

- Si se excede el límite, lanza la excepción `E_TOO_MANY_REQUESTS`:
    - JSON: array de errores.
    - JSON API: formato estándar.
    - SSR/otros: texto plano.
    - Puedes personalizar el mensaje usando el hook `limitExceeded` en tu middleware.

***

## Lógica directa en controladores/acciones

- Limita intentos de login, generación de reportes, jobs, etc. usando `limiter.use` y los métodos `.attempt`, `.penalize`, `.consume`.
- Ejemplo intento limitado:

```js
const loginLimiter = limiter.use({ requests: 5, duration: '1 min', blockDuration: '20 mins' })
const key = `login_${request.ip()}_${email}`

const [error, user] = await loginLimiter.penalize(key, () => {
  return User.verifyCredentials(email, password)
})
// Si error, informar tiempo restante, etc.
```


***

## Métodos útiles

- `.attempt(key, fn)`: ejecuta callback si hay intentos disponibles.
- `.penalize(key, fn)`: penaliza sólo en caso de error.
- `.consume(key)`: consume e incrementa, lanza error si no hay intentos.
- `.remaining(key)`: intentos restantes.
- `.increment(key)`, `.decrement(key)`: suma/resta manualmente.
- `.block(key, tiempo)`: bloquea clave manualmente.
- `.delete(key)`: elimina el registro.
- `.clear()`: limpia el store (tests).

***

## Testing y personalización de storage

- Usa el store en memoria en testing (`LIMITER_STORE=memory` en `.env.test`).
- Limpia el store entre tests con `limiter.clear()`.
- Puedes implementar tu propio storage provider implementando `LimiterStoreContract`.

***

¿Quieres este contenido como archivo `.md` o algún formato específico para sistemas de documentación o IA? Solo indícalo.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/security/rate-limiting

