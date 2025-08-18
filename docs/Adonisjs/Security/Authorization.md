<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Authorization (Security) | AdonisJS Documentation](https://docs.adonisjs.com/guides/security/authorization)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Authorization (Security)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Authorization (Security) | AdonisJS Documentation

> Fuente oficial: [Authorization (Security) | AdonisJS Documentation](https://docs.adonisjs.com/guides/security/authorization)

***

## Introducción a la autorización en AdonisJS

- Para autorización se usa el paquete oficial **@adonisjs/bouncer**.
- Provee una API moderna basada en funciones (**abilities**) y clases (**policies**).
- NO es un sistema RBAC ni ACL, sino una herramienta de bajo nivel para controles finos.

***

## Instalación y configuración

```bash
node ace add @adonisjs/bouncer
```

- Registra el provider y comandos en `adonisrc.ts`.
- Crea `app/abilities/main.ts` y `app/policies/main.ts`.
- Crea y registra `initialize_bouncer_middleware` en el kernel.

***

## Middleware de inicialización

Crea el objeto de Bouncer por request, disponible en `ctx.bouncer` y, si usas Edge, en las templates.

```js
ctx.bouncer = new Bouncer(() => ctx.auth.user || null, abilities, policies)
```


***

## Definiendo abilities

- Se definen como funciones en `app/abilities/main.ts`.
- Ejemplo:

```js
export const editPost = Bouncer.ability((user: User, post: Post) => {
  return user.id === post.userId
})
```

- También puedes permitir acceso a guests usando `{ allowGuest: true }` como opción.

***

## Usando abilities

- Checa acceso con:

```js
if (await bouncer.allows(editPost, post)) { /* ... */ }
if (await bouncer.denies(editPost, post)) { /* ... */ }
```

- También puedes construir un Bouncer para otro usuario:

```js
const customBouncer = new Bouncer(user)
```


***

## Definiendo policies

- Abstracción OO: una clase por recurso.
- Crea una nueva con:

```bash
node ace make:policy post
```

- Ejemplo:

```js
export default class PostPolicy extends BasePolicy {
  create(user: User) { return true }
  edit(user: User, post: Post) { return user.id === post.userId }
  delete(user: User, post: Post) { return user.id === post.userId }
}
```

- Puedes permitir guests con el decorador `@allowGuest()` en métodos específicos.

***

## Usando policies

- Asocia policy con `bouncer.with(...)` y usa métodos del policy:

```js
if (await bouncer.with(PostPolicy).denies('delete', post)) { /* ... */ }
```

- Policies soportan hooks `.before` y `.after` para lógica global (ej: permitir admin siempre), e inyección de dependencias.

***

## Alias, nombres y pre-registro

- Puedes pre-registrar abilities y policies para no importar explícitamente y referenciar por nombre:

```js
await bouncer.allows('editPost', post)
await bouncer.with('PostPolicy').allows('edit', post)
```

- Es útil especialmente en Edge templates.

***

## Autorización en Edge templates

- Usa `@can` y `@cannot`:

```edge
@can('editPost', post)
  {{-- Puede editar --}}
@end
@cannot('editPost', post)
  {{-- No puede editar --}}
@end

@can('PostPolicy.edit', post)
  {{-- Puede editar --}}
@end
```


***

## Excepciones, respuestas y personalización

- Puedes usar `bouncer.authorize(...)`, que lanza excepción `AuthorizationException` si no autorizado.
- Puedes retornar instancias de `AuthorizationResponse` para mensajes/estados custom.
- Se puede sobrescribir el comportamiento global del response builder.

***

## Notas avanzadas

- Policies aceptan inyección de dependencias o incluso el contexto Http.
- Puedes personalizar el manejo de `AuthorizationException` en tu exception handler global.
- Los checks soportan content negotiation para JSON, JSON API y HTML.

***

¿Quieres este contenido listo en `.md` o alguna estructura especial para tu sistema de conocimiento o documentación? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/security/authorization

