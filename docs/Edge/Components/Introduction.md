<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Introduction (Components) | Edge Documentation](https://edgejs.dev/docs/components/introduction)

Aquí tienes la traducción completa del contenido sobre componentes en Edge, con estructura y ejemplos fieles al original:

***

# Componentes

Los componentes te permiten dividir la interfaz de usuario de la aplicación en piezas reutilizables con estado aislado. Puedes usar componentes para definir layouts o crear una colección de distintos elementos UI.

Antes de hablar más sobre componentes, aclaremos cómo difieren de los componentes en el ecosistema frontend:

- **Sin reactividad**: Edge es un motor de plantillas backend, por lo que no existe el concepto de reactividad en Edge ni en su capa de componentes.
- **No procesan CSS ni JavaScript del frontend**: Las plantillas Edge no se procesan con herramientas de construcción, así que no se procesan CSS en línea ni bundles de frontend.


## Creando componentes

Los componentes son plantillas Edge regulares, creadas con el propósito de ser reutilizadas. Los componentes pueden acceder a propiedades especiales en tiempo de ejecución como

`$props` y

`$slots`, las cuales no están disponibles en otras plantillas Edge.

Recomendamos crear los componentes dentro del directorio

`components` en la raíz de las plantillas. Esto ayuda a distinguir visualmente los componentes del resto de plantillas usadas en la aplicación.

Ejemplo de un componente de botón guardado como

`components/button.edge`:

```
<button type="{{ type || 'submit' }}">{{ text }}</button>
```


## Usando componentes

Debes usar la etiqueta

`@component` para renderizar un componente en tus plantillas. Esta etiqueta acepta la ruta de la plantilla como primer parámetro y los

`props` como segundo parámetro.

```
<form>
  @!component('components/button', { text: 'Login' })
  @!component('components/button', { text: 'Cancel', type: 'reset' })
</form>
```

Salida:

```
<form>
  <button type="submit">Login</button>
  <button type="reset">Cancel</button>
</form>
```

Puedes referenciar componentes en discos nombrados anteponiendo el nombre del disco:

```
@!component('uikit::components/button', { text: 'Login' })
```


## Pasando props

Las props del componente se pasan como segundo parámetro usando la etiqueta

`@component`. Las props siempre son un objeto, y puedes acceder a ellas dentro de la plantilla del componente usando el nombre de la propiedad.

Ver también: Referencia de Props

```
@component('components/button', {
  type: 'submit',
  class: 'btn btn-large',
  text: 'Login'
})
```

```
{{ type }}
{{ class }}
{{ text }}
```

Otra forma de acceder a las props es usando la propiedad

`$props`. Por ejemplo:

```
{{ $props.get('type') }}
{{ $props.get('class') }}
{{ $props.get('text') }}
```


## Usando Slots

Los slots son puntos de inserción nombrados con marcado HTML adentro. Ya que escribir HTML dentro de props puede resultar desordenado, los slots ofrecen una mejor experiencia de autoría.

En el siguiente ejemplo se renderizan los contenidos del slot principal usando la función

`$slots.main`.

Ver también: Referencia de Slots

```
<button {{ $props.toAttrs() }}>
  {{{ await $slots.main() }}}
</button>
```

El contenido del slot

`main` se sitúa entre la apertura y el cierre del componente:

```
@component('components/button', {
  class: ['flex', 'align-center', 'space-x-4']
})
  <i class="fa-lock"></i>
  <span>Login</span>
@end
```


## Componentes como etiquetas

Edge permite referenciar componentes como etiquetas. En vez de usar la etiqueta

`@component`, puedes usar el nombre de archivo del componente como nombre de la etiqueta para renderizarlo.

Esto solo funciona para componentes en el directorio

`components`.

Ejemplo de un componente modal:

```
<div class="modal">
  <header>
    {{{ await $slots.header() }}}
  </header>
  <main>
    {{{ await $slots.content() }}}
  </main>
  <footer>
    {{{ await $slots.footer() }}}
  </footer>
</div>
```

Supón que la plantilla se guarda como

`modal.edge`, puedes renderizarlo así:

```
@modal()
  @slot('header')
    <h2>Eliminar publicación</h2>
  @end

  @slot('content')
    <p>Estás a punto de eliminar la publicación permanentemente</p>
  @end

  @slot('footer')
    <button>Sí, eliminar</button>
    <button>Cancelar</button>
  @end
@end
```

También puedes referenciar componentes como etiquetas desde discos nombrados anteponiendo el nombre del disco seguido de un punto.

```
{{-- Como etiqueta desde el disco uikit --}}
@!uikit.input()

{{-- Vía la etiqueta component --}}
@!component('uikit::input')
```


### Conversión de nombre de archivo a nombre de etiqueta

Puedes referenciar los archivos guardados dentro del directorio

`components` como etiquetas en tus plantillas Edge. Se aplican las siguientes reglas de transformación al crear una etiqueta desde el nombre de archivo:


| Ruta de la plantilla | Nombre de la etiqueta |
| :-- | :-- |
| `form/input.edge` | `@form.input` |
| `tool_tip.edge` | `@toolTip` |
| `checkout_form/input.edge` | `@checkoutForm.input` |
| `modal/index.edge` | `@modal` |


***

Listo para crear tu archivo descargable cuando lo solicites.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/components/introduction

