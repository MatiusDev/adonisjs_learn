<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo para [https://edgejs.dev/docs/getting\_started](https://edgejs.dev/docs/getting_started)

Aquí tienes la traducción fiel del contenido solicitado, manteniendo la estructura y ejemplos tal como están en la página para que puedas descargarlo.

***

# Comenzando

Si vas a instalar Edge dentro de una aplicación AdonisJS, te recomendamos leer la guía de Vista \& Plantillas de AdonisJS.

Puedes instalar Edge en un proyecto Node.js existente desde el registry de paquetes npm.

Edge es un paquete solo ESM, por lo cual tus aplicaciones deben usar módulos ES para importarlo.

```
npm i edge.js
```

Puedes comenzar a usar Edge tan pronto como lo instales. No necesitas ningún compilador o herramientas de construcción para compilar las plantillas.

Comencemos con la siguiente estructura de proyecto. Guardaremos las plantillas dentro del directorio

`views` y las renderizaremos durante una solicitud HTTP.

```
├── views
│   └── home.edge
├── index.js
└── package.json
```

```
import { Edge } from 'edge.js'
import { createServer } from 'node:http'

const edge = Edge.create()
edge.mount(new URL('./views', import.meta.url))

const server = createServer(async (req, res) => {
  const data = { username: 'virk' }
  const html = await edge.render('home', data)
  res.setHeader('content-type', 'text/html')
  res.end(html)
})

server.listen(3000)
```

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <h1>
      Hello {{ username }}
    </h1>
  </body>
</html>
```

Vamos línea por línea por el código fuente.

Empezamos importando el paquete

`edge.js` y creamos un servidor HTTP simple con Node.js.

Usamos el método

`edge.mount` para registrar el directorio

`views` como la URL raíz para nuestras plantillas. Los archivos de plantilla terminan con la extensión

`.edge`.

Finalmente, usamos el método

`edge.render` para renderizar una plantilla durante una solicitud HTTP. El método render acepta la ruta de la plantilla (sin la extensión) y el objeto de datos que se compartirá con la plantilla.

## Caché de plantillas

Las plantillas se recompilan cada vez que llamas al método

`edge.render`. Puedes verificarlo editando el archivo

`home.edge` y refrescando el navegador para ver el nuevo resultado.

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <h1>
      Hello {{ username.toUpperCase() }}
    </h1>
  </body>
</html>
```

Debes habilitar el modo caché en producción para evitar recompilar las plantillas. La salida compilada se guardará en memoria.

```
const edge = Edge.create({
  cache: process.env.NODE_ENV === 'production'
})
```


## Montando discos

EdgeJS utiliza el concepto de discos para encontrar y renderizar plantillas desde el sistema de archivos local. Puedes registrar un disco por defecto y varios discos nombrados para buscar plantillas.

En el siguiente ejemplo, registramos el directorio

`views` como disco por defecto para buscar plantillas.

```
const BASE_URL = new URL('./', import.meta.url)
edge.mount(new URL('views', BASE_URL))

/**
 * Renderiza el archivo home.edge desde el directorio
 * {BASE_URL/views}
 */
await edge.render('home')

/**
 * Renderiza el archivo pages/posts/index.edge desde el directorio
 * {BASE_URL/views}
 */
await edge.render('pages/posts/index')
```

También puedes montar varios discos nombrados, lo cual es útil si tienes un sistema de temas y quieres alternar entre temas.

```
const BASE_URL = new URL('./', import.meta.url)
edge.mount(
  'elegant',
  new URL('themes/elegant', BASE_URL)
)

edge.mount(
  'classic',
  new URL('themes/classic', BASE_URL)
)

edge.mount(
  'mono',
  new URL('themes/mono', BASE_URL)
)
```

Ahora puedes renderizar plantillas anteponiendo el nombre del disco antes del camino de la plantilla. Por ejemplo:

```
await edge.render('classic::home')
await edge.render('mono::pages/posts/index')
```


## Plantillas en memoria

Puedes registrar plantillas que se mantienen en memoria usando el método

`.registerTemplate()`. Acepta un nombre único para la plantilla como primer argumento y el contenido de la plantilla mediante el parámetro de opciones.

```
edge.registerTemplate('uikit.button', {
  template: `<button {{
    $props.except(['text']).toAttrs()
  }}>
    {{ text }}
  </button>`
})
```

Ahora puedes referenciar la plantilla anterior como componente dentro de cualquier otra plantilla.

```
@!component('uikit.button', {
  text: 'Submit',
  type: 'submit',
  class: ['btn', 'btn-primary'],
  disabled: false,
})
```


## API de renderizado

Puedes renderizar plantillas de EdgeJS usando uno de los siguientes métodos.

### render

El método

`render` acepta la ruta de la plantilla relativa a la raíz del disco y un objeto de datos opcional para compartir con la plantilla.

El valor de retorno es una cadena con la salida de la plantilla renderizada.

```
const html = await edge.render('home')
console.log(html)
```


### renderSync

El método

`renderSync` es similar a

`render`. Sin embargo, utiliza APIs síncronas para leer y renderizar los archivos de plantilla.

Se recomienda usar el método

`render` sobre

`renderSync`.

```
const html = edge.renderSync('home')
console.log(html)
```


### renderRaw

El método

`renderRaw` te permite renderizar texto sin procesar como una plantilla.

```
const template = `
  <h1> Hello {{ username || 'Guest' }}! </h1>
`
await edge.renderRaw(template, { username: 'virk' })
```


### renderRawSync

El método

`renderRawSync` es igual que

`renderRaw` pero usa APIs síncronas.

```
const template = `
  <h1> Hello {{ username || 'Guest' }}! </h1>
`
edge.renderRawSync(template, { username: 'virk' })
```


## Palabras reservadas

El funcionamiento interno de la plantilla compilada depende de las siguientes variables, y no debes definirlas como estado dentro de la plantilla.

`template`

`$context`

`state`

`$filename`

***

Ahora procederé a generar el archivo descargable con toda la traducción.
<span style="display:none">[^1][^2]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/getting

[^2]: https://edgejs.dev/docs/getting_started

