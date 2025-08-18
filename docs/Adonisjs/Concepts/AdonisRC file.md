<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [AdonisRC file (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/adonisrc-file)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **AdonisRC file (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# AdonisRC file (Concepts) | AdonisJS Documentation

> Fuente oficial: [AdonisRC file (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/adonisrc-file)

***

## ¿Qué es el archivo `adonisrc.ts`?

El archivo `adonisrc.ts` configura los ajustes globales y de workspace de tu aplicación AdonisJS.
Desde él puedes:

- Registrar service providers.
- Definir aliases para comandos Ace.
- Especificar archivos para copiar en el build de producción.
- Ajustar rutas de carpetas clave.

**Importante:**
Este archivo es usado por herramientas externas a tu aplicación. No debes incluir lógica de aplicación ni condicionales de entorno aquí.

Puedes ver su contenido completo ejecutando:

```bash
node ace inspect:rcfile
```

Y acceder al RCFile parseado desde el servicio:

```js
import app from '@adonisjs/core/services/app'
console.log(app.rcFile)
```


***

## Propiedades principales

### `typescript`

- Indica si la app usa TypeScript (`true`).
- Actualmente siempre es `true`; pronto será configurable.


### `directories`

- Define rutas de carpetas clave para comandos de scaffolding y el framework.

Ejemplo:

```js
directories: {
  config: 'config',
  commands: 'commands',
  contracts: 'contracts',
  public: 'public',
  providers: 'providers',
  languageFiles: 'resources/lang',
  migrations: 'database/migrations',
  seeders: 'database/seeders',
  factories: 'database/factories',
  views: 'resources/views',
  start: 'start',
  tmp: 'tmp',
  tests: 'tests',
  httpControllers: 'app/controllers',
  models: 'app/models',
  services: 'app/services',
  exceptions: 'app/exceptions',
  mails: 'app/mails',
  middleware: 'app/middleware',
  policies: 'app/policies',
  validators: 'app/validators',
  events: 'app/events',
  listeners: 'app/listeners',
  stubs: 'stubs',
}
```

Si renombras carpetas, actualízalo aquí para que el tooling lo detecte.

### `preloads`

- Array de archivos a importar en el boot de la app.
- Puedes indicar el entorno (`web`, `console`, `test`, `repl`).

Ejemplo:

```js
preloads: [
  () => import('./start/view.js'),
  {
    file: () => import('./start/view.js'),
    environment: ['web', 'console', 'test'],
  },
]
```

Crea archivos de preload con:
`node ace make:preload`

### `metaFiles`

- Array de archivos NO TypeScript/JavaScript a copiar al build (ej: plantillas, language files).
- Puedes indicar si recargar el dev server cuando cambien.

```js
metaFiles: [
  { pattern: 'public/**', reloadServer: false },
  { pattern: 'resources/views/**/*.edge', reloadServer: false },
]
```


### `commands`

- Lista de funciones de importación lazy para comandos Ace de paquetes externos.
- Los comandos propios se importan automáticamente.

Ejemplo:

```js
commands: [
  () => import('@adonisjs/core/commands'),
  () => import('@adonisjs/lucid/commands'),
]
```


### `commandsAliases`

- Mapea aliases fáciles de recordar para comandos.
- Puedes mapear varios aliases a un mismo comando.

Ejemplo:

```js
commandsAliases: {
  migrate: 'migration:run',
  up: 'migration:run',
}
```


### `tests`

- Registra suites de tests y settings globales del runner.

Ejemplo:

```js
tests: {
  timeout: 2000,
  forceExit: false,
  suites: [
    {
      name: 'functional',
      files: ['tests/functional/**/*.spec.ts'],
      timeout: 30000
    },
  ]
}
```

- `timeout`: por defecto para todos los tests.
- `forceExit`: fuerza cierre tras los tests.


### `providers`

- Lista de service providers a importar en el boot.
- Se puede limitar por entorno (`web`, `console`, `test`, `repl`).

Ejemplo:

```js
providers: [
  () => import('@adonisjs/core/providers/app_provider'),
  {
    file: () => import('./providers/app_provider.js'),
    environment: ['web', 'console', 'test'],
  },
]
```


### `assetsBundler`

- Configuración del bundler de assets frontend (Vite, Webpack, u otro).
- Permite ajustar comandos de dev y build.

Ejemplo Vite:

```js
assetsBundler: {
  name: 'vite',
  devServer: {
    command: 'vite',
    args: []
  },
  build: {
    command: 'vite',
    args: ['build']
  }
}
```


***

¿Quieres este contenido como archivo `.md` listo para importar, o con alguna estructura para IA o sistemas de documentación? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/adonisrc-file

