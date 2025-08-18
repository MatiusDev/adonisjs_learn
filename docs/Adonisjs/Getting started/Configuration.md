<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Configuration (Getting started) | AdonisJS Documentation](https://docs.adonisjs.com/guides/getting-started/configuration)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Configuration (Getting started)** de AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Configuration (Getting started) | AdonisJS Documentation

> Fuente oficial: [Configuration (Getting started) | AdonisJS Documentation](https://docs.adonisjs.com/guides/getting-started/configuration)

***

## Archivos de configuración

- Todos los archivos de configuración están en el directorio `config` de tu aplicación AdonisJS.
- La estructura inicial incluye archivos usados por el core y los paquetes instalados.
- Puedes añadir archivos extra según lo necesite tu proyecto.
- Se recomienda usar **variables de entorno** para secretos y configuración específica por ambiente.

***

## Importar archivos de configuración

Puedes importar los archivos de configuración directamente en tu código usando `import`:

```js
import { appKey } from '#config/app'
import databaseConfig from '#config/database'
```

- Normalmente, los exports son instancias de `ConfigProvider`. Se recomienda leer valores desde la config resuelta.

***

## Usar el servicio de configuración

El servicio `config` permite leer valores de configuración con una API alternativa:

```js
import config from '@adonisjs/core/services/config'

config.get('app.appKey')
config.get('app.http.cookie') // valores anidados
```

- El primer fragmento de la clave es el nombre del archivo (ej: `app` corresponde a `config/app.ts`).
- El resto es la clave a leer del export.


### ¿Cuándo usar el servicio de configuración?

- Directamente: funcional, pero no aporta beneficios extra.
- Externamente (paquetes terceros, plantillas Edge): **es obligatorio** porque no puedes acoplar al path/folder de la app.


#### Ejemplo en un Service Provider

```js
import { ApplicationService } from '@adonisjs/core/types'

export default class DriveServiceProvider {
  constructor(protected app: ApplicationService) {}
  register() {
    this.app.container.singleton('drive', () => {
      const driveConfig = this.app.config.get('drive')
      return new DriveManager(driveConfig)
    })
  }
}
```


#### Ejemplo en plantillas Edge

```html
<a href="{{ config('app.appUrl') }}"> Home </a>
```

Puedes verificar si existe una clave con `config.has`:

```html
@if(config.has('app.appUrl'))
  <a href="{{ config('app.appUrl') }}"> Home </a>
@else
  <a href="/"> Home </a>
@end
```


***

## Modificar la ubicación del directorio de configuración

Cambia la ruta en `adonisrc.ts`:

```js
directories: {
  config: './configurations'
}
```

Actualiza el alias de importación en `package.json`:

```json
"imports": {
  "#config/*": "./configurations/*.js"
}
```


***

## Limitaciones de los archivos de configuración

- Los archivos del directorio `config` se importan durante la fase de **boot** de la app.
- No deben depender del código de la aplicación (por ejemplo: no uses servicios como el router en la config).
- Esto **refuerza el principio** de que la lógica de la aplicación depende de la configuración, y no al revés.

***

## Actualizar configuración en tiempo de ejecución

Puedes modificar valores en la config a nivel memoria usando `config.set`. **No modifica archivos en disco**.

```js
import env from '#start/env'
import config from '@adonisjs/core/services/config'

const HOST = env.get('HOST')
const PORT = env.get('PORT')

config.set('app.appUrl', `http://${HOST}:${PORT}`)
```

> La actualización de config afecta a toda la aplicación, no sólo a una petición HTTP, ya que Node.js comparte memoria entre peticiones.

***

¿Prefieres este contenido listo para exportar como archivo `.md` o alguna adaptación especial? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/getting-started/configuration

