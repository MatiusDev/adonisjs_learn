<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Request (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/request)

Aquí tienes el archivo markdown para la base de conocimientos IA con el contenido de la página oficial "Request (Basics)" de AdonisJS, referenciando la fuente.

***

# Request (Basics) | AdonisJS Documentation

> Fuente oficial: [Request (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/)

***

## Overview

La instancia `request` contiene todos los datos relevantes para la petición HTTP actual: body, archivos cargados, cookies, headers y más. Se accede mediante `ctx.request`.

***

## Query String y Route Params

- `request.qs()` devuelve objeto con los parámetros query del URL.
- `request.params()` devuelve objeto con parámetros de ruta.
- `request.param('id')` obtiene valor específico.

Ejemplo:

```js
router.get('/posts/:slug/comments/:id', ({ request }) => {
  const slug = request.param('slug')
  const commentId = request.param('id')
})
```


***

## Body de la petición

- Procesado por el middleware body parser.
- Métodos:
    - `request.body()` — retorna el body parseado.
    - `request.all()` — combina query string y body.
    - `request.input('field', defaultValue?)` — retorna valor específico del body o query.
    - `request.only([...fields])` — obtiene sólo campos indicados.
    - `request.except([...fields])` — obtiene todo menos campos indicados.

***

## URL y encabezados

- URL relativas y completas `request.url()`, `request.completeUrl()`.
- Puedes obtener URL con query string usando `request.url(true)`.
- Acceso a headers con `request.headers()`, o específico con `request.header('name')`.

***

## Métodos y Spoofing

- `request.method()` — método HTTP real (respetando spoofing si activado).
- `request.intended()` — método HTTP original (antes de spoofing).

***

## IP del usuario y confianza en proxies

- `request.ip()` — IP real del usuario considerando cabeceras proxy.
- `request.ips()` — lista de IPs en cadena de proxies (de más a menos confiable).
- Puedes configurar trusted proxies en `config/app.ts` con `http.trustProxy`.

***

## Content Negotiation

- `request.types()`, `request.languages()`, `request.encodings()`, `request.charset()` analizan el `Accept` de la petición.
- `request.accepts([...types])` retorna tipo preferido o `null`.

***

## Request ID

- Puedes habilitar generación automática de un request id único en `config/app.ts` bajo `generateRequestId: true`.
- ID disponible con `request.id()`, que también se añade al logger.

***

## Extender la clase Request

- Puedes agregar properties o métodos vía macros o getters.
- Ejemplo:

```ts
Request.macro('customMethod', function() {
  return 'custom'
})
```

- Es necesario extender tipos con declaración (`declare module '@adonisjs/core/http'`).

***

¿Quieres el contenido formateado y listo para descargar como archivo markdown? Indica cómo prefieres la estructura.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/basics/request

