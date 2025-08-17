<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Body parser (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/body-parser)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Body parser (Basics)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Body parser middleware (Basics) | AdonisJS Documentation

> Fuente oficial: [Body parser (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/body-parser)

***

## ¿Qué es el BodyParser middleware?

- Middleware encargado de parsear el body de las peticiones HTTP.
- Se registra en `start/kernel.ts`.
- La configuración reside en `config/bodyparser.ts`, donde puedes ajustar parseo de JSON, formularios (URL-encoded), multipart (subida de archivos) y raw.

***

## Configuración básica

```js
import { defineConfig } from '@adonisjs/core/bodyparser'

export const defineConfig({
  allowedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  form: { /* ... */ },
  json: { /* ... */ },
  multipart: { /* ... */ },
  raw: { /* ... */ },
})
```

- **allowedMethods:** Métodos HTTP para los que se parsea el body. Por defecto: POST, PUT, PATCH, DELETE.

***

## Normalizar empty strings

- HTML forms envían `""` para campos vacíos. Si quieres convertir esos valores a `null`, activa `convertEmptyStringsToNull` en cada parser.

```js
convertEmptyStringsToNull: true
```


***

## JSON parser

Configuración:

```js
json: {
  encoding: 'utf-8',         // Codificación usada al convertir el Buffer a string
  limit: '1mb',              // Límite máximo del body
  strict: true,              // Solo permite {} o [] al tope del JSON
  types: [
    "application/json",
    "application/json-patch+json",
    "application/vnd.api+json",
    "application/csp-report"
  ],
  convertEmptyStringsToNull: true,
}
```


***

## URL-encoded form parser

Configuración:

```js
form: {
  encoding: 'utf-8',
  limit: '1mb',
  queryString: {},   // Configuración para qs package
  types: ['application/x-www-form-urlencoded'],
  convertEmptyStringsToNull: true,
}
```

- Usa `qs` para parsear el body. Puedes ajustar sus opciones a través de `queryString`.

***

## Multipart parser (archivos)

Configuración:

```js
multipart: {
  autoProcess: true,      // Mueve archivos subidos a /tmp automáticamente
  processManually: [],    // Excepciones a autoProcess (por pattern de ruta)
  encoding: 'utf-8',
  fieldsLimit: '2mb',     // Límite para fields (no archivos)
  limit: '20mb',          // Límite total para archivos
  types: ['multipart/form-data'],
  convertEmptyStringsToNull: true,
}
```

- **autoProcess:** Si es true, los archivos se procesan “automágicamente” y se depositan en el sistema de archivos temporal.
- **processManually:** Lista de patrones de rutas para los que NO se procesa automático.
- Límite de tamaño configurable por campo o fichero.

***

¿Quieres este contenido como archivo `.md` para importar o alguna estructura especial para tu base de conocimientos? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/basics/body-parser

