<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Application (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/application)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Application (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Application (Concepts) | AdonisJS Documentation

> Fuente oficial: [Application (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/application)

***

## La clase Application

La clase `Application` gestiona y conecta todos los componentes de una aplicación AdonisJS. Permite obtener información del entorno, estado de la app y crear rutas absolutas a carpetas claves.

***

## Entornos de ejecución

Los entornos conocidos en AdonisJS son:

- `web`: Proceso arrancado para el servidor HTTP.
- `console`: Proceso para comandos Ace (excepto `repl`).
- `repl`: Proceso iniciado con `node ace repl`.
- `test`: Proceso para ejecutar tests (`node ace test`).

Acceso al entorno:

```js
import app from '@adonisjs/core/services/app'
console.log(app.getEnvironment())
```

Puedes modificar el entorno antes del boot:

```js
if (!app.isBooted) {
  app.setEnvironment('repl')
}
```


***

## Node environment

Propiedad para el entorno Node.js, normalizada:

```js
import app from '@adonisjs/core/services/app'
console.log(app.nodeEnvironment)
```

| NODE_ENV | Normalizado |
| :-- | :-- |
| dev, develop | development |
| stage | staging |
| prod | production |
| testing | test |

Propiedades rápidas:

```js
app.inProduction // true si está en producción
app.inDev       // true si está en desarrollo
app.inTest      // true si está en test
```


***

## Estado de la aplicación

Estados posibles:

- `created`: Estado inicial.
- `initiated`: Variables de entorno y adonisrc.ts procesados.
- `booted`: Providers registrados y activos.
- `ready`: Según entorno, lista para aceptar peticiones HTTP.
- `terminated`: Proceso terminando, no acepta nuevas peticiones.

Acceso:

```js
console.log(app.getState())
app.isBooted      // != 'created' y != 'initiated'
app.isReady       // == 'ready'
app.isTerminating // intentando terminar
app.isTerminated  // == 'terminated'
```


***

## Señales de proceso

Escucha señales POSIX:

```js
app.listen('SIGTERM', () => {})
app.listenOnce('SIGTERM', () => {})
```

Condicionalmente (ej. pm2):

```js
app.listenIf(app.managedByPm2, 'SIGTERM', () => {})
app.listenOnceIf(app.managedByPm2, 'SIGTERM', () => {})
```


***

## Comunicación con el proceso padre

Envía mensajes desde un child process:

```js
app.notify('ready')
app.notify({ isReady: true, port: 3333, host: 'localhost' })
```


***

## Utilidades de rutas y URLs

Usa métodos y helpers para generar rutas absolutas en vez de construirlas manualmente.

### URLs y paths principales

- `makeURL(path)` — Retorna URL de un archivo/carpeta en la raíz.
- `makePath(path)` — Retorna ruta absoluta.

```js
app.makeURL('tests/welcome.spec.ts').href
app.makePath('app/middleware/auth.ts')
```


### Helpers específicos

| Método | Path generado en proyecto |
| :-- | :-- |
| `configPath(file)` | `/config/file` |
| `publicPath(file)` | `/public/file` |
| `providersPath(file)` | `/providers/file` |
| `factoriesPath(file)` | `/database/factories/file` |
| `migrationsPath(file)` | `/database/migrations/file` |
| `seedersPath(file)` | `/database/seeders/file` |
| `languageFilesPath(file)` | `/resources/lang/file` |
| `viewsPath(file)` | `/resources/views/file` |
| `startPath(file)` | `/start/file` |
| `tmpPath(file)` | `/tmp/file` |
| `httpControllersPath(file)` | `/app/controllers/file` |
| `modelsPath(file)` | `/app/models/file` |
| `servicesPath(file)` | `/app/services/file` |
| `exceptionsPath(file)` | `/app/exceptions/file` |
| `mailsPath(file)` | `/app/mails/file` |
| `middlewarePath(file)` | `/app/middleware/file` |
| `policiesPath(file)` | `/app/polices/file` |
| `validatorsPath(file)` | `/app/validators/file` |
| `commandsPath(file)` | `/commands/file` |
| `eventsPath(file)` | `/app/events/file` |
| `listenersPath(file)` | `/app/listeners/file` |


***

## Generadores

La clase incluye helpers para crear nombres de clase y archivos:

```js
app.generators.controllerFileName('user')   // users_controller.ts
app.generators.controllerName('user')       // UsersController
```

Para otros generadores, consultar directamente el código fuente de `generators.ts`.

***

¿Necesitas este contenido como archivo `.md` o alguna estructura especial para importar o entrenar tu IA? Dímelo en tu siguiente mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/application

