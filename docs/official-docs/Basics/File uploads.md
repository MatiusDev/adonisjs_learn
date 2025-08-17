<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [File uploads (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/file-uploads)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **File uploads (Basics)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# File uploads (Basics) | AdonisJS Documentation

> Fuente oficial: [File uploads (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/file-uploads)

***

## Soporte a uploads en AdonisJS

- Soporte *first-class* para archivos enviados vía `multipart/form-data`.
- Archivos procesados automáticamente con el bodyparser y almacenados temporalmente en el directorio `tmp` del sistema.
- En los controllers puedes validar y mover archivos a ubicaciones persistentes o servicios cloud (como S3).

***

## Acceso a archivos subidos

- Archivos individuales:

```js
const avatar = request.file('avatar')
```

- Arrays de archivos (input múltiple):

```js
const docs = request.files('documents')
for (let doc of docs) { console.log(doc) }
```


***

## Validación manual

- Puedes validar archivos usando opciones en `request.file` e inspeccionar `file.isValid` y `file.errors`:

```js
const avatar = request.file('avatar', { size: '2mb', extnames: ['jpg', 'png'] })
if (!avatar.isValid) {
  return response.badRequest({ errors: avatar.errors })
}
```

- Para arrays:

```js
const docs = request.files('documents', { size: '2mb', extnames: ['jpg', 'png', 'pdf'] })
const invalid = docs.filter(doc => !doc.isValid)
if (invalid.length) {
  return response.badRequest({ errors: invalid.map(d => ({ name: d.clientName, errors: d.errors })) })
}
```


***

## Validación con validator

- Puedes validar archivos junto con otros datos en un validator VineJS:

```js
import vine from '@vinejs/vine'
export const updateAvatarValidator = vine.compile(
  vine.object({
    avatar: vine.file({ size: '2mb', extnames: ['jpg', 'png', 'pdf'] })
  })
)
```

En controlador:

```js
const { avatar } = await request.validateUsing(updateAvatarValidator)
```

- Para arrays de archivos:

```js
export const createInvoiceValidator = vine.compile(
  vine.object({
    documents: vine.array(
      vine.file({ size: '2mb', extnames: ['jpg', 'png', 'pdf'] })
    )
  })
)
```


***

## Mover archivos a persistencia

- Por defecto, los archivos están en `tmp`, potencialmente eliminados por el SO.
- Usa `file.move(destino)` para mover y con `cuid` para nombre único:

```js
import { cuid } from '@adonisjs/core/helpers'
await avatar.move(app.makePath('storage/uploads'), {
  name: `${cuid()}.${avatar.extname}`
})
```

- Guarda el filename en la base de datos para su manejo futuro.

***

## Propiedades de MultipartFile

| Propiedad | Descripción |
| :-- | :-- |
| fieldName | Nombre del input HTML |
| clientName | Nombre original del archivo |
| size | Tamaño en bytes |
| extname | Extensión |
| errors | Array de errores |
| type | Mime type principal |
| subtype | Mime sub-tipo |
| filePath | Ruta absoluta tras move() |
| fileName | Nuevo nombre tras move() |
| tmpPath | Ruta temporal en /tmp |
| meta | Metadata clave-valor |
| validated | Boolean si fue validado |
| isValid | Boolean si son válidos según las reglas |
| hasErrors | Boolean si tiene errores |


***

## Servir archivos subidos

- Usa una ruta con wildcard y `response.download`.
- Protege de path traversal con una regex:

```js
router.get('/uploads/*', ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  // Validar path traversal...
  const absolutePath = app.makePath('uploads', normalizedPath)
  return response.download(absolutePath)
})
```


***

## Usar Drive para uploads y descargas

- Drive provee una abstracción de filesystem unificada, soportando local y cloud.
- Recomendado usarlo sobre manejo manual de archivos.

***

## Procesamiento avanzado (manual) de multipart

- Puedes desactivar el auto-process y leer el stream tú mismo, útil para casos avanzados como subir a servicios externos.
- Configura en `config/bodyparser.ts`:

```js
multipart: { autoProcess: false, processManually: ['/ruta'] }
```

- Ejemplo básico usando `pipeline` de node:

```js
request.multipart.onFile('*', {}, async (part, reporter) => {
  part.pause()
  part.on('data', reporter)
  await pipeline(part, createWriteStream(filePath))
})
await request.multipart.process()
```

- Puedes validar streams pasando options y escuchando el evento `data`.

***

¿Quieres este contenido en archivo `.md` o alguna adaptación especial para tu sistema de IA? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/basics/file-uploads

