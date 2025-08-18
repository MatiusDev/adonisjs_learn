<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Creating custom tags (Digging deeper) | Edge Documentation](https://edgejs.dev/docs/creating-custom-tags)

Aquí tienes la traducción fiel y completa sobre la creación de etiquetas personalizadas en Edge, respetando estructura y ejemplos originales:

***

# Crear etiquetas personalizadas

La mayoría de las funciones de Edge están implementadas usando su API pública de etiquetas, que puedes emplear para ampliar las capacidades de Edge.

Al implementar una etiqueta personalizada, trabajarás con **Árboles de sintaxis abstracta (AST)**, así que tener conocimientos previos puede ayudarte.

Sin embargo, si estás comenzando con los AST, recomendamos visitar astexplorer.net, seleccionar `acorn` como analizador y experimentar con la herramienta. No necesitas saber todo sobre sintaxis abstracta; la mayoría lo aprenderás usando y experimentando.

En esta guía veremos:

- Crear y registrar una etiqueta personalizada en Edge.
- Introducción a analizar y re-imprimir AST.
- Implementación de una etiqueta condicional en Edge.
- Creación de variables con alcance local dentro de un bloque condicional.

***

## Registrando una etiqueta Edge

Una etiqueta debe implementar la interfaz

`TagContract` y puedes registrarla con el método

`edge.registerTag`.

Por ejemplo, crearemos una etiqueta llamada

`reverse` que escribe un saludo en la salida.

```js
import edge from 'edge.js'
import { TagContract } from 'edge.js/types'

/**
 * Definiendo la etiqueta
 */
const reverse: TagContract = {
  block: false,
  seekable: true,
  tagName: 'reverse',
  compile(parser, buffer, token) {
    buffer.outputRaw('Hola desde la etiqueta reverse')
  }
}

/**
 * Registrarla en Edge
 */
edge.registerTag(reverse)

/**
 * Usando la etiqueta
 */
const output = await edge.renderRaw('@reverse()')
console.log(output) // Hola desde la etiqueta reverse
```

- `block`: Crea una etiqueta de bloque que se usa con apertura y cierre (ej: `@if`, `@each`).
- `seekable`: La etiqueta acepta uno o más argumentos. Si nunca va a recibir argumentos, configúrala como `false`.
- `tagName`: Nombre único para la etiqueta.
- `compile`: Convierte la etiqueta en salida JavaScript. Aquí estarás la mayor parte del tiempo.

***

### Generando AST

Hagamos que la etiqueta

`reverse` acepte un valor de cadena y cree un AST de los argumentos recibidos.

```js
const reverse: TagContract = {
  block: false,
  seekable: true,
  tagName: 'reverse',
  compile(parser, buffer, token) {
    const expression = parser.utils.transformAst(
      parser.utils.generateAST(token.properties.jsArg, token.loc, token.filename),
      token.filename,
      parser
    )
    console.log(JSON.stringify(expression, null, 2))
  }
}
```

Ahora prueba pasando diferentes valores a la etiqueta

`@reverse` y observa el output en consola del AST.

#### Cadena de texto

```edge
@reverse('hola mundo')
```

```json
{
  "type": "Literal",
  "value": "hola mundo",
  ...
}
```


#### Referencia a variable

```edge
@reverse(username)
```

```json
{
  "type": "MemberExpression",
  "object": { "type": "Identifier", "name": "state" },
  "property": { "type": "Identifier", "name": "username" },
  ...
}
```


#### Llamada de función

```edge
@reverse(getUserName())
```

```json
{
  "type": "CallExpression",
  ...
  "callee": {
    "type": "MemberExpression",
    "object": { "type": "Identifier", "name": "state" },
    "property": { "type": "Identifier", "name": "getUserName" }
  },
  ...
}
```

Como puedes notar, el AST varía según el valor de entrada de la etiqueta

`@reverse`. Puedes usar

`expression.type` para permitir o impedir ciertos tipos y también modificar el AST si lo necesitas.

***

### Convertir AST a cadena

Una vez que modifiques el AST, puedes convertirlo a una expresión JavaScript usando el método

`.stringify()`.

```js
const reverse: TagContract = {
  ...
  compile(parser, buffer, token) {
    const expression = parser.utils.transformAst(
      parser.utils.generateAST(token.properties.jsArg, token.loc, token.filename),
      token.filename,
      parser
    )
    console.log(parser.utils.stringify(expression))
  }
}
```


***

### Terminando la implementación de la etiqueta reverse

Finalicemos la implementación de la etiqueta

`reverse`. Tomaremos el argumento dado, invertiremos la cadena y la escribiremos en la salida.

```js
const reverse: TagContract = {
  block: false,
  seekable: true,
  tagName: 'reverse',
  compile(parser, buffer, token) {
    const expression = parser.utils.transformAst(
      parser.utils.generateAST(token.properties.jsArg, token.loc, token.filename),
      token.filename,
      parser
    )
    const outputExpression = `${parser.utils.stringify(expression)}.split("").reverse().join("")`
    buffer.outputExpression(outputExpression, token.filename, token.loc.start.line, false)
  }
}
```

Probemos la implementación.

```js
// Con cadena directa
assert.equal(await edge.renderRaw(`@reverse('virk')`), 'kriv')

// Con referencia a variable
assert.equal(await edge.renderRaw(`@reverse(username)`, { username: 'virk' }), 'kriv')

// Con llamada de función
assert.equal(await edge.renderRaw(`@reverse(getUserName())`, { getUserName() { return 'virk' } }), 'kriv')
```


***

## Crear una etiqueta condicional

Subamos la dificultad e implementemos una etiqueta condicional personalizada para mostrar notificaciones.

La etiqueta

`@notification` acepta el tipo de notificación y renderiza el contenido dentro del bloque solo si existe una notificación de ese tipo. Por ejemplo:

```edge
@notification('success')
  <div class="alert alert-{{ notification.type }}">
    <p>{{ notification.message }}</p>
  </div>
@end
```

Internamente, la etiqueta buscará el objeto

`notifications` dentro del estado de la plantilla.

```js
import edge from 'edge.js'
import { TagContract } from 'edge.js/types'

const notification: TagContract = {
  /**
   * La etiqueta acepta contenido entre apertura y cierre
   */
  block: true,
  /**
   * Acepta parámetros
   */
  seekable: true,
  /**
   * Nombre de la etiqueta
   */
  tagName: 'notification',
  /**
   * Compilar a JavaScript
   */
  compile(parser, buffer, token) {
    const expression = parser.utils.transformAst(
      parser.utils.generateAST(token.properties.jsArg, token.loc, token.filename),
      token.filename,
      parser
    )
    const key = parser.utils.stringify(expression)
    // Escribimos una sentencia if
    buffer.writeStatement(
      `if (state.notifications && state.notifications[${key}]) {`,
      token.filename,
      token.loc.start.line
    )
    // Definimos la variable local
    buffer.writeExpression(`let notification = {
      type: ${key},
      message: state.notifications[${key}],
    }`, token.filename, token.loc.start.line)
    // Definir ámbito local y notificar al parser
    parser.stack.defineScope()
    parser.stack.defineVariable('notification')
    // Renderizar los hijos del componente
    token.children.forEach((child) => parser.processToken(child, buffer))
    // Limpiar el ámbito antes de cerrar la sentencia if
    parser.stack.clearScope()
    // Cerramos el if
    buffer.writeStatement(
      `}`,
      token.filename,
      token.loc.start.line
    )
  }
}

edge.registerTag(notification)
```

Probando la acción de la etiqueta

`notification`:

```js
const notifications = {
  success: 'Configuración guardada correctamente'
}

const output = await edge.renderRaw(`
@notification('success')
  <div class="alert alert-{{ notification.type }}">
    <p>{{ notification.message }}</p>
  </div>
@end
`, { notifications })
```


***

Listo para generar el archivo descargable cuando lo solicites.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/creating-custom-tags

