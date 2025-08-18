<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Application lifecycle (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/application-lifecycle)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Application lifecycle (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Application lifecycle (Concepts) | AdonisJS Documentation

> Fuente oficial: [Application lifecycle (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/application-lifecycle)

***

## Resumen del ciclo de vida de una app AdonisJS

El ciclo de vida depende del **entorno** en el que se ejecuta la app:

- Los puntos de entrada están en `bin/` y arrancan para cada entorno (servidor, consola, test).
    - `bin/server.ts`: HTTP server (`node ace serve`)
    - `bin/console.ts`: comandos Ace
    - `bin/test.ts`: tests con Japa

Se utiliza el módulo **Ignitor** para inicializar la aplicación:

1. Se crea una instancia de la clase `Application`.
2. Se inicia/bootea la aplicación.
3. Se ejecuta la acción principal según entorno (servidor HTTP, tests, comandos).

***

## Fases principales

### Boot phase

- Igual en todos los entornos excepto `console`.
- Solo puedes usar servicios y container bindings después de bootear la app.


### Start phase

- Varía según entorno.
- Subdividida en **pre-start** (acciones antes de arrancar) y **post-start** (después del arranque).
    - **Web**: Proceso HTTP de larga vida, se mantiene en `ready` hasta apagar o crash.
    - **Test**: Ejecuta pre/post-start, importa y corre los tests.
    - **Console**: Depende del comando, puedes activar arranque con el flag `options.startApp`.

Ejemplo de comando con arranque:

```js
import { BaseCommand } from '@adonisjs/core/ace'
export default class GreetCommand extends BaseCommand {
  static options = { startApp: true }
  async run() {
    console.log(this.app.isReady) // true
  }
}
```


***

## Fase de terminación (shutdown)

- **Comandos/test**: Proceso termina tras acción principal.
- **HTTP server**: Espera señales (ej. `SIGTERM`, `SIGINT` con pm2) para terminar de forma ordenada.
- Es recomendable una *graceful shutdown* para limpiar recursos.

Configuración para comandos de larga vida:

```js
export default class GreetCommand extends BaseCommand {
  static options = { startApp: true, staysAlive: true }
  async run() {
    await runSomeProcess()
    await this.terminate()
  }
}
```


***

## Hooks de ciclo de vida

Permiten ejecutar acciones en puntos clave del ciclo de inicialización/terminación.

### Inline callbacks

Se pueden registrar desde el código de entrada (por ejemplo en `bin/server.ts`, `bin/console.ts`, `bin/test.ts`):

```js
const app = new Application(new URL('../', import.meta.url))
new Ignitor(APP_ROOT, { importer: IMPORTER })
  .tap((app) => {
    app.booted(() => {
      console.log('invoked after the app is booted')
    })
    app.ready(() => {
      console.log('invoked after the app is ready')
    })
    app.terminating(() => {
      console.log('invoked before the termination starts')
    })
  })
```

**Hooks disponibles:**

- `initiating` — Antes de estado initiated
- `booting` — Antes del boot
- `booted` — Tras registrar providers
- `starting` — Antes de importar preloads
- `ready` — Cuando la app está lista
- `terminating` — Cuando inicia shutdown

***

### Service providers y métodos de ciclo de vida

Es preferible definir hooks en los service providers para mantener el orden.

Ejemplo estructura:

```js
import { ApplicationService } from '@adonisjs/core/types'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  register() { /* registrar bindings (sync) */ }
  async boot() { /* inicializar bindings */ }
  async start() { /* antes del estado ready */ }
  async ready() { /* después del estado ready */ }
  async shutdown() { /* cuando inicia la terminación */ }
}
```

- `register`: registra dependencias en el container (sync).
- `boot`: inicializa dependencias (async).
- `start`: antes del estado ready.
- `ready`: después del estado ready.
- `shutdown`: al iniciar la terminación, para cerrar conexiones y limpiar recursos.

***

¿Quieres este contenido en archivo `.md` listo para importar, o alguna estructuración específica para bases de datos IA? Indícalo en tu siguiente mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/application-lifecycle

