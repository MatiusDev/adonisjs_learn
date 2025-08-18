<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Container services (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/container-services)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Container services (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Container services (Concepts) | AdonisJS Documentation

> Fuente oficial: [Container services (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/container-services)

***

## ¿Qué son los container services?

- Los container bindings existen para evitar el boilerplate de instanciar objetos y sus dependencias manualmente. El IoC container delega esta tarea.

Por ejemplo:

```js
// Instanciación manual y dependiente del orden
import { Database } from '@adonisjs/lucid'
export const db = new Database(/* depende de config y otras dependencias */)
```

Usando el container:

```js
import app from '@adonisjs/core/services/app'
const db = await app.container.make('lucid.db')
```


***

## ¿Por qué usar container services?

- El uso de `container.make` es funcional, pero no ofrece auto-imports en editores ni sintaxis uniforme.
- Para mejorar esto, los paquetes crean archivos JS que envuelven la obtención mediante el container y exportan los servicios con `import`:

Ejemplo en `@adonisjs/lucid/services/db`:

```js
const db = await app.container.make('lucid.db')
export { db as default }
```

Así puedes usar:

```js
import db from '@adonisjs/lucid/services/db'
```

Este patrón se denomina **Container service** y cada paquete lo implementa para los accesos frecuentes.

***

## Container services vs Dependency Injection

- La inyección de dependencias (@inject) desacopla partes del código, pero los container services mantienen tu código más conciso.
- Ejemplo con inyección:

```js
import { Disk } from '@adonisjs/drive'
import { inject } from '@adonisjs/core'

@inject()
export class PostService {
  constructor(protected disk: Disk) { /* ... */ }
  async save(post: Post, coverImage: File) { /* ... */ }
}
```

- Ejemplo con container service:

```js
import drive from '@adonisjs/drive/services/main'

export class PostService {
  async save(post: Post, coverImage: File) {
    const disk = drive.use('s3')
    await disk.put(/* ... */)
  }
}
```

- Elegir uno u otro depende del acoplamiento y estilo deseado.

***

## Testing con container services

- Con DI puedes swapear dependencias fácilmente en tests.
- AdonisJS permite fakes sobre container services para simular comportamientos (ejemplo: swapear el disco s3 por uno en memoria):

```js
import drive from '@adonisjs/drive/services/main'
import { PostService } from '#services/post_service'

test('save post', async ({ assert }) => {
  drive.fake('s3')
  const postService = new PostService()
  await postService.save(post, coverImage)
  assert.isTrue(await drive.use('s3').exists(coverImage.name))
  drive.restore('s3')
})
```


***

## Container bindings y servicios disponibles

Tabla de referencias rápidas:


| Binding | Clase | Service Import |
| :-- | :-- | :-- |
| `app` | Application | `@adonisjs/core/services/app` |
| `ace` | Kernel | `@adonisjs/core/services/kernel` |
| `config` | Config | `@adonisjs/core/services/config` |
| `encryption` | Encryption | `@adonisjs/core/services/encryption` |
| `emitter` | Emitter | `@adonisjs/core/services/emitter` |
| `hash` | HashManager | `@adonisjs/core/services/hash` |
| `logger` | LoggerManager | `@adonisjs/core/services/logger` |
| `repl` | Repl | `@adonisjs/core/services/repl` |
| `router` | Router | `@adonisjs/core/services/router` |
| `server` | Server | `@adonisjs/core/services/server` |
| `testUtils` | TestUtils | `@adonisjs/core/services/test_utils` |


***

¿Quieres este contenido como archivo `.md` para importar o alguna estructura especial? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/container-services

