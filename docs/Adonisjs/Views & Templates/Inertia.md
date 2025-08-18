<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Inertia (Views \& Templates) | AdonisJS Documentation](https://docs.adonisjs.com/guides/views-and-templates/inertia)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Inertia (Views \& Templates)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Inertia (Views \& Templates) | AdonisJS Documentation

> Fuente oficial: [Inertia (Views \& Templates) | AdonisJS Documentation](https://docs.adonisjs.com/guides/views-and-templates/inertia)

***

## ¿Qué es Inertia?

- Framework agnóstico para crear **aplicaciones SPA reales** con tu framework frontend favorito (Vue, React, Svelte, Solid) y sin “API separada”.
- Permite usar AdonisJS como backend y manejar rutas, autenticación, etc., en un monolito. El frontend actúa como SPA, pero todo el flujo de datos es directo, sin API REST explícita.

***

## Instalación y configuración básica

1. Instala y configura:

```bash
npm i @adonisjs/inertia
node ace configure @adonisjs/inertia
```

    - Registra provider, middleware y archivos base (`config/inertia.ts`, layout, entradas JS, etc.).
    - El layout usa Vite y la integración específica del frontend elegido (Vue, React, Svelte, Solid).
2. Asegúrate de tener los paquetes/plug-ins de Vite de tu framework frontend.
3. Agrega una ruta que use Inertia:

```js
router.get('/users', async ({ inertia }) => {
  const users = await User.all()
  return inertia.render('users/index', { users })
})
```

    - El primer argumento es el “path” al componente relativo a `inertia/pages`.
    - Los datos se pasan serializados como props al componente.

***

## Configuración de la plantilla raíz

- El layout raíz es Edge (`resources/views/inertia_layout.edge`), donde cargas tu entrypoint JS y usas los tags `@inertiaHead()` y `@inertia()`.
- Ejemplo:

```edge
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    @inertiaHead()
    @vite(['inertia/app/app.ts', `inertia/pages/${page.component}.vue`])
  </head>
  <body>
    @inertia()
  </body>
</html>
```

- Puedes customizar el layout desde `config/inertia.ts` (`rootView`).

***

## Compartir datos globales

- Define sharedData en el config para compartir info global (appName, usuario actual, etc):

```js
export default defineConfig({
  sharedData: {
    appName: 'Mi app',
    user: (ctx) => ctx.auth?.user,
  },
})
```

- También puedes usar `inertia.share` en middlewares.

***

## Props parciales y lazy evaluation

- Puedes pasar funciones/lazy props y usar `inertia.optional` para cargar sólo cuando el frontend lo pida (optimización).

***

## Enrutado dinámico y Testing

- Los tests pueden usar el cliente HTTP de Japa con helpers Inertia.

```js
const response = await client.get('/home').withInertia()
response.assertInertiaComponent('home/main')
response.assertInertiaProps({ user: { name: 'julien' } })
```


***

## SSR y Asset versioning

- Soporte SSR activable en el config, con entrypoint específico del servidor.
- Asset versioning integrado: Inertia gestiona el hash y asegura que el frontend siempre actualice assets.
- Habilita CSRF fácilmente usando `enableXsrfCookie` en Shield.

***

## Tips de tipado

- Puedes usar `InferPageProps` y `SharedProps` para tipar componentes frontend según lo que retorne tu controlador y las props compartidas.
- Recuerda usar `import type` para evitar que tipos del backend lleguen al bundle JS.

***

## FAQ destacada

- **¿Por qué recarga todo el server al editar frontend?**
Excluye la carpeta `inertia/**/*` de tu `tsconfig.json` raíz para que HMR funcione bien.

***

¿Quieres este contenido como archivo `.md` o adaptado a otro formato de documentación/IA? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/views-and-templates/inertia

