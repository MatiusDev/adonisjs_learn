<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# A partir de este momento te enviaré urls y debes hacer lo mismo que hiciste con los anteriores: [https://edgejs.dev/docs/interpolation](https://edgejs.dev/docs/interpolation)

Aquí tienes la traducción completa del contenido solicitado, respetando la estructura, los ejemplos y las tablas del original para que puedas descargarlo.

***

# Interpolación

Interpolación se refiere a incrustar el resultado de expresiones JavaScript junto al texto sin formato. EdgeJS usa dobles llaves

`{{ }}` como delimitadores.

```
¡Hola {{ username }}!
```

Dado que el nombre de usuario es

`Virk`. El resultado será

```
¡Hola Virk!
```

Puedes usar cualquier expresión válida de JavaScript dentro de las llaves, y Edge la evaluará por ti.

```
{{ user.username }}

{{ user.username.toUpperCase() }}

{{ (2 + 2) * 3 }}

{{ (await getUser()).username }}
```


## Expresiones multilínea

Las expresiones también pueden abarcar varias líneas. Por ejemplo:

```
Hola {{

users.map((user) => {
  return user.username
})

}}
```

Al escribir expresiones multilínea, asegúrate de que las dobles llaves estén en la misma línea.


| Inválido ❌ | Válido ✅ |
| :-- | :-- |
|  |  |

## Salida convertida a string

Como la salida de una plantilla es siempre un

`string`, el resultado de una expresión JavaScript también se convierte a cadena de texto envolviéndolo con la función String.

Dada la siguiente expresión

```
{{

users.map((user) => {
  return user.username
})

}}
```

La salida de JavaScript será

```
String(users.map((user) => {
  return user.username
}))
```

La salida convertida será

```
virk,romain,julien,michael
```

Si no quieres depender del comportamiento predeterminado, puedes convertir el array a string usando el método

`Array.join` de JavaScript.

```
Hola {{

users.map((user) => {
  return user.username
}).join(', ')

}}
```


## Salida HTML escapada

La salida de una expresión JavaScript es escapada como HTML para prevenir ataques XSS en tus aplicaciones.

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

Si quieres renderizar HTML tal como es, puedes usar llaves triples o el método global

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


## Omitir evaluación de llaves

Si usas Edge junto a un framework frontend que también utiliza dobles llaves, puedes indicar a Edge que omita ciertas expresiones agregando el símbolo

`@` antes de las llaves.

```
{{-- Entrada --}}

Edge no debe analizar @{{ username }}

{{-- Salida --}}

Edge no debe analizar {{ username }}
```


***

Ahora procederé a crear el archivo descargable con toda la traducción.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/interpolation

