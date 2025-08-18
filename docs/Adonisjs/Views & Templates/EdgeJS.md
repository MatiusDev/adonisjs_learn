<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [EdgeJS (Views \& Templates) | AdonisJS Documentation](https://docs.adonisjs.com/guides/views-and-templates/edgejs)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **EdgeJS (Views \& Templates)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# EdgeJS (Views \& Templates) | AdonisJS Documentation

> Fuente oficial: [EdgeJS (Views \& Templates) | AdonisJS Documentation](https://docs.adonisjs.com/guides/views-and-templates/edgejs)

***

## ¿Qué es EdgeJS?

- Motor de plantillas simple, moderno y completo para Node.js, creado y mantenido por el equipo de AdonisJS.
- Sintaxis inspirada en JavaScript; si sabes JS, sabes Edge.
- Documentación principal: https://edgejs.dev

***

## Instalación y configuración

```bash
node ace add edge
```

- Agrega el provider en `adonisrc.ts`:

```js
providers: [
  // ...otros providers
  () => import('@adonisjs/core/providers/edge_provider'),
]
```


***

## Renderizar tu primer template

1. Crea una vista:

```bash
node ace make:view welcome
```

Esto crea `resources/views/welcome.edge`.
2. Ejemplo de contenido:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>
  <h1>
   Hello world from {{ request.url() }} endpoint
  </h1>
</body>
</html>
```

3. Añade una ruta que renderiza la vista:

```js
import router from '@adonisjs/core/services/router'

router.get('/', async ({ view }) => {
  return view.render('welcome')
})

// O directamente:
router.on('/').render('welcome')
```

4. Pasar datos a la vista:

```js
router.get('/', async ({ view }) => {
  return view.render('welcome', { username: 'romainlanz' })
})
```


***

## Personalización y plugins

- Puedes cargar plugins y helpers globales en archivos de preload (`start/view.ts`, por ejemplo):

```js
import edge from 'edge.js'
import env from '#start/env'
import { edgeIconify } from 'edge-iconify'

edge.use(edgeIconify)
edge.global('appUrl', env.get('APP_URL'))
```


***

## Helpers globales

- Edge y AdonisJS ofrecen numerosos helpers listados en la documentación de helpers (ver guía correspondiente).

***

¿Necesitas este contenido como archivo `.md` o en otro formato para tu sistema de conocimiento/IA? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/views-and-templates/edgejs

