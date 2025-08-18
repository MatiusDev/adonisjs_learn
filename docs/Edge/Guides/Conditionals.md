<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Conditionals (Guides) | Edge Documentation](https://edgejs.dev/docs/conditionals)

Aquí tienes la traducción completa y fiel del contenido sobre condicionales en Edge, manteniendo todos los ejemplos y formatos originales:

***

# Condicionales

Puedes escribir bloques condicionales dentro de las plantillas Edge usando las etiquetas

`@if`,

`@elseif` y

`@else`. El funcionamiento interno de estas etiquetas es similar a las sentencias

`if/else` en JavaScript.

```
@if(user)
  <p> {{ user.username }} </p>
@end
```

```
@if(user.fullName)
  <p> ¡Hola {{ user.fullName }}! </p>
@elseif(user.firstName)
  <p> ¡Hola {{ user.firstName }}! </p>
@else
  <p> ¡Hola Invitado! </p>
@end
```


## La etiqueta unless

Además de la etiqueta

`@if`, también puedes usar la etiqueta

`@unless` para expresar sentencias tipo

**no si**. Por ejemplo:

Con @if

```
@if(!account.isActive)
  <p>Por favor, verifica tu dirección de correo para activar la cuenta </p>
@end
```

Con @unless

```
@unless(account.isActive)
  <p>Por favor, verifica tu dirección de correo para activar la cuenta </p>
@end
```


## Usando el operador ternario

Puedes escribir condicionales en línea utilizando el operador ternario de JavaScript.

```
<input
  class="input {{ hasError ? 'error' : '' }}"
/>
```


***

Listo para descargar la traducción cuando lo indiques.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/conditionals

