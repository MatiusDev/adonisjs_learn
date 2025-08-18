<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Syntax specification (Guides) | Edge Documentation](https://edgejs.dev/docs/syntax_specification)

Aquí tienes la traducción fiel y completa del documento sobre la especificación de sintaxis de Edge, respetando la estructura, ejemplos y tablas originales:

***

# Especificación de sintaxis

Este documento describe la especificación de la sintaxis del motor de plantillas Edge. Puedes consultar este documento para entender mejor el funcionamiento interno de Edge o crear un resaltador de sintaxis para tu editor de código favorito.

## Objetivos

El objetivo principal de Edge es no introducir un nuevo dialecto en la capa de plantillas. En su lugar, usa JavaScript en todas partes.

- Mantener la sintaxis cercana a JavaScript.
- Debe ser fácil de escribir y entender.
- Edge debe funcionar con cualquier lenguaje de marcado, no solo HTML.
- Generar stack de errores que apunten al archivo fuente original y al número de línea.


## Primitivas

Edge está construido sobre dos primitivas básicas:

**Llaves**: Las conocidas llaves

`{{ }}` se usan para evaluar una expresión JavaScript.

**Etiquetas Edge**: Las etiquetas Edge comienzan con un símbolo

`@` seguido del nombre de la etiqueta. Las etiquetas pueden recibir propiedades y tener elementos hijos rodeados por una declaración de apertura y otra de cierre.

## Llaves

Edge usa las conocidas llaves

`{{ }}` para evaluar expresiones de JavaScript. El resultado de la expresión se concatena en la cadena de salida. Por ejemplo:

```
Hola {{ username }}!
```

Dado que el nombre de usuario es

`Virk`. El resultado será

```
Hola Virk
```


### Expresiones multilínea

Las expresiones pueden ocupar varias líneas. Por ejemplo:

```
Hola {{

users.map((user) => {
  return user.username
})

}}
```

Como la salida de una plantilla siempre es un

`string`, el resultado de una expresión JavaScript también se convierte a string.

En el ejemplo anterior, la expresión JavaScript retorna un arreglo y se convertirá en una cadena separada por comas. El resultado es igual que escribir el siguiente código JavaScript.

```
String(users.map((user) => {
  return user.username
}))
```

Puedes convertir manualmente el arreglo a cadena usando el método

`Array.join` de JavaScript.

```
Hola {{

users.map((user) => {
  return user.username
}).join(', ')

}}
```


### Salida HTML escapada

Edge realiza escape HTML en las expresiones JavaScript renderizadas usando las llaves.

Dada la siguiente cadena HTML

```
{{
  '<span style="color: red">Esto debería ser rojo.</span>'
}}
```

El resultado será

```
&lt;span style="color: red"&gt;Esto debería ser rojo.&lt;/span&gt;
```

Si quieres renderizar HTML tal cual, puedes envolverlo dentro de llaves triples o usar el método global

`html.safe`.

```
{{{
  '<span style="color: red">Esto debería ser rojo.</span>'
}}}
```

```
{{
  html.safe(
    '<span style="color: red">Esto debería ser rojo.</span>'
  )
}}
```


### Escapando las llaves

Supón que usas Edge junto con un motor de plantillas frontend que también utiliza llaves para interpolación. En ese caso, puedes usar el símbolo

`@` para informar a Edge que salte una expresión determinada. Por ejemplo:

```
Edge no debe analizar @{{ username }}
```

```
Edge no debe analizar {{ username }}
```


## Etiquetas Edge

Las etiquetas Edge se usan para agregar características avanzadas a la capa de plantillas. Funcionalidades como condicionales, bucles, componentes y parciales se implementan usando la API de etiquetas.

Una etiqueta debe escribirse en su propia línea sin contenido alrededor. Esto se decidió para que la API de etiquetas sea fácil de analizar a nivel de compilador. Siempre puedes combinar contenido + código JavaScript en la misma línea usando las llaves.

Las etiquetas se clasifican en las siguientes subcategorías.

### Etiquetas de bloque

Las etiquetas de bloque tienen una declaración de apertura y otra de cierre, con contenido dentro. La etiqueta

`@if` es una etiqueta de bloque.

```
@if(algunCondicional)

  Contenido del bloque

@end
```

Puedes cerrar automáticamente las etiquetas de bloque anteponiendo el operador

`!` antes del nombre de la etiqueta.

```
@!component('button', { size: 'large' })
```

```
@component('button', { size: 'large' })
@end
```


### Etiquetas en línea

Las etiquetas en línea no aceptan cuerpo, así que no necesitas cerrarlas explícitamente. La etiqueta

`@include` es una etiqueta en línea.

```
@include('partials/algun-archivo')
```


### Etiquetas sin argumentos

Las etiquetas pueden especificarse sin argumentos. Por ejemplo, la etiqueta

`@debugger`. Sin embargo, si una etiqueta acepta argumentos, siempre debes llamarla como función.

```
@debugger
```


### Ignorar saltos de línea

Las etiquetas deben usarse siempre con contenido de tipo bloque porque crean un separador de línea entre dos bloques de texto.

Sin embargo, si usas etiquetas donde los saltos de línea pueden cambiar el significado de la salida o volverla inválida, debes agregar el símbolo

`~` a la etiqueta.

```
Hola
@let(username = 'virk')
{{ username }}
```

```
Hola
virk
```

```
Hola
@let(username = 'virk')~
{{ username }}
```

```
Hola virk
```


## Comentarios

Puedes escribir comentarios en Edge encerrando el texto dentro del bloque

`{{-- --}}`.

```
{{-- Línea antes --}} Hola {{-- Línea después --}}
```

```
{{--
  Este es un comentario de varias líneas.
--}}
```


## Ejemplos

| Inválido ❌ | Válido ✅ |
| --- | --- |
| `@if
(
username
)` | `@if(username)` |
| `@if(username) Hello @endif` | `@if(username)
  Hello
@end` |
| `@if(
  username
) <p> Hello </p>
@endif` | `@if(
  username
)
  <p> Hello </p>
@end` |
| `@! component('button')` | `@!component('button')` |
| `@!component
('button', {
   type: 'primary'
})` | `@!component(
    ‘button’,
    {
       type: ‘primary’
    }
)` |

***

Listo para crear el archivo descargable cuando lo solicites.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/syntax_specification

