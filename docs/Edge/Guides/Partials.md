<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Partials (Guides) | Edge Documentation](https://edgejs.dev/docs/partials)

Aquí tienes la traducción fiel y completa del contenido acerca de parciales en Edge, respetando la estructura y ejemplos originales:

***

# Parciales

Los parciales son fragmentos de marcado creados para reutilizarlos en diferentes plantillas. Los parciales tienen acceso a todos los datos disponibles en la plantilla padre, incluyendo variables en línea.

Puedes incluir un parcial dentro de una plantilla usando la etiqueta

`@include`. Esta acepta la ruta relativa al archivo de la plantilla.

```
@include('partials/header')

<main>
  El contenido principal va aquí
</main>

@include('partials/footer')
```

Puedes incluir parciales de otros discos anteponiendo el nombre del disco antes de la ruta de la plantilla.

```
@include('shared::partials/header')
@include('shared::partials/footer')
```


## Incluir condicionalmente

Puedes emplear el método

`@includeIf` para incluir parciales condicionalmente cuando una sentencia dada retorna

`true`. Por ejemplo:

```
@includeIf(post.comments.length, 'partials/comments')
```


***

Listo para generar tu archivo descargable cuando lo solicites.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/partials

