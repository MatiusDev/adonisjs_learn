<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Helpers (Digging deeper) | Edge Documentation](https://edgejs.dev/docs/helpers)

Aquí tienes la traducción fiel y completa sobre los helpers en Edge, respetando la estructura y ejemplos originales:

***

# Helpers

A continuación, la lista de helpers globalmente disponibles en las plantillas Edge.

## html.classNames

El método helper

`html.classNames` se usa para serializar un arreglo de clases a una cadena. El arreglo puede contener strings o objetos con clases condicionales. Por ejemplo:

```html
<input class="{{
  html.classNames([
    'input',
    {
      'input-error': false,
      'input-disabled': true,
      'input-large': size === 'large',
      'input-medium': size === 'medium',
      'input-rounded': true
    },
  ])
}}" />
```

Si el valor de

`size` es

`medium`, el HTML generado será:

```html
<input class="input input-disabled input-medium input-rounded" />
```


***

## html.attrs

El helper

`html.attrs` convierte un objeto en atributos HTML. Por ejemplo:

```html
<input {{
  html.attrs({
    id: 'name',
    placeholder: 'Escribe tu nombre',
    value: user.name
  })
}} />
```

Si el valor de

`user.name` es

`null`, el HTML generado será:

```html
<input id="name" placeholder="Escribe tu nombre" />
```

El valor de cada atributo debe ser un **string**, **booleano**, o un **arreglo de strings**. Si el valor es

`undefined`,

`null`,

`false` o una cadena vacía, el atributo se elimina de la salida.


| Valor | Salida serializada |
| :-- | :-- |
| string | Se serializa tal como está en la salida |
| string[] | Los valores se concatenan por coma o espacio, depende del atributo |
| false/null/undefined | El atributo se elimina de la salida |
| true | Depende del atributo, se serializa a string o solo se define el atributo |

### Serialización del atributo class

El método

`html.attrs` presta atención especial al atributo

`class`. Puede ser string, arreglo de strings u objeto.

Internamente utiliza el método

`html.classNames` para serializar los atributos

`class`.

```html
<input {{
  html.attrs({
    class: [
      'input',
      'input-large',
      {
        'input-error': hasError
      }
    ],
  })
}} />
```

Salida:

```html
<!-- hasError = false -->
<input class="input input-large" />

<!-- hasError = true -->
<input class="input input-large input-error" />
```


***

## nl2br

Convierte saltos de línea en etiquetas HTML

`<br />`. Como el helper

`nl2br` retorna una cadena HTML (con etiquetas `<br />`), debes usar triple llave para renderizar el HTML tal como es.

```html
{{{ nl2br(post.content) }}}
```

Si quieres escapar el contenido dado a

`nl2br`, puedes envolverlo con el método

`html.escape`.

En el ejemplo siguiente, las etiquetas `<br />` no serán escapadas, pero el contenido sí.

```html
{{{
  nl2br(
    html.escape(post.content)
  )
}}}
```


***

## html.escape

Escapa el HTML dentro de una cadena. Las dobles llaves ya escapan el valor, así que usa este método solo cuando uses las llaves triples.

```html
{{{ html.escape(post.content) }}}
```


***

## truncate

Trunca una cadena a un número dado de caracteres. Por ejemplo:

```html
{{
  truncate(
    'Esta es una oración muy larga que me gustaría acortar',
    18
  )
}}
<!-- Salida: Esta es una oración... -->
```

El método

`truncate` no corta palabras a la mitad; permite que se completen. Puedes desactivar este comportamiento con la opción

`completeWords`.

```html
{{
  truncate(
    'Esta es una oración muy larga que me gustaría acortar',
    18,
    { completeWords: false }
  )
}}
<!-- Salida: Esta es una oraci... -->
```

También puedes definir un sufijo personalizado para la cadena truncada.

```html
{{
  truncate(
    'Esta es una oración muy larga que me gustaría acortar',
    18,
    { suffix: ' [Leer más]' }
  )
}}
<!-- Salida: Esta es una oración [Leer más] -->
```


***

## excerpt

El método

`excerpt` es similar a

`truncate`. Sin embargo, este método elimina primero las etiquetas HTML, trunca la cadena y retorna texto plano. Es útil para generar un extracto de contenido HTML.

```html
{{
  excerpt(
    '<p>Hola, esto es un <strong>post</strong> de ejemplo</p>',
    20
  )
}}
<!-- Salida: Hola, esto es un post... -->
```

Puedes desactivar la opción

`completeWords` para un truncado estricto.

```html
{{
  excerpt(
    '<p>Hola, esto es un <strong>post</strong> de ejemplo</p>',
    20,
    { completeWords: false }
  )
}}
<!-- Salida: Hola, esto es un po... -->
```

También puedes definir un sufijo personalizado.

```html
{{
  excerpt(
    '<p>Hola, esto es un <strong>post</strong> de ejemplo</p>',
    20,
    { suffix: ' [Leer más]' }
  )
}}
<!-- Salida: Hola, esto es un post [Leer más] -->
```


***

## inspect

Puedes usar el método

`inspect` para mostrar de forma legible un valor con fines de depuración. El helper retorna HTML, el cual debes ver en el navegador para mejor lectura.

```html
{{
  inspect({
    a: 1,
    b: [3, 4, undefined, null],
    c: undefined,
    d: null,
    e: {
      regex: /^x/i,
      buf: Buffer.from('abc'),
    },
    balance: BigInt(100),
    id: Symbol('1234'),
    scores: new Set([1, 2, 3]),
    classes: new Map([['english', '1st'], ['maths', '2nd']]),
    currentScores: new WeakSet([[1, 2, 3]]),
    currentClasses: new WeakMap([[['english', '1st'], ['maths', '2nd']]]),
    now: new Date()
  })
}}
```


***

## Cambiar mayúsculas/minúsculas

Puedes usar uno de los siguientes métodos para transformar el formato de una cadena:

```html
{{ camelCase('hola-mundo') }} // Salida: holaMundo
{{ snakeCase('hola-mundo') }} // Salida: hola_mundo
{{ dashCase('HolaMundo') }} // Salida: hola-mundo
{{ pascalCase('hola-mundo') }} // Salida: HolaMundo
{{ capitalCase('hola-mundo') }} // Salida: Hola-Mundo
{{ sentenceCase('hola-mundo') }} // Salida: Hola mundo
{{ dotCase('hola-mundo') }} // Salida: hola.mundo
{{ noCase('hola-mundo') }} // Salida: hola mundo
{{ titleCase('hola-mundo') }} // Salida: Hola-Mundo
```


***

Listo para generar tu archivo descargable cuando lo solicites.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/helpers

