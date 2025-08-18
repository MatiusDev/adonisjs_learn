<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Controllers (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/controllers)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Controllers (Basics)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Controllers (Basics) | AdonisJS Documentation

> Fuente oficial: [Controllers (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/controllers)

***

## ¿Qué es un controller?

- Los controladores ofrecen una capa de organización para los handlers de rutas, moviendo la lógica fuera del archivo de rutas y dentro de clases en `app/controllers`.
- Puedes crearlos con:

```bash
node ace make:controller users
```


***

## Uso básico

- Un controller es una clase JS:

```js
export default class UsersController {
  index() {
    return [
      { id: 1, username: 'virk' },
      { id: 2, username: 'romain' },
    ]
  }
}
```

- Para vincular a una ruta:

```js
import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
router.get('users', [UsersController, 'index'])
```

- AdonisJS crea una instancia nueva para cada request y la construye usando el IoC container (soportando inyección automática).

***

## Lazy loading y Magic Strings

- Se recomienda importar controllers dinámicamente (lazy) para habilitar HMR y mejorar el rendimiento.
- Alternativamente, puedes usar una "magic string" para referenciar `path.metodo`:

```js
router.get('users', '#controllers/users_controller.index')
```

*- Cuidado: esto no es type-safe.*

***

## Single action controllers

- Una clase controller con solo un método llamado `handle`:

```js
export default class RegisterNewsletterSubscriptionController {
  handle() { /* ... */ }
}
router.post('newsletter/subscriptions', [RegisterNewsletterSubscriptionController])
```


***

## Contexto HTTP en controllers

- Los métodos reciben una instancia de `HttpContext` como primer argumento:

```js
export default class UsersController {
  index(context: HttpContext) { /* ... */ }
}
```


***

## Dependency Injection

- Puedes usar DI en el constructor o método, y el container resolverá el árbol de dependencias automáticamente:

```js
// Servicio:
export class UserService {
  all() { /* ... */ }
}

// Inyección en constructor
@inject()
export default class UsersController {
  constructor(private userService: UserService) {}
  index() {
    return this.userService.all()
  }
}

// Inyección en método
@inject()
index(ctx: HttpContext, userService: UserService) {
  return userService.all()
}
```

    - El container también resuelve dependencias anidadas (p.ej., si `UserService` depende de `HttpContext`, también lo inyecta).

***

## Resource-driven controllers

- Útil para apps REST: un controller por entidad/recurso (ej: `PostsController`).
- Crea un controller resource:

```bash
node ace make:controller posts --resource
```

Esto genera métodos como: `index`, `create`, `store`, `show`, `edit`, `update`, `destroy`.
- Asocia a recurso con:

```js
const PostsController = () => import('#controllers/posts_controller')
router.resource('posts', PostsController)
```

- Puedes anidar recursos:

```js
router.resource('posts.comments', CommentsController)
```

- Recursos shallow (URL plana si el id del padre no es necesario):

```js
router.shallowResource('posts.comments', CommentsController)
```

- Nombres de rutas por convención: `{resource}.{action}` (`posts.index`, `user_photos.index`, etc.)
- Puedes renombrar prefijos:

```js
router.resource('group-attributes', GroupAttributesController).as('attributes')
router.resource('group-attributes', GroupAttributesController).as('groupAttributes', false)
```

- Crear sólo rutas API (sin `create` ni `edit`):

```js
router.resource('posts', PostsController).apiOnly()
```

- Registrar solo/excluir rutas específicas:

```js
router.resource('posts', PostsController).only(['index', 'store', 'destroy'])
router.resource('posts', PostsController).except(['destroy'])
```

- Renombrar params:

```js
router.resource('posts', PostsController).params({ posts: 'post' })
router.resource('posts.comments', CommentsController).params({ posts: 'post', comments: 'comment' })
```

- Asignar middleware a acciones del recurso:

```js
router.resource('posts')
  .use(['create', 'store', 'update', 'destroy'], middleware.auth())
  .use('*', middleware.auth())
  .use(['update', 'destroy'], middleware.someMiddleware())
```


***

¿Quieres este contenido en archivo `.md` o alguna estructura especial para importarlo a tu base de conocimientos? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/basics/controllers

