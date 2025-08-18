<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Stacks (Guides) | Edge Documentation](https://edgejs.dev/docs/stacks)

Aquí tienes la traducción fiel y completa del contenido sobre pilas (stacks) en Edge, manteniendo la estructura y ejemplos originales:

***

# Pilas (Stacks)

Las pilas te permiten crear marcadores de posición en línea para que otras plantillas puedan agregar contenido. Por ejemplo, puedes crear una pila para JavaScript en línea y componentes/parciales pueden insertar etiquetas de script dentro de ella.

Las pilas están disponibles desde

`edge.js@6.1.0`. Antes de usarlas, asegúrate de actualizar la versión del paquete.

La etiqueta

`@stack` creará una pila con nombre (debe ser único) en la que otras plantillas pueden agregar contenido.

```
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    @stack('js')
  </head>
  <body>
    <main>
      @!dialog()
    </main>
  </body>
</html>
```

La etiqueta

`@pushOnceTo` insertará contenido dentro de la pila creada previamente. Dado que puedes usar el siguiente componente varias veces en una sola página, utilizamos la etiqueta

`pushOnceTo` para insertar la etiqueta

`script` solo una vez. De lo contrario, terminarías con varias etiquetas script.

```
<dialog x-data="alpineModal">
</dialog>

@pushOnceTo('js')
  <script>
    Alpine.data('alpineModal', function () {
      return {
        show() {},
        hide() {},
      }
    })
  </script>
@end
```

El siguiente será el HTML de salida:

```
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script>
      Alpine.data('alpineModal', function () {
        return {
          show() {},
          hide() {},
        }
      })
    </script>
  </head>
  <body>
    <main>
      <dialog x-data="alpineModal">
      </dialog>
    </main>
  </body>
</html>
```

Similar a la etiqueta

`@pushOnceTo`, también existe la etiqueta

`@pushTo`, que agregará contenido dentro de una pila nombrada tantas veces como el componente o parcial sea importado.

***

Listo para generar el archivo descargable cuando lo indiques.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/stacks

