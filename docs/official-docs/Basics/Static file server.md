<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Static file server (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/static-file-server)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Static file server (Basics)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Static file server (Basics) | AdonisJS Documentation

> Fuente oficial: [Static file server (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/static-file-server)

***

## Servidor de archivos estáticos en AdonisJS

- El paquete `@adonisjs/static` permite servir archivos estáticos desde un directorio especificado.
- Provee un middleware que debe ser registrado en el stack de middlewares del servidor.

***

## Instalación y configuración básica

1. Instala el paquete:

```bash
node ace add @adonisjs/static
```

    - Registra el provider en `adonisrc.ts`.
    - Crea `config/static.ts`.
    - Registra el middleware en `start/kernel.ts`:

```js
server.use([() => import('@adonisjs/static/static_middleware')])
```


***

## Configuración en `config/static.ts`

```js
import { defineConfig } from '@adonisjs/static'

export default defineConfig({
  enabled: true,
  etag: true,
  lastModified: true,
  dotFiles: 'ignore'
})
```


### Propiedades clave:

- **enabled:** Habilita/deshabilita el middleware (sin quitarlo del stack).
- **etag:** Genera etag para mejorar caching.
- **lastModified:** Envía header `Last-Modified` usando la fecha de modificación del archivo.
- **dotFiles:**
    - `'ignore'` (default): archivos .dot no existen (404).
    - `'allow'`: se sirven como cualquier otro archivo.
    - `'deny'`: responde 403 si se solicita.


### Otras opciones:

- **acceptRanges:** Permite descargas reanudables (default: true).
- **cacheControl:** Habilita header `Cache-Control` (default: true).
- **immutable:** Activa directiva immutable en cache-control (requiere `maxAge`).
- **maxAge:** Duración de caché (`'30 mins'`, o ms).
- **headers:** Función para headers personalizados según ruta/archivo.

***

## ¿Cómo se sirven los archivos?

- Cualquier archivo en `/public` se puede acceder con la ruta relativa:
    - `public/css/style.css` → `http://localhost:3333/css/style.css`
- Los archivos en `/public` **no** son procesados por Vite ni otros bundlers.

***

## Archivos estáticos y producción

- Al usar `node ace build`, los archivos del directorio `/public` se copian automáticamente al folder final de producción `build/`.
- Esta regla viene definida en `adonisrc.ts`:

```js
metaFiles: [
  { pattern: 'public/**', reloadServer: false }
]
```


***

¿Quieres este contenido en archivo `.md` para importar o algún formato específico para tu sistema de documentación o IA? Indícalo en tu respuesta.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/basics/static-file-server

