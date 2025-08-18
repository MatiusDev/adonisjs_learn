<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Layouts (Components) | Edge Documentation](https://edgejs.dev/docs/components/layouts)

Aquí tienes la traducción fiel y completa del contenido sobre layouts en Edge, respetando la estructura y ejemplos originales:

***

# Layouts

Puedes usar slots para renderizar plantillas. Supongamos que creas un archivo

`app.edge` dentro del directorio

`views/components/layout`.

views/components/layout/app.edge

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{ title || "Tu título por defecto" }}</title>
    @if ($slots.meta)
      {{{ await $slots.meta() }}}
    @endif
  </head>
  <body>
    {{{ await $slots.main() }}}
  </body>
</html>
```

Definir el layout dentro del directorio

`components` permite aprovechar la funcionalidad de componentes como etiquetas. Como guardamos el archivo en el directorio

`layout` y lo nombramos

`app.edge`, podemos usar la etiqueta

`@layout.app` para renderizar el layout.

Edita el archivo

`welcome.edge` dentro del directorio

`views`.

En este ejemplo, queremos renderizar el contenido principal de nuestra página de bienvenida usando la función

`$slots.main`, agregar un markup meta con

`$slots.meta`, y cambiar el título por defecto.

views/welcome.edge

```edge
@layout.app({ title: "Título de la página de bienvenida" })
  @slot('meta')
    <meta name="description" content="Una página de bienvenida hecha con EdgeJS">
  @endslot

  @slot('main')
    <h1>¡Hola mundo!</h1>
  @endslot
@end
```

Como ves, podemos usar **slots** para reemplazar secciones de nuestro layout. Es lo que hemos hecho con la sección **meta** y la sección **main**.

***

Listo para generar el archivo descargable cuando lo solicites.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/components/layouts

