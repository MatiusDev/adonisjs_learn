<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Response (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/response)

Aquí tienes el contenido de la página oficial "Response (Basics)" de AdonisJS formateado para conocimiento base de IA.

***

# Response (Basics) | AdonisJS Documentation

## Introducción

La instancia `response` se utiliza para responder a las solicitudes HTTP, permitiendo enviar contenido en HTML, JSON, streams y más. Se accede mediante `ctx.response`.

## Enviar respuestas

- Retornar valor desde el handler es suficiente:

```js
router.get('/', () => 'Hello world')
router.get('/', () => ({ hello: 'world' }))  // JSON
```

- También puedes usar explícitamente `response.send()`:

```js
response.send('Hello world')
response.send({ hello: 'world' })
```

- Al llamar `send` múltiples veces se sobreescribe el contenido anterior.
- Puedes establecer el código HTTP con `response.status(200)`


## Contenido por streaming

- `response.stream()` permite enviar streams al cliente.
- No se configuran automáticamente cabeceras `content-type` ni `content-length`.
- Puedes proveer un callback para errores en streaming que devuelva `[mensaje, estado]`


## Descarga de archivos

- Recomendado usar `response.download(path)` que maneja cabeceras y errores automáticamente.
- Puedes generar ETag para facilitar cache.
- Ejemplo:

```js
response.download(filePath, true, (error) => {
  if (error.code === 'ENOENT') return ['File not found', 404]
})
```

- Para forzar descarga, usa `response.attachment(filePath, filename)`


## Manipulación de status y cabeceras

- `response.status(code)` asigna status HTTP (sobrescribe).
- `response.safeStatus(code)` asigna solo si no está asignado.
- `response.header(name, value)` agrega/modifica cabecera.
- `response.safeHeader(name, value)` solo si no existe.
- Puedes usar `response.append(name, value)` para agregar valores a cabecera existente.
- `response.removeHeader(name)` elimina cabecera.


## Redirecciones

- `response.redirect()` inicia un redireccionamiento.
- Puedes usar:
    - `.toPath(path)` para redirección a URL estática.
    - `.toRoute(routeName, params)` para redirección por nombre de ruta.
    - `.back()` para redirigir a la página anterior.
- Se puede usar `.status(code)` para cambiar el código HTTP.
- Añade query string con `.withQs(obj)` o `.withQs()` para pasar la query actual.


## Abortando peticiones

- `response.abort(message, status = 400)` detiene la petición lanzando excepción HTTP abortada.


## Eventos y Node.js response

- Escucha fin de respuesta con `response.onFinish(callback)` para limpieza.
- Accede al objeto Node.js `res` via `response.response`.


## Serialización de cuerpo de la respuesta

- Adonis serializa automáticamente el cuerpo enviado con `send()`.
- Reglas:
    - Objetos y Arrays: JSON.stringify seguro con manejo de ciclos y BigInt
    - String, Number, Boolean: conversión a texto
    - Date: conversión a ISO string
    - RegExp y Errores: conversión a string
- Extiende el `content-type` automáticamente según contenido (e.g. JSON, HTML, JS, texto)


## Extender Response

- Usa macros y getters para extender:

```ts
Response.macro('customMethod', function() { ... })
Response.getter('customProperty', function() { ... })
```

- Declara tipados en TS con declaración de módulos.

***

¿Quieres este contenido listo para descargar? O, ¿prefieres otro formato? Indícame.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/basics/response

