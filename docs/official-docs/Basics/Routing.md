<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Routing (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/routing)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Routing (Basics)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Routing (Basics) | AdonisJS Documentation

> Fuente oficial: [Routing (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/routing)

***

## Definición de rutas

- Las rutas se definen en `start/routes.ts`.
- Cada ruta combina un **patrón de URI** y un **handler**.
- Ejemplo básico:

```js
import router from '@adonisjs/core/services/router'

router.get('/', () => 'Hello world from the home page.')
router.get('/about', () => 'This is the about page.')
router.get('/posts/:id', ({ params }) => `This is post with id ${params.id}`)
```

- Los parámetros dinámicos inician con `:` (ej: `:id`).

***

## Ver rutas registradas

- Usa el comando:

```bash
node ace list:routes
```

- También puedes ver las rutas desde la barra de actividad de VSCode con la extensión oficial.

***

## Parámetros de ruta

- Estructura: `:param` (obligatorio) o `:param?` (opcional).
- Se pueden combinar varios params en una sola ruta.
- Ejemplo:

```js
router.get('/posts/:id/comments/:commentId', ({ params }) => {
  console.log(params.id, params.commentId)
})
```


### Wildcards

- Usa `*` para capturar todos los segmentos finales:

```js
router.get('/docs/:category/*', ({ params }) => { /* ... */ })
```


***

## Validación/conversión de params (`matchers`)

- Define un matcher con `.where(param, { match, cast })`.
- Ejemplo (solo números):

```js
router
  .get('/posts/:id', ({ params }) => {})
  .where('id', { match: /^[0-9]+$/, cast: v => Number(v) })
```

- Matchers inbuilt: `router.matchers.number()`, `router.matchers.uuid()`, `router.matchers.slug()`.
- Se pueden fijar globalmente en el router.

***

## Métodos HTTP

- Métodos estándar: `get`, `post`, `put`, `patch`, `delete`.
- Todos los métodos: `router.any()`.
- Personalizados: `router.route('/', ['TRACE'], () => {})`.

***

## Handler de ruta

- Puede ser función inline o método de un controlador.
- Importar controlador como callback:

```js
const UsersController = () => import('#controllers/users_controller')
router.post('users', [UsersController, 'store'])
```


***

## Middleware en rutas

- Añade middleware con `.use()`:

```js
router.get('posts', handler).use((_, next) => next())
```


***

## Identificadores de rutas (nombres)

- Asigna nombre único con `.as()`:

```js
router.get('users', () => {}).as('users.index')
```

- Construye URLs o redirecciona usando el nombre:

```js
const url = router.builder().make('users.delete', [user.id])
```


***

## Agrupación de rutas

- Usa `router.group()` para configurar varias rutas juntas.
- Prefijos de URI con `.prefix()`, nombres con `.as()`, y middleware grupal con `.use()`.

```js
router.group(() => {
  router.get('users', () => {})
  router.get('payments', () => {})
})
.prefix('/api')
.as('api')
.use((_, next) => next())
```

- Grupos anidados heredan y superponen propiedades.

***

## Dominios y subdominios

- Define rutas bajo dominios específicos con `.domain()`:

```js
router.group(() => { /* rutas */ }).domain('blog.adonisjs.com')
```

- Subdominios dinámicos: `':tenant.adonisjs.com'`; accesibles como `ctx.subdomains.tenant`

***

## Atajos para Edge/Inertia/redirect

- Renderiza vistas Edge: `router.on('/').render('home')`
- Renderiza Inertia: `router.on('/').renderInertia('home')`
- Redirecciona: `router.on('/posts').redirect('/articles')`

***

## Redirecciones avanzadas

- Redirige con parámetros, definición explícita, o query strings.
- Ejemplo:

```js
router.on('/posts/:id').redirect('/articles/:id')
router.on('/posts').redirect('/articles', { qs: { limit: 20, page: 1 } })
```


***

## URL builder

- Construye URLs para rutas definidas:

```js
router.builder().params({ id: 1 }).make('posts.show') // /posts/1
router.builder().qs({ sort: 'asc' }).make('posts.index')
router.builder().prefixUrl('https://blog.adonisjs.com').make('posts.show')
```

- Crea URLs firmadas con `.makeSigned('route', { expiresIn: '3 days' })`.
- En plantillas: `route('posts.show', [post.id])`.

***

## Acceso y coincidencia de rutas

- Accede a la ruta actual con `ctx.route`.
- Verifica coincidencia con `request.matchesRoute('pattern-o-nombre')`.

***

## Orden y resolución de rutas

- Las rutas se evalúan en el orden registrado. Registra rutas específicas antes que rutas “catch-all”.
- Para custom 404, captura la excepción `E_ROUTE_NOT_FOUND` en el exception handler global.

***

## Extensibilidad del router

Puedes añadir métodos/macro a Router, Route, RouteGroup, RouteResource y BriskRoute usando macros/getters y declaración de tipos vía module augmentation.

***

¿Quieres este contenido en archivo `.md` o alguna estructuración especial para tu entorno de documentación o IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/basics/routing

