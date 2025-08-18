<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Async local storage (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/async-local-storage) quiero que leas la documentación de adonisjs v6 y me ayudes a crear uno o varios archivos markdown como base de conocimientos para una ia, debe mencionar exactamente cada una de las paginas de la documentacion oficial

Claro, puedo ayudarte a generar archivos markdown como *base de conocimientos* para una IA sobre **Async Local Storage** usando AdonisJS v6, siguiendo explícitamente la documentación oficial. A continuación presento la estructura inicial del archivo markdown. Cada sección citará la fuente y mencionará explícitamente la página relevante de la documentación (https://docs.adonisjs.com/guides/concepts/async-local-storage).

***

# Async Local Storage en AdonisJS v6

> Basado en la documentación oficial: [Async local storage (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/async-local-storage)

## Introducción

AsyncLocalStorage es una utilidad de Node.js que permite crear un estado asincrónico disponible durante la vida de una petición web o cualquier otra duración asincrónica. Es similar al "thread-local storage" en otros lenguajes, pero adaptado para el modelo no bloqueante y monohilo de Node.js.

## Ejemplo básico

### Creación de un proyecto

1. Inicializa un nuevo proyecto Node.js:

```bash
npm init --yes
```

2. Configura `package.json` como ESM (añadir `"type": "module"`).

### Crear instancia de AsyncLocalStorage

Crea un archivo `storage.js`:

```js
import { AsyncLocalStorage } from 'async_hooks'

export const storage = new AsyncLocalStorage()
```


### Ejecutar código con storage.run

En `main.js`:

```js
import { storage } from './storage.js'
import UserService from './user_service.js'
import { setTimeout } from 'node:timers/promises'

async function run(user) {
  const state = { user }
  return storage.run(state, async () => {
    await setTimeout(100)
    const userService = new UserService()
    await userService.get()
  })
}

run({ id: 1 })
run({ id: 2 })
run({ id: 3 })
```


### Acceder al estado desde otros módulos

En `user_service.js`:

```js
import { storage } from './storage.js'

export class UserService {
  async get() {
    const state = storage.getStore()
    console.log(`The user id is ${state.user.id}`)
  }
}
```


## ¿Por qué AsyncLocalStorage?

Node.js no crea un nuevo hilo por cada petición HTTP como PHP. En Node.js no se puede crear un estado global por petición, por lo que pasar estado por referencia es lo habitual (aunque más verboso). AsyncLocalStorage facilita compartir contexto de petición sin pasar variables por referencia.

## Uso en AdonisJS

AdonisJS emplea AsyncLocalStorage durante las peticiones HTTP para compartir el contexto de la petición.

- Activa la opción en `config/app.ts`:

```ts
export const http = defineConfig({
  useAsyncLocalStorage: true,
})
```

- Puedes acceder al contexto con:

```js
import { HttpContext } from '@adonisjs/core/http'
const ctx = HttpContext.getOrFail()
```


Ejemplo en un modelo Lucid:

```js
import { HttpContext } from '@adonisjs/core/http'
import { BaseModel } from '@adonisjs/lucid'

export default class Post extends BaseModel {
  get isLiked() {
    const ctx = HttpContext.getOrFail()
    const authUserId = ctx.auth.user.id
    return !!this.likes.find(like => like.userId === authUserId)
  }
}
```


## Advertencias y Caveats

Evita acceder a AsyncLocalStorage en los siguientes casos para prevenir fugas de memoria o comportamientos inestables:

- **Top-level de módulos** (por el caching de Node.js).
- **Propiedades estáticas** (evaluadas al cargar el módulo).
- **Event handlers** (ejecutados fuera del contexto de la petición HTTP).

Ejemplo incorrecto en top-level:

```js
import { HttpContext } from '@adonisjs/core/http'
const ctx = HttpContext.getOrFail()
```

Ejemplo correcto en método:

```js
import { HttpContext } from '@adonisjs/core/http'
export default class UsersController {
  async index() {
    const ctx = HttpContext.getOrFail()
  }
}
```


## Referencia de la documentación oficial

Toda la información anterior está basada y estructurada según la página oficial de AdonisJS v6:

- [Async local storage (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/async-local-storage)

***

¿Quieres que lo divida por secciones temáticas, roles (desarrollador backend, DevOps), o incluir ejemplos de buenas prácticas y casos de uso avanzados? Si requieres el markdown en distintos archivos con organización específica, indícalo y los genero según tu preferencia.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/async-local-storage

