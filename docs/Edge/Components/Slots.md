<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Slots (Components) | Edge Documentation](https://edgejs.dev/docs/components/slots)

Aquí tienes la traducción fiel y completa del contenido sobre Slots en Edge, respetando la estructura y ejemplos originales:

***

# Slots

Los slots son puntos de inserción con nombre que puedes definir dentro de la etiqueta de apertura y cierre del componente usando la etiqueta

`@slot`. El componente puede acceder a los slots como funciones a través del objeto

`$slots`.

Creemos un componente de tarjeta y usemos slots para renderizar diferentes secciones de la tarjeta.

```edge
@let(attributes = $props
  .merge({
    class: ['card']
  })
  .toAttrs()
)

<div {{ attributes }}>
  <div class="card_header">
    {{{ await $slots.header() }}}
  </div>
  <div class="card_contents">
    {{{ await $slots.content() }}}
  </div>
</div>
```

Ahora vamos a usar el componente

`card` y definir sus contenidos usando slots.

```edge
@card({ class: ['card-lg', 'card-shadow'] })
  @slot('header')
    <strong>Inicio rápido</strong>
  @end

  @slot('content')
    <p>Comienza a construir tu próximo proyecto en minutos</p>
  @end
@end
```


## Slots principales y slots nombrados

En el ejemplo anterior, usamos slots nombrados para definir contenidos en múltiples puntos de inserción. Sin embargo, puedes usar el slot

`main` si un componente solo necesita un slot.

El slot main se refiere a todo el contenido entre la apertura y el cierre del componente. En el siguiente ejemplo, aceptamos el título de la tarjeta como prop y su contenido como slot

`main`.

```edge
<div {{ attributes }}>
  <div class="card_header">
    {{ title }}
  </div>
  <div class="card_contents">
    {{{ await $slots.main() }}}
  </div>
</div>
```

```edge
@card({ title: 'Inicio rápido' })
  <p>Comienza a construir tu próximo proyecto en minutos</p>
@end
```


***

## Alcance de los slots

Los slots definidos usando la etiqueta

`@slot` pueden acceder al estado de la plantilla actual. No tienen acceso al estado interno del componente.

En el siguiente ejemplo definimos las variables

`cardSize` y

`sizes`. Estas variables están disponibles solo para el componente, no para los slots definidos en la plantilla padre.

```edge
@let(cardSize = 'medium')
@let(sizes = {
  medium: '350px',
  small: '200px',
  large: '450px'
})

<div class="{{ sizes[cardSize] }}">
  <div class="card_header">
    {{{ await $slots.header() }}}
  </div>
  <div class="card_contents">
    {{{ await $slots.content() }}}
  </div>
</div>
```

```edge
@card()
  @slot('header')
    <strong>Inicio rápido</strong>
  @end

  @slot('content')
    {{-- El valor de cardSize será undefined --}}
    <p>Soy una tarjeta {{ cardSize }}</p>
  @end
@end
```

Sin embargo, un componente puede pasar datos al slot cuando lo renderiza. Mira el siguiente ejemplo:

```edge
@let(cardSize = 'medium')
@let(sizes = {
  medium: '350px',
  small: '200px',
  large: '450px'
})

<div class="{{ sizes[cardSize] }}">
  <div class="card_header">
    {{{ await $slots.header({ sizes, cardSize }) }}}
  </div>
  <div class="card_contents">
    {{{ await $slots.content({ sizes, cardSize }) }}}
  </div>
</div>
```

Ahora puedes acceder al estado compartido dentro del slot en la plantilla así:

```edge
@card()
  @slot('header')
    <strong>Inicio rápido</strong>
  @end

  @slot('content', componentState)
    <p>Soy una tarjeta {{ componentState.cardSize }}</p>
  @end
@end
```


***

Listo para generar el archivo descargable cuando lo solicites.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/components/slots

