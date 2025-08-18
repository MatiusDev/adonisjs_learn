<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url  [Dependency injection (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/dependency-injection)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Dependency injection (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Dependency injection (Concepts) | AdonisJS Documentation

> Fuente oficial: [Dependency injection (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/dependency-injection)

***

## ¿Qué es la inyección de dependencias en AdonisJS?

- El IoC container de AdonisJS puede construir clases y resolver sus dependencias automáticamente sin apenas configuración.
- Se usa para registrar y resolver bindings y para inyectar dependencias en constructores o métodos.

***

## Ejemplo básico

Automática con decorador y TypeScript:

1. Crea el servicio:

```ts
// app/services/echo_service.ts
export default class EchoService {
  respond() { return 'hello'; }
}
```

2. Inyéctalo en un controlador:

```ts
import EchoService from '#services/echo_service'
export default class HomeController {
  constructor(protected echo: EchoService) {}
  handle() { return this.echo.respond(); }
}
```

3. Usa el decorador `@inject`:

```ts
import { inject } from '@adonisjs/core'
@inject()
export default class HomeController { /* ... */ }
```


- Al instanciar el controlador, el container inyecta la dependencia sin necesitar código adicional.

***

## Árbol de dependencias y encadenamiento

El container puede resolver dependencias anidadas. Ejemplo:

```ts
import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
@inject()
export default class EchoService {
  constructor(protected ctx: HttpContext) {}
  respond() { return `Hello from ${this.ctx.request.url()}`; }
}
```

Solo necesitas usar el decorador `@inject` en cada clase para que resuelva el árbol completo automáticamente.

***

## Inyección en métodos

Puedes inyectar dependencias en métodos usando `@inject` antes de la firma del método.

Ejemplo:

```ts
@inject()
export default class HomeController {
  @inject()
  handle(ctx, echo: EchoService) {
    return echo.respond();
  }
}
```

El primer parámetro siempre será el contexto HTTP.

***

## Buenas prácticas para DI

- DI crea acoplamiento bajo y facilita el testeo/refactor.
- Evita inyectar helpers genéricos (como lodash), importa y úsalos directamente.
- No siempre es necesario inyectar servicios internos como logger.

***

## Uso directo del container

Puedes crear instancias manualmente con el container:

```ts
import app from '@adonisjs/core/services/app'
@inject()
class SomeService { constructor(public echo: EchoService) {} }
const service = await app.container.make(SomeService)
// service.echo es instancia de EchoService
```

Puedes usar `container.call` para inyectar dependencias en métodos:

```ts
class SomeService {
  @inject()
  run(echo: EchoService) { /* ... */ }
}
await app.container.call(service, 'run')
```


***

## Bindings en el container

Puedes registrar bindings personalizados en el container para servicios globales o singletons.

Registro de binding:

```ts
import app from '@adonisjs/core/services/app'
class MyFakeCache { get(key) { return `${key}!`; } }
app.container.bind('cache', () => new MyFakeCache())
const cache = await app.container.make('cache')
```

Registro de singleton:

```ts
app.container.singleton('cache', () => new MyFakeCache())
```

Registro de valor fijo:

```ts
app.container.bindValue('cache', new MyFakeCache())
```

Registro de alias:

```ts
app.container.singleton(MyFakeCache, () => new MyFakeCache())
app.container.alias('cache', MyFakeCache)
```

Definir tipos para bindings (TypeScript):

```ts
declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    cache: MyFakeCache
  }
}
```


***

## Abstracción y contextual bindings

Puedes definir una abstracción (Patrones Hexagonal, Port-Adapter):

```ts
export abstract class PaymentService {
  abstract charge(amount: number): Promise<void>
  abstract refund(amount: number): Promise<void>
}
```

Implementación concreta y binding:

```ts
export class StripePaymentService implements PaymentService { /* ... */ }
app.container.bind(PaymentService, () => app.container.make(StripePaymentService))
```

Contextual bindings: puedes definir qué implementación usar para cada clase consumidora.

```ts
app.container
  .when(UserService)
  .asksFor(Disk)
  .provide(async (resolver) => drive.use('gcs'))

app.container
  .when(PostService)
  .asksFor(Disk)
  .provide(async (resolver) => drive.use('s3'))
```


***

## Testing: Swapping implementaciones

Puedes usar `container.swap` para definir una clase fake en tests, y `container.restore` para revertir.

```ts
class FakeService extends UserService { all() { return [{ id: 1, username: 'virk' }]; } }
app.container.swap(UserService, () => new FakeService())
// Cuando quieras restaurar:
app.container.restore(UserService)
app.container.restoreAll([UserService, PostService])
app.container.restoreAll()
```


***

## Hooks y eventos del container

Puedes extender bindings con el hook `resolving` o escuchar el evento `container_binding:resolved`:

```ts
app.container.resolving('validator', (validator) => {
  validator.rule('unique', implementation)
})

import emitter from '@adonisjs/core/services/emitter'
emitter.on('container_binding:resolved', (event) => {
  console.log(event.binding, event.value)
})
```


***

¿Quieres este contenido como archivo `.md` para importar, o alguna adaptación especial para tu sistema de IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/dependency-injection

