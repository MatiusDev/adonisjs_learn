<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Environment variables (Getting started) | AdonisJS Documentation](https://docs.adonisjs.com/guides/getting-started/environment-variables)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Environment variables (Getting started)** de AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Environment variables (Getting started) | AdonisJS Documentation

> Fuente oficial: [Environment variables (Getting started) | AdonisJS Documentation](https://docs.adonisjs.com/guides/getting-started/environment-variables)

***

## Propósito y ventajas

Las variables de entorno se usan para guardar secretos (contraseñas, claves, tokens) y configuración específica por entorno (dev, test, prod). Son soportadas por todos los sistemas, plataformas de despliegue y pipelines CI/CD.

***

## Lectura de variables de entorno

- Node.js expone las variables a través del objeto `process.env`.

```js
process.env.NODE_ENV
process.env.HOST
process.env.PORT
```


***

## Usar el módulo env de AdonisJS

Ventajas de usar el módulo `env`:

- Permite usar múltiples archivos `.env`.
- Valida variables al iniciar la aplicación.
- Proporciona type safety estático.

Ejemplo en código:

```js
import env from '#start/env'

env.get('NODE_ENV')
env.get('HOST')
env.get('PORT')
env.get('PORT', 3333) // valor por defecto si no está definido
```


### Uso en Edge templates:

Puedes compartir el módulo `env` como variable global solo para server-side rendering.

```js
import env from '#start/env'
import edge from 'edge.js'
edge.global('env', env)
```


***

## Validación de variables

Las reglas se definen en `start/env.ts` usando `Env.create`, que recibe un objeto con validaciones por variable.

Ejemplo:

```js
import Env from '@adonisjs/core/env'
const APP_ROOT = new URL('../', import.meta.url)

export default await Env.create(APP_ROOT, {
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  CACHE_VIEWS: Env.schema.boolean(),
  SESSION_DRIVER: Env.schema.string(),
  APP_NAME: Env.schema.string(),
})
```

El esquema de validación define el tipo y formato (string, boolean, number, enum, custom).
Permite variantes opcionales dependiendo del entorno.

***

## Ejemplos por tipo de validación (schema API)

### string

```js
APP_KEY: Env.schema.string()
APP_KEY: Env.schema.string.optional()
APP_KEY: Env.schema.string.optionalWhen(process.env.NODE_ENV === 'production')
HOST: Env.schema.string({ format: 'host' })
S3_ENDPOINT: Env.schema.string({ format: 'url', protocol: false, tld: false })
SENDER_EMAIL: Env.schema.string({ format: 'email' })
```


### boolean

```js
CACHE_VIEWS: Env.schema.boolean()
CACHE_VIEWS: Env.schema.boolean.optional()
```


### number

```js
PORT: Env.schema.number()
PORT: Env.schema.number.optional()
```


### enum

```js
NODE_ENV: Env.schema.enum(['development', 'production'] as const)
```


### custom

Función personalizada:

```js
PORT: (name, value) => {
  if (!value) throw new Error('Value for PORT is required')
  if (isNaN(Number(value))) throw new Error('Value for PORT must be a valid number')
  return Number(value)
}
```


***

## Definición de variables

- En desarrollo: `.env` en la raíz del proyecto.

```env
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=sH2k88gojcp3PdAJiGDxof54kjtTXa3g
SESSION_DRIVER=cookie
CACHE_VIEWS=false
```

- En producción: definir en plataforma de despliegue; si no, usar `.env` y ajustar `ENV_PATH` si el archivo está fuera de raíz.

```bash
ENV_PATH=/etc/secrets node server.js
```

- En tests: usar `.env.test`, que sobrescribe valores de `.env`.

***

## Archivos dot-env admitidos

AdonisJS procesa, en este orden (el primero sobrescribe a los siguientes):


| Rank | Filename | Notas |
| :-- | :-- | :-- |
| 1st | .env.[NODE_ENV].local | Solo para el entorno actual (`development.local`) |
| 2nd | .env.local | Para todos menos `test`/`testing` |
| 3rd | .env.[NODE_ENV] | Para el entorno actual (`development`) |
| 4th | .env | Universal, agregar a `.gitignore` si tiene secretos |


***

## Interpolación y uso de identificadores

- Se pueden definir identificadores para transformar valores automáticamente (ejemplo: `base64:`).

```js
import { EnvParser } from '@adonisjs/env'
EnvParser.defineIdentifier('base64', value => Buffer.from(value, 'base64').toString())
const envParser = new EnvParser('APP_KEY=base64:U7dbSKkdb8wjVFOTq2osaDVz4djuA7BRLdoCUJEWxak=')
console.log(await envParser.parse())
```

- Uso de variables en archivos `.env`:

```env
HOST=localhost
PORT=3333
URL=$HOST:$PORT
REDIS-USER=admin
REDIS-URL=localhost@${REDIS-USER}
```

- Escape de `$` en valores:

```env
PASSWORD=pa\$\$word
```


***

¿Quieres este contenido como archivo `.md` listo para importar, o algún ajuste especial para tu plataforma de IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/getting-started/environment-variables

