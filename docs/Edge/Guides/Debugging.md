<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Debugging (Guides) | Edge Documentation](https://edgejs.dev/docs/debugging)

Aquí tienes la traducción completa y fiel del contenido sobre depuración (debugging) en Edge, respetando la estructura y los ejemplos originales:

***

# Depuración

Puedes depurar los valores o el estado de una plantilla utilizando uno de los siguientes métodos.

## Usando el helper inspect

Puedes usar el helper

`inspect` para mostrar un valor de manera legible junto al resto del marcado. El helper inspect retorna HTML, el cual debes visualizar en un navegador para mejor lectura.

```
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

Salida

## Usando la etiqueta debugger

La etiqueta

`debugger` escribe una sentencia debugger de JavaScript en el resultado compilado. Puedes ejecutar el servidor Node.js con la bandera

`--inspect` y usar las herramientas de desarrollo de Chrome para abrir una sesión de depuración.

```
@debugger
  <p> Hola {{ user.username }} </p>
```

```
node --inspect index.js
```


***

Listo para generar tu archivo descargable cuando lo solicites.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/debugging

