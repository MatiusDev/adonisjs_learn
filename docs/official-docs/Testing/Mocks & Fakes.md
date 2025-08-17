<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Mocks \& Fakes (Testing) | AdonisJS Documentation](https://docs.adonisjs.com/guides/testing/mocks-and-fakes)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Mocks \& Fakes (Testing)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Mocks and Fakes (Testing) | AdonisJS Documentation

> Fuente oficial: [Mocks \& Fakes (Testing) | AdonisJS Documentation](https://docs.adonisjs.com/guides/testing/mocks-and-fakes)

***

## ¿Qué son los fakes y mocks en AdonisJS?

- Permiten testear tu app sin depender de recursos reales: puedes “fakenear” servicios de email, red, tiempo, etc.
- Usados para evitar efectos colaterales (no enviar emails reales, no llamar a gateways de pago reales, etc).

***

## Fakes API

- Un Fake es una implementación real de testing, no sólo un mock vacío.
- Varios servicios (como el mailer) proveen una versión fake para pruebas: los correos quedan en memoria, no se envían realmente.
- Los servicios con fakes tienen documentación en sus respectivos módulos.

***

## Dependency Injection y fakes

- Si usas dependency injection/container, puedes swappear clases por una fake:

```js
import UserService from '#services/user_service'
import app from '@adonisjs/core/services/app'

test('get all users', async () => {
  class FakeService extends UserService {
    all() { return [{ id: 1, username: 'virk' }] }
  }

  app.container.swap(UserService, () => new FakeService())

  // ... lógica de test ...

  app.container.restore(UserService)
  // O para muchas:
  app.container.restoreAll([UserService, PostService])
  // O para restaurar todo:
  app.container.restoreAll()
})
```


***

## Sinon.js: mocks y stubs

- Sinon es la librería estándar de mocking/stubbing en Node.js, soportada (y recomendada) en AdonisJS para mocks avanzados y uso con TypeScript.

***

## Mocking de requests HTTP (nock)

- Si tu app hace peticiones HTTP, puedes usar `nock` para interceptar peticiones externas (sin importar si usas axios, got, etc).

***

## Freezing time/test de tiempo (timekeeper)

- Usa `timekeeper` para mockear la clase Date y controlar el paso del tiempo en tests.
- Ejemplo helper con integración Japa:

```js
import { getActiveTest } from '@japa/runner'
import timekeeper from 'timekeeper'

export function timeTravel(secondsToTravel) {
  const test = getActiveTest()
  if (!test) throw new Error('Cannot use "timeTravel" outside of a Japa test')
  timekeeper.reset()
  const date = new Date()
  date.setSeconds(date.getSeconds() + secondsToTravel)
  timekeeper.travel(date)
  test.cleanup(() => { timekeeper.reset() })
}
```

Uso:

```js
timeTravel(60 * 60 * 3) // viaja 3 horas al futuro
```


***

¿Quieres este contenido en archivo `.md` para importar o adaptado para tu sistema de conocimiento IA? Indícalo en tu respuesta.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/testing/mocks-and-fakes

