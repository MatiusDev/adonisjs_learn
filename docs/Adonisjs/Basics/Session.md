<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Session (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/session)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Session (Basics)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Session (Basics) | AdonisJS Documentation

> Fuente oficial: [Session (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/session)

***

## ¿Qué es y cómo instalar el paquete de sesiones?

- Gestión unificada de sesiones soportando múltiples backends: `cookie`, `file`, `redis`, `dynamodb`, `memory`.
- Permite crear stores personalizados.


### Instalación rápida

```bash
node ace add @adonisjs/session
```

Esto:

- Instala `@adonisjs/session`
- Registra el provider en `adonisrc.ts`
- Crea el archivo `config/session.ts`
- Registra el middleware en `start/kernel.ts`
- Añade la validación para la variable `SESSION_DRIVER` (ejemplo: `SESSION_DRIVER=cookie`)

***

## Configuración (config/session.ts)

- Atributos principales:

```ts
import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig, stores } from '@adonisjs/session'

export default defineConfig({
  age: '2h',
  enabled: true,
  cookieName: 'adonis-session',
  clearWithBrowser: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: app.inProduction,
    sameSite: 'lax',
  },
  store: env.get('SESSION_DRIVER'),
  stores: {
    cookie: stores.cookie(),
    file: stores.file({ location: app.tmpPath('sessions') }),
    redis: stores.redis({ connection: 'main' }),
    dynamodb: stores.dynamodb({ clientConfig: {/* ... */} }),
  }
})
```

- Puedes tener múltiples stores y cambiar según el entorno.

***

## Ejemplo básico: Uso de sesión en controladores

Guardar y leer datos:

```js
router.get('/theme/:color', async ({ params, session, response }) => {
  session.put('theme', params.color)
  response.redirect('/')
})

router.get('/', async ({ session }) => {
  const colorTheme = session.get('theme')
  return `You are using ${colorTheme} color theme`
})
```

- Todos los cambios a la sesión se reflejan al finalizar la request.

***

## Tipos de datos permitidos

Valores string, number, boolean, null, BigInt, objetos, arrays, Date (como ISO).
Ejemplo:

```js
session.put('user', { id: 1, fullName: 'virk' })
session.put('product_ids', [1, 2, 3])
session.put('is_logged_in', true)
session.put('visits', 10)
session.put('visited_at', new Date())
```


***

## Métodos del objeto session

- `get(key, default?)`: lee valor (soporta dot notation).
- `has(key)`: retorna boolean si existe.
- `all()`: devuelve todo el contenido.
- `put(key, value)`: setea valor (soporta dot notation).
- `forget(key)`: elimina valor.
- `pull(key)`: obtiene valor y lo elimina.
- `increment(key, by?)` y `decrement(key, by?)`: suma/resta valores numéricos.
- `clear()`: elimina todo.

***

## Sesión y ciclo de vida

- La sesión se asigna a un `sessionId` único por visitante, renovado cuando corresponde (ej: login).
- Acceso: `session.sessionId`
- Regenerar sessionId: `session.regenerate()`

***

## Flash messages

- Permiten pasar datos entre requests (ej: notificaciones de éxito/validación):

```js
session.flash('notification', { type: 'success', message: 'Thanks!' })
response.redirect().back()
```

- En Edge:

```edge
@flashMessage('notification')
  <div>{{ $message.message }}</div>
@end
```

- Métodos:
    - `flash(key, value)` — agrega un mensaje.
    - `flashAll()` — flashea todo el `request.all()`.
    - `flashOnly(['username','email'])` — solo esos campos.
    - `flashExcept(['password'])` — todos excepto esos.
- Leer mensajes:
    - En Edge: `@flashMessage`, `@error('key')`, `@inputError('key')`
    - En controlador: `session.flashMessages.get('key')` / `.all()` / `.has('key')`
    - Reflashear: `session.reflash()`
- La sesión de validación de formularios y errores usa flash por defecto.

***

## Crear un store personalizado

Implementa la interfaz `SessionStoreContract` y expórtalo con un factory (`SessionStoreFactory`).
Ejemplo:

```ts
export class MongoDBStore implements SessionStoreContract { /* ... */ }
export function mongoDbStore(config) {
  return (ctx, sessionConfig) => new MongoDBStore(config)
}
```

Luego configúralo en el archivo de configuración.

***
