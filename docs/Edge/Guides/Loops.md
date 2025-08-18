<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Loops (Guides) | Edge Documentation](https://edgejs.dev/docs/loops)

Aquí tienes la traducción fiel y completa del contenido sobre bucles en Edge, respetando ejemplos y formato:

***

# Bucles

Puedes iterar sobre

`Objetos` y

`Arreglos` usando la etiqueta

`@each`. El funcionamiento interno de la etiqueta

`each` es similar al ciclo

`for of` en JavaScript.

```
@each(user in users)
  <li> {{ user.username }} </li>
@end
```

```
@each((user, index) in users)
  <li> {{ index + 1 }} {{ user.username }} </li>
@end
```


## Iterando sobre objetos

Puedes iterar sobre objetos de JavaScript usando la misma etiqueta

`@each`. Por ejemplo:

```
await edge.render('recipes', {
  food: {
    ketchup: '5 tbsp',
    mustard: '1 tbsp',
    pickle: '0 tbsp'
  }
})
```

```
@each((amount, ingredient) in food)
  <li> Usa {{ amount }} de {{ ingredient }} </li>
@end
```


## Definiendo contenido alternativo

La etiqueta

`@each` puede usarse junto con la etiqueta

`@else` para definir contenido alternativo en caso de que el valor sea un arreglo/objeto vacío o indefinido.

```
@each(comment in post.comments)
  @include('partials/comment')
@else
  <p> Esta publicación no ha recibido comentarios </p>
@end
```


***

Listo para generar tu archivo descargable cuando lo solicites.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/loops

