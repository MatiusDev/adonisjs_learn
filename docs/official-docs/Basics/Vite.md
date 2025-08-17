<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Vite (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/vite)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Vite (Basics)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Vite (Basics) | AdonisJS Documentation

> Fuente oficial: [Vite (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/vite)

***

## ¿Cómo funciona la integración con Vite en AdonisJS?

- AdonisJS integra Vite nativamente para el bundling y desarrollo de assets frontend.
- Incluye:
    - Servidor de desarrollo Vite embebido/proxy.
    - Plugin oficial de Vite para AdonisJS (con helpers para Edge).
    - Runtime API para SSR.
- Todo el tráfico de assets requerido es manejado por AdonisJS, tanto en dev como producción.

***

## Instalación y configuración

1. Requiere:
    - `@adonisjs/core >=6.9.1`
    - `@adonisjs/assembler >=7.7.0`
2. Instala y configura:

```bash
node ace add @adonisjs/vite
```

Esto:
    - Instala `@adonisjs/vite` y `vite`.
    - Registra el provider en `adonisrc.ts`.
    - Crea archivos de config: `vite.config.ts` y `config/vite.ts`.
    - Crea entrypoint frontend: `resources/js/app.js`.

En `adonisrc.ts`:

```js
export default defineConfig({
  assetsBundler: false,
  hooks: {
    onBuildStarting: [() => import('@adonisjs/vite/build_hook')],
  },
})
```


***

## Configuración

- **vite.config.ts**: config Vite estándar, usa el plugin de AdonisJS.

```js
import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  plugins: [
    adonisjs({
      entrypoints: ['resources/js/app.js'],
      reload: ['resources/views/**/*.edge'],
    }),
  ],
})
```

    - Puedes configurar varios entrypoints, reload patterns, y assetsUrl para deploy en CDN.
- **config/vite.ts**: config backend para rutas generadas de assets.

```js
export default defineConfig({
  buildDirectory: 'public/assets',
  assetsUrl: '/assets',
  scriptAttributes: { defer: true },
  styleAttributes: { 'data-turbo-track': 'reload' },
})
```


***

## Organización de assets frontend

- Se recomienda ubicar todos los assets bajo `resources/` y separar por tipo (`css/`, `js/`, etc).
- Vite genera la salida en `public/assets`.

***

## Uso en desarrollo

- Inicia el servidor normalmente:

```bash
node ace serve --hmr
```

- AdonisJS se encarga de proxy y recarga en desarrollo.

***

## Renderizado de assets y helpers en Edge

- Inserta tags de scripts/styles con:

```edge
@vite(['resources/js/app.js'])
```

- Se recomienda importar CSS desde JS para un solo entrypoint.
- Para assets referenciados solo en plantillas usa el helper:

```edge
<link rel="stylesheet" href="{{ asset('resources/css/app.css') }}">
```

    - En dev: apunta al dev server Vite.
    - En prod: apunta al asset bundle final.

***

## Incluir assets externos en el bundle Vite

- Para que Vite procese assets referenciados solo en Edge:

```js
import.meta.glob(['../images/**'])
```

(en tu entrypoint JS)

***

## Configuración de TypeScript frontend

- Crea un `tsconfig.json` dentro de `resources/` para ajustes específicos de frontend/TSX.

***

## React HMR y otros frameworks

- Usa el tag:

```edge
@viteReactRefresh()
@vite(['resources/js/app.js'])
```

- Agrega el plugin React en Vite si usas React.

***

## Deploy y CDN

- Define `assetsUrl` en las configuraciones si los bundles se servirán vía CDN.

***

## Avanzado: modo middleware

- Desde la versión 3.x, Vite está embebido y se maneja vía middleware, permitiendo SSR y gestión centralizada.

***

## Manifest y generación de URLs

- El archivo manifest generado por Vite se utiliza para mapear assets en Edge y helpers (`asset`, `@vite`).

***

¿Quieres este contenido como archivo `.md` o alguna estructura especial para tu sistema de conocimientos IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/basics/vite

