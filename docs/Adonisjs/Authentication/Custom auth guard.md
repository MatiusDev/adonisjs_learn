<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Custom auth guard (Authentication) | AdonisJS Documentation](https://docs.adonisjs.com/guides/authentication/custom-auth-guard)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Custom auth guard (Authentication)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Custom auth guard (Authentication) | AdonisJS Documentation

> Fuente oficial: [Custom auth guard (Authentication) | AdonisJS Documentation](https://docs.adonisjs.com/guides/authentication/custom-auth-guard)

***

## ¿Por qué crear un custom guard?

- El paquete auth permite implementar guards personalizados para casos no cubiertos por los guards internos (ej. JWT, SAML, OAuth personalizado…).
- Se recomienda seguir la arquitectura:
    - **UserProvider:** abstrae cómo buscar/verificar usuarios.
    - **Guard:** implementa la lógica de autenticación y expone el contrato (`GuardContract`).

***

## Ejemplo básico: Guard para JWT

### 1. Definir interfaces del provider

- El provider define los métodos mínimos y adapta cualquier store/ORM.

```ts
export type JwtGuardUser<RealUser> = {
  getId(): string | number | BigInt
  getOriginal(): RealUser
}

export interface JwtUserProviderContract<RealUser> {
  [symbols.PROVIDER_REAL_USER]: RealUser
  createUserForGuard(user: RealUser): Promise<JwtGuardUser<RealUser>>
  findById(identifier: string | number | BigInt): Promise<JwtGuardUser<RealUser>|null>
}
```


***

### 2. Implementación del Guard

- El guard implementa el contrato (por ej. `GuardContract`), maneja `generate`, `authenticate`, `check`, `getUserOrFail`, `authenticateAsClient`, etc.
- Requiere un user provider y opciones (como el secret):

```ts
import jwt from 'jsonwebtoken'

export class JwtGuard<UserProvider extends JwtUserProviderContract<unknown>>
    implements GuardContract<UserProvider[typeof symbols.PROVIDER_REAL_USER]> {

  #userProvider: UserProvider
  #options: { secret: string }
  #ctx: HttpContext
  user?: UserProvider[typeof symbols.PROVIDER_REAL_USER]
  authenticationAttempted = false
  isAuthenticated = false
  driverName: 'jwt' = 'jwt'

  constructor(ctx: HttpContext, userProvider: UserProvider, options: { secret: string }) {
    this.#ctx = ctx
    this.#userProvider = userProvider
    this.#options = options
  }

  async generate(user) {
    const providerUser = await this.#userProvider.createUserForGuard(user)
    const token = jwt.sign({ userId: providerUser.getId() }, this.#options.secret)
    return { type: 'bearer', token }
  }

  async authenticate() {
    if (this.authenticationAttempted) return this.getUserOrFail()
    this.authenticationAttempted = true
    const authHeader = this.#ctx.request.header('authorization')
    if (!authHeader) throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized', { guardDriverName: this.driverName })
    const [, token] = authHeader.split('Bearer ')
    if (!token) throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized', { guardDriverName: this.driverName })
    const payload = jwt.verify(token, this.#options.secret)
    if (typeof payload !== 'object' || !('userId' in payload)) throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized', { guardDriverName: this.driverName })
    const providerUser = await this.#userProvider.findById(payload.userId)
    if (!providerUser) throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized', { guardDriverName: this.driverName })
    this.user = providerUser.getOriginal()
    return this.getUserOrFail()
  }

  async check() {
    try { await this.authenticate(); return true } catch { return false }
  }

  getUserOrFail() {
    if (!this.user) throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized', { guardDriverName: this.driverName })
    return this.user
  }

  async authenticateAsClient(user) {
    const token = await this.generate(user)
    return { headers: { authorization: `Bearer ${token.token}` } }
  }
}
```


***

### 3. Registro del guard en `config/auth.ts`

```ts
import { defineConfig } from '@adonisjs/auth'
import { sessionUserProvider } from '@adonisjs/auth/session'
import env from '#start/env'
import { JwtGuard } from '../app/auth/jwt/guard.js'

const jwtConfig = { secret: env.get('APP_KEY') }
const userProvider = sessionUserProvider({ model: () => import('#models/user') })

export default defineConfig({
  default: 'jwt',
  guards: {
    jwt: (ctx) => new JwtGuard(ctx, userProvider, jwtConfig)
  }
})
```

- Puedes reutilizar un provider de otro guard que cumpla la interfaz.

***

## 4. Uso típico

- Generar y proteger endpoints:

```ts
router.post('login', async ({ request, auth }) => {
  const { email, password } = request.all()
  const user = await User.verifyCredentials(email, password)
  return await auth.use('jwt').generate(user)
})

router.get('/', async ({ auth }) => {
  return auth.getUserOrFail()
})
.use(middleware.auth())
```

El guard puede autenticar, devolver el usuario actual y usarse con el middleware de auth estándar.

***

¿Quieres este contenido como archivo `.md` para importar, o alguna estructura especial para inteligencia artificial? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/authentication/custom-auth-guard

