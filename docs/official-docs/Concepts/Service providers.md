<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Service providers (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/service-providers)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Service providers (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Service providers (Concepts) | AdonisJS Documentation

> Fuente oficial: [Service providers (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/service-providers)

***

## ¿Qué son los service providers?

- Clases JS con métodos de ciclo de vida, usadas para conectar lógica y dependencias en distintos momentos del arranque de tu app.
- Permiten registrar bindings en el container, extenderlos, o ejecutar acciones tras arrancar el servidor HTTP.
- Son el entrypoint para modificar el estado o ampliar la funcionalidad antes de que la app quede “ready”.
- Usados principalmente por paquetes externos para integraciones profundas.
- Si sólo quieres inyectar dependencias, utiliza dependency injection en vez de providers.

Los providers se incluyen vía la propiedad `providers` en `adonisrc.ts`, usando funciones de importación lazy:

```js
providers: [
  () => import('@adonisjs/core/providers/app_provider'),
  () => import('./providers/app_provider.js'),
]
```

Puedes limitar en qué entornos se cargan:

```js
providers: [
  {
    file: () => import('./providers/app_provider.js'),
    environment: ['web', 'repl']
  }
]
```


***

## Cómo escribir service providers

- Se ubican en el directorio `providers` de tu app (`node ace make:provider app` para generarlos).
- Exportan por default una clase que recibe `ApplicationService` en el constructor.

```js
import { ApplicationService } from '@adonisjs/core/types'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  register() { /* ... */ }
  async boot() { /* ... */ }
  async start() { /* ... */ }
  async ready() { /* ... */ }
  async shutdown() { /* ... */ }
}
```


***

## Métodos de ciclo de vida

- **register**: Se ejecuta inmediatamente tras crear la instancia del provider; sirve para registrar bindings en el container. Es síncrona.

```js
register() {
  this.app.container.bind('db', () => new Database())
}
```

- **boot**: Se llama después de registrar todos los bindings. Puedes resolver/extender bindings, añadir custom rules, etc.

```js
async boot() {
  const validator = await this.app.container.make('validator')
  validator.rule('foo', () => {})
}
// O con hook:
async boot() {
  this.app.container.resolving('validator', (validator) => {
    validator.rule('foo', () => {})
  })
}
```

- **start**: Se ejecuta tras `boot` y antes de `ready`. Útil para preparar acciones que requiera el método ready.
- **ready**: El momento exacto varía por entorno:


| Entorno | Momento de ejecución de `ready` |
| :-- | :-- |
| web | Tras arrancar HTTP server. |
| console | Antes del método `run` de cada comando |
| test | Antes de ejecutar los tests. |
| repl | Antes de mostrar el prompt de REPL. |

Puedes usar controles de entorno:

```js
async start() {
  if (this.app.getEnvironment() === 'web') { /* ... */ }
  if (this.app.getEnvironment() === 'console') { /* ... */ }
  // etc.
}
```

- **shutdown**: Se llama cuando la app realiza un shutdown ordenado, permitiendo limpieza de recursos.

```js
async shutdown() {
  // Clean up resources
}
```


> Lee la guía de ciclo de vida de la aplicación para más detalles sobre cuándo se llaman estos métodos.

***

¿Quieres este contenido en archivo `.md` para importar, o alguna adaptación especial para tu sistema de IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/service-providers

