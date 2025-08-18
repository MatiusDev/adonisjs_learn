<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [SVG icons (Digging deeper) | Edge Documentation](https://edgejs.dev/docs/edge-iconify)

Aquí tienes la traducción fiel y completa del contenido sobre integración con SVG e Iconify en Edge, respetando estructura y ejemplos originales:

***

# Iconos SVG (vía Iconify)

Edge tiene una integración oficial para renderizar iconos usando Iconify. Iconify cuenta con más de 100 colecciones de iconos open source que puedes usar mediante una API unificada.

## Instalación

La integración entre Edge e Iconify es un plugin que debes instalar desde el registro de npm.

```bash
npm i edge-iconify
```

El siguiente paso es registrar el plugin en Edge.

```js
import { Edge } from 'edge.js'
import { edgeIconify } from 'edge-iconify'

const edge = Edge.create()

/**
 * Registrar el plugin
 */
edge.use(edgeIconify)
```


### Instalando paquetes de iconos Iconify

Antes de poder renderizar iconos, debes instalar los paquetes de iconos de Iconify. Iconify ofrece varios bundles de distribución, pero la integración de Edge funciona solo con colecciones en JSON.

Instalemos y usemos el set de iconos HeroIcons.

```bash
npm i @iconify-json/heroicons
```

```js
import { Edge } from 'edge.js'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as heroIcons } from '@iconify-json/heroicons'

/**
 * Agregar la colección heroIcons
 */
addCollection(heroIcons)

const edge = Edge.create()

/**
 * Registrar el plugin
 */
edge.use(edgeIconify)
```


***

## Uso

Una vez completada la configuración, puedes renderizar iconos usando la etiqueta

`@svg`. Esta acepta el identificador del icono y un set opcional de atributos para el elemento SVG resultante.

```edge
@svg('heroicons:arrow-left-solid')
```

Salida:

```html
<svg width="1em" height="1em" viewBox="0 0 24 24">
  <path fill="currentColor" fill-rule="evenodd" d="M11.03 3.97..." clip-rule="evenodd"></path>
</svg>
```

En el siguiente ejemplo definimos ancho, alto y color personalizados para el icono:

```edge
@svg('heroicons:arrow-left-solid', {
  width: 40,
  height: 40,
  color: 'purple'
})
```

Salida:

```html
<svg width="40" height="40" viewBox="0 0 24 24" color="purple">
  <path fill="currentColor" fill-rule="evenodd" d="M11.03 3.97..." clip-rule="evenodd"></path>
</svg>
```


***

### Renderizado en línea dentro del marcado

Puedes usar el helper global

`svg` para renderizar iconos SVG junto al texto plano (sin salto de línea).

```html
<button> {{ svg('heroicons:archive-box') }} Eliminar publicación <button>
```


***

## Encontrar el identificador del icono

Puedes ver los iconos disponibles desde el navegador de sets de Iconify:

- Selecciona el set de iconos que estás usando.
- Busca el icono que deseas.
- Haz clic y copia el identificador que aparece al lado de la vista previa.

***

## Encontrar e instalar bundles de iconos

Actualmente, Iconify no tiene una guía detallada para instalar sus colecciones JSON. Puedes usar la siguiente tabla para consultar las colecciones y el nombre del paquete npm.

La tabla siguiente se ha extraído del archivo collections.json de Iconify.

***

Listo para generar el archivo descargable cuando lo solicites.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/edge-iconify

