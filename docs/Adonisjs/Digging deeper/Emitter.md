<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Emitter (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/emitter)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Emitter (Digging deeper)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Event Emitter (Digging deeper) | AdonisJS Documentation

> Fuente oficial: [Emitter (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/emitter)

***

## ¿Qué es el Event Emitter de AdonisJS?

- Wrapper sobre [Emittery](https://emittery.com/), ofrece emisión de eventos asíncrona, tipado estático y listeners en clases/dedicados.
- Mejora el Node.js EventEmitter simple, resolviendo limitaciones típicas.

***

## Uso básico

- Define listeners en `start/events.ts` (crea con `node ace make:preload events`).
- Suscribir:

```js
import emitter from '@adonisjs/core/services/emitter'
emitter.on('user:registered', user => { console.log(user) })
```

- Emitir:

```js
emitter.emit('user:registered', user)
```

- `once` escucha una vez, luego auto-desuscribe.

***

## Tipado estático

- Registra los tipos de tus eventos en `types/events.ts`:

```ts
import User from '#models/User'
declare module '@adonisjs/core/types' {
  interface EventsList {
    'user:registered': User
  }
}
```

- Si es engorroso, considera eventos basados en clases.

***

## Listeners en clase

- Crea listeners con `make:listener`.

```bash
node ace make:listener sendVerificationEmail
```

    - Exportan un método `handle(payload)`.
    - Los asocias en `start/events.ts`:

```js
import SendVerificationEmail from '#listeners/send_verification_email'
emitter.on('user:registered', [SendVerificationEmail, 'handle'])
```

    - Para lazy loading oyentes, usa:

```js
emitter.on('user:registered', [() => import('#listeners/send_verification_email'), 'handle'])
```

- **Inyección de dependencias:** Los listeners son instanciados por el IoC container.

***

## Eventos basados en clase

- Event como clase: encapsula nombre + data.
- Crear con `make:event`, ej:

```ts
export default class UserRegistered extends BaseEvent {
  constructor(public user: User) { super() }
}
```

- Escuchar:

```js
emitter.on(UserRegistered, event => { console.log(event.user) })
```

- Emitir:

```js
UserRegistered.dispatch(user)
```

- Simplifica listeners con:

```js
emitter.listen(UserRegistered, [() => import('#listeners/send_verification_email')])
```


***

## Manejo y asserts de errores

- Maneja errores de listeners con:

```js
emitter.onError((event, error, eventData) => { ... })
```

- `onAny` escucha todos los eventos.

***

## Unsubscribe

- El método `emitter.on` retorna una función para quitar el listener.
- O usa `emitter.off`, `clearListeners`, `clearAllListeners`.

***

## Fakes en testing

- Puedes "fakenear" eventos para evitar efectos secundarios en tests:

```js
const events = emitter.fake()
// ... test ...
events.assertEmitted('user:registered')
emitter.restore()
```

- Fakes específicos:

```js
emitter.fake('user:registered')
emitter.fake([UserRegistered, OrderUpdated])
```

- Métodos de aserción: `assertEmitted`, `assertNotEmitted`, `assertNoneEmitted`, `assertEmittedCount`.

***

¿Quieres este contenido como archivo `.md` o estructurado para tu sistema de documentación o IA? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/digging-deeper/emitter

