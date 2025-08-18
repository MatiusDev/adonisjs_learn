<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Drive (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/drive)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Drive (Digging deeper)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Drive (Digging deeper) | AdonisJS Documentation

> Fuente oficial: [Drive (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/drive)

***

## ¿Qué es Drive?

- Es un wrapper sobre [FlyDrive](https://flydrive.dev), que proporciona una API unificada para interactuar con el filesystem local o servicios de cloud storage (S3, R2, GCS, etc.).
- Permite administrar archivos de usuario o contenido estático de forma transparente, cambiando el backend solo por configuración.

***

## Instalación y configuración

```bash
node ace add @adonisjs/drive
```

- Provider en `adonisrc.ts`.
- Crea y configura `config/drive.ts` – define servicios/discos: local, S3, spaces, etc.

```js
import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig, services } from '@adonisjs/drive'
export default defineConfig({
  default: env.get('DRIVE_DISK'),
  services: {
    fs: services.fs({
      location: app.makePath('storage'),
      serveFiles: true,
      routeBasePath: '/uploads',
      visibility: 'public',
    }),
    spaces: services.s3({
      credentials: {
        accessKeyId: env.get('SPACES_KEY'),
        secretAccessKey: env.get('SPACES_SECRET'),
      },
      region: env.get('SPACES_REGION'),
      bucket: env.get('SPACES_BUCKET'),
      endpoint: env.get('SPACES_ENDPOINT'),
      visibility: 'public',
    }),
  }
})
```

- Las credenciales se guardan en `.env` y se selecciona el disco default con `DRIVE_DISK`.

***

## Uso típico

- Para cargar archivos de usuario y manipularlos:

```js
import { cuid } from '@adonisjs/core/helpers'
import drive from '@adonisjs/drive/services/main'
import router from '@adonisjs/core/services/router'

router.put('/me', async ({ request, response }) => {
  const image = request.file('avatar', { size: '2mb', extnames: ['jpeg','jpg','png'] })
  if (!image) return response.badRequest({ error: 'Image missing' })

  const key = `uploads/${cuid()}.${image.extname}`
  await image.moveToDisk(key)
  return { message: 'Image uploaded', url: image.meta.url }
})
```

- `moveToDisk` mueve el archivo con nombre único al storage seleccionado y genera la URL.

***

## Operaciones Drive avanzadas

- Cambiar de disco: `drive.use('spaces')`
- Métodos disponibles:

```js
await disk.put(key, value)
await disk.get(key)
await disk.getStream(key)
await disk.delete(key)
await disk.copy(source, destination)
await disk.move(source, destination)
await disk.putStream(key, stream)
await disk.copyFromFs(source, destination)
await disk.moveFromFs(source, destination)
```


***

## Configuración extra para filesystem local

- Opción `serveFiles: true` habilita servir archivos desde una ruta en AdonisJS.
- Opción `routeBasePath` define el path base (ej: `/uploads`).
- Opción `visibility`: público o privado.
- Opción `appUrl`: para URLs absolutas.

***

## Helpers en Edge

- Usa helpers async en plantillas para URLs o links de descarga:

```edge
<img src="{{ await driveUrl(user.avatar) }}" />
<a href="{{ await driveSignedUrl(invoice.key, { expiresIn: '30 mins' }) }}">Download</a>
```


***

## Fakes para testing

- Faker API permite simular un disco en tests (utiliza `./tmp/drive-fakes`).
- Ejemplo:

```js
import drive from '@adonisjs/drive/services/main'

test.group('Users | update', () => {
  test('should update my avatar', async ({ client, cleanup }) => {
    const fakeDisk = drive.fake('spaces')
    cleanup(() => drive.restore('spaces'))
    // ... lógica de test (subida de archivos) ...
    fakeDisk.assertExists(user.avatar)
  })
})
```


***

¿Quieres este contenido como archivo `.md` o estructurado para tu sistema de documentación/IA? Indícalo.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/digging-deeper/drive

