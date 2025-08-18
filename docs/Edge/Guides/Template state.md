<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Templates state (Guides) | Edge Documentation](https://edgejs.dev/docs/templates_state)

Aquí tienes la traducción fiel al español, manteniendo la estructura, ejemplos y la tabla original para que puedas descargarlo.

***

# Estado de las plantillas

El estado de las plantillas se refiere a los datos a los que pueden acceder las plantillas durante su fase de renderizado. Edge proporciona cuatro capas para pasar o definir el estado de la plantilla.

Dado que las plantillas Edge se renderizan en el servidor, los datos nunca se comparten con el entorno del cliente.

## Globales

Los globales se refieren al estado definido usando el método

`edge.global`. Los globales están disponibles para todas las plantillas, incluyendo componentes.

Por ejemplo, puedes utilizar globales para compartir la configuración del sitio web con todas las plantillas.

```
edge.global('config', {
  colorScheme: 'dark',
  menu: [],
  socialLinks: [],
})
```

```
<html class="{{ config.colorScheme }}">
  <head>
  <head>
  <body>
    <header>
      @each(item in config.menu)
      @end
    </header>
    <footer>
      @each(link in config.socialLinks)
      @end
    </footer>
  </body>
</html>
```

También puedes compartir clases, funciones y casi cualquier tipo de dato de JavaScript como propiedades globales.

```
edge.global('findUser', async function (id) {
  return User.findById(id)
})
```

```
@let(user = await findUser(1))
{{ user.username }}
```


## Locales

Los

`locales` son similares al estado global pero están aislados entre diferentes llamadas de renderizado.

En el siguiente ejemplo, usamos el método

`edge.createRenderer` para crear varias instancias hijas de edge y compartir objetos de datos separados con ellas.

Los datos estarán disponibles globalmente para todas las plantillas incluidas como parciales o componentes, pero no entre diferentes instancias hijas.

```
const templ1 = edge.createRenderer()
const templ2 = edge.createRenderer()

templ1.share({
  url: '/posts',
})

templ2.share({
  url: '/posts/1',
})

await templ1.renderRaw('{{ url }}') // /posts
await templ2.renderRaw('{{ url }}') // /posts/1
```


### ¿Por qué usar locales?

Podrías pensar, ¿por qué crear una nueva instancia aislada y usar el método

`.share()` para compartir locales con una plantilla, si puedes pasar los datos durante la llamada al método

`.render()`?

```
const view = edge.createRenderer().share({
  url: req.url
})

await view.render('template-path')
```

```
await edge.render('template-path', {
  url: req.url
})
```

Veamos un ejemplo concreto donde los locales pueden ser útiles.

Imagina que usas Express.js y Edge juntos y quieres compartir datos con una plantilla usando middleware. Además, los datos compartidos deberían estar aislados entre las solicitudes concurrentes que maneja tu aplicación.

Puedes crear una nueva instancia del renderizador de Edge para cada solicitud y usar el método

`share` para compartir datos globales aislados entre múltiples solicitudes HTTP.

```
app.use(function (req, res) {
  res.view = edge.createRenderer()
})

app.use(function (req, res) {
  res.view.share({
    url: req.url
  })
})

app.use(function (req, res) {
  res.view.share({
    user: req.auth.user
  })
})

// Finalmente renderizar una plantilla
app.get('/posts', async (req, res) => {
  const html = await res.view.render('posts')
  res.send(html)
})
```


## Objeto de datos para renderizado

El dato de renderizado se refiere al objeto de datos pasado al llamar al método

`edge.render`. Los datos de renderizado no se comparten con los componentes usados por una plantilla.

```
const renderingData = {}
await edge.render('template-path', renderingData)
```


## Variables en línea

Las variables en línea se definen dentro de la plantilla como variables let. Puedes definir variables en línea usando la etiqueta

`@let` y reasignarles nuevos valores con la etiqueta

`@assign`.

```
@let(config = await loadConfig())
{{ config.someKey }}
```

El alcance de las variables en línea es similar a una variable let en JavaScript. Veamos el siguiente ejemplo, donde mutamos una variable en línea dentro de un bucle

`each`.

```
{{-- Definir variable --}}
@let(total = 0)
<ul>
  @each(item in items)
    {{-- Reasignar nuevo valor --}}
    @assign(total = total + item.price)
    <li> {{ item.name }} = {{ item.price }} </li>
  @end
  <li> Total bruto = {{ total }} </li>
<ul>
```


## Capas de datos y su alcance

El estado final de la plantilla es una copia fusionada de todas las capas usando

`Object.assign`. Por lo tanto, la capa con mayor prioridad sobrescribirá los valores de las capas anteriores.

```
const finalState = Object.assign(
  {},
  globals,
  locales,
  renderingData
)
```

| Nombre | ¿Se comparte con componentes? | ¿Está aislado? |
| :-- | :-- | :-- |
| Globales | ✅ | ❌ |
| Locales | ✅ | ✅ |
| Objeto de datos para renderizado | ❌ | ✅ |
| Variables en línea | ❌ | ✅ |


***

Ahora procederé a crear el archivo descargable con toda la traducción.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/templates_state

