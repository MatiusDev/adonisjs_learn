<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Introduction (Database) | AdonisJS Documentation](https://docs.adonisjs.com/guides/database/introduction)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Introduction (Database)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Introduction (Database) | AdonisJS Documentation

> Fuente oficial: [Introduction (Database) | AdonisJS Documentation](https://docs.adonisjs.com/guides/database/introduction)

***

## SQL y ORMs en AdonisJS

- AdonisJS permite usar cualquier librería o ORM SQL para persistencia: tú eliges el stack.
- El equipo core mantiene **Lucid**, que es un **Active Record ORM** sobre Knex, pero su uso no es obligatorio.

***

## Opciones populares de SQL/ORM compatibles

- **Lucid:** ORM oficial de AdonisJS.
- **Prisma:** ORM popular con type-safety y migraciones automáticas.
- **Kysely:** Type-safe query builder, sin modelos, integración explicada en el blog de AdonisJS.
- **Drizzle ORM:** Usado en la comunidad, no experiencia oficial.
- **Mikro ORM:** Alternativa activa, más verboso que Lucid, también usa Knex.
- **TypeORM:** Popular en TypeScript.

***

## Usando librerías/ORMs alternativos

### Autenticación

- **AdonisJS Auth** soporta Lucid nativamente para usuarios autenticados.
- Con otros ORMs, debes implementar la interfaz `SessionUserProviderContract` o `AccessTokensProviderContract` para fetch de usuario.
- Ejemplo (con Kysely):

```ts
import { symbols } from '@adonisjs/auth'
import type { SessionGuardUser, SessionUserProviderContract } from '@adonisjs/auth/types/session'
import type { Users } from '../../types/db.js' // Esquema específico de Kysely

export class SessionKyselyUserProvider implements SessionUserProviderContract<Users> {
  declare [symbols.PROVIDER_REAL_USER]: Users

  async createUserForGuard(user: Users): Promise<SessionGuardUser<Users>> {
    return {
      getId() { return user.id },
      getOriginal() { return user }
    }
  }

  async findById(identifier: number): Promise<SessionGuardUser<Users> | null> {
    const user = await db.selectFrom('users').selectAll().where('id', '=', identifier).executeTakeFirst()
    if (!user) return null
    return this.createUserForGuard(user)
  }
}
```

- Una vez implementado:

```ts
const authConfig = defineConfig({
  default: 'web',
  guards: {
    web: sessionGuard({
      useRememberMeTokens: false,
      // para Lucid:
      // provider: sessionUserProvider({ model: () => import('#models/user') }),
      // para Kysely (o custom):
      provider: configProvider.create(async () => {
        const { SessionKyselyUserProvider } = await import('../app/auth/session_user_provider.js')
        return new SessionKyselyUserProvider()
      })
    }),
  }
})
```


***

¿Te gustaría este contenido como archivo `.md` o alguna adaptación especial para tu IA? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/database/introduction

