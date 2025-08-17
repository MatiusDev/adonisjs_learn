<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Lucid (Database) | AdonisJS Documentation](https://docs.adonisjs.com/guides/database/lucid)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Lucid (Database)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Lucid ORM (Database) | AdonisJS Documentation

> Fuente oficial: [Lucid (Database) | AdonisJS Documentation](https://docs.adonisjs.com/guides/database/lucid)

***

## ¿Qué es Lucid?

- Lucid es un **SQL query builder** y un **Active Record ORM** construido sobre Knex y mantenido por el equipo de AdonisJS.
- Aprovecha todas las capacidades avanzadas de SQL y provee una API moderna y limpia.
- Es maduro, estable y está presente en los starter kits `api` y `web`.

***

## Características destacadas

- Fluent query builder sobre Knex.
- Soporte para réplicas de lectura/escritura y múltiples conexiones.
- Modelos basados en clases (Active Record) que permiten relaciones, hooks, serialización, etc.
- Sistema de migraciones para evolucionar el esquema de la base de datos.
- Model factories y seeders para testing y carga inicial de datos.
- Integración out-of-the-box con Auth y Validator de AdonisJS.
- Soporte para funciones avanzadas de SQL: **window functions**, **CTEs recursivas**, **operaciones JSON**, **bloqueos fila a fila**, y más.

***

## Instalación

```bash
node ace add @adonisjs/lucid
```

- Registra el provider y los comandos en `adonisrc.ts`.
- Crea `config/database.ts` y define variables de entorno según el dialecto.
- Instala cualquier peer dependency necesaria.

***

## Creación de modelos

```bash
node ace make:model User
```

- Crea `app/models/user.ts`:

```ts
import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  @column({ isPrimary: true }) declare id: number
  @column.dateTime({ autoCreate: true }) declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true }) declare updatedAt: DateTime
}
```


***

## Migraciones

- Para crear una migración:

```bash
node ace make:migration users
```

- Genera un archivo en `database/migrations`:

```ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
```

- Correr migraciones pendientes:

```bash
node ace migration:run
```


***

## Query Builder

- Fluent query builder basado en Knex:

```ts
import db from '@adonisjs/lucid/services/db'

const query = db.query()
const queryWithTable = db.from('users')
```

- Permite scoping a modelos:

```ts
import User from '#models/user'
const user = await User.query().where('username', 'rlanz').first()
```


***

## CRUD operaciones con modelos

```ts
import User from '#models/user'

// Crear usuario
const user = await User.create({ username: 'rlanz', email: 'romain@adonisjs.com' })

// Buscar por primary key
const user = await User.find(1)

// Actualizar usuario
user.username = 'romain'
await user.save()

// Eliminar usuario
await user.delete()
```


***

## Enlaces y más información

- Documentación oficial de Lucid en https://lucid.adonisjs.com
- Aprender sobre [CRUD](https://lucid.adonisjs.com/docs/orm/crud), [migraciones](https://lucid.adonisjs.com/docs/orm/migrations), [hooks de modelo](https://lucid.adonisjs.com/docs/orm/hooks), [relaciones](https://lucid.adonisjs.com/docs/orm/relationships), [Adocasts Lucid Series](https://adocasts.com/series/lucid-orm).

***

¿Quieres este contenido como archivo `.md` para importar, o necesitas alguna estructura especial? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/database/lucid

