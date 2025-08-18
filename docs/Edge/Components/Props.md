<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Props (Components) | Edge Documentation](https://edgejs.dev/docs/components/props)

Aquí tienes la traducción fiel y completa del contenido sobre Props en Edge, manteniendo la estructura, ejemplos y explicaciones originales:

***

# Props

Las props son la forma principal de compartir datos con un componente al renderizarlo. Un componente puede aceptar cualquier prop sin necesidad de mantener una lista de props permitidas.

```html
<input
  type="{{ type || 'text' }}"
  placeholder="{{ placeholder || '' }}"
  name="{{ name }}"
  id="{{ name }}"
  value="{{ value: '' }}"
/>
```

Vamos a renderizar el componente

`input` y pasarle algunas props.

```edge
@!input({
  name: 'title',
  placeholder: 'Escribe el título de la publicación'
})

@!input({
  name: 'slug',
  placeholder: 'Escribe el slug de la publicación'
})
```


## Serializando props a atributos HTML

Ahora mismo, estamos vinculando manualmente las props a los atributos HTML en el elemento

`input`. Este método no escala porque tendríamos que agregar soporte explícitamente para cada atributo HTML.

Puedes usar el objeto

`$props` para serializar todas las props a atributos HTML usando el método

`toAttrs`. Todas las props serán serializadas a una cadena y aplicadas al elemento

`input` en el siguiente ejemplo.

```html
<input {{ $props.toAttrs() }} />
```

Vamos un paso más allá y asignamos clases de estilo predeterminadas a nuestro input usando el método

`.merge`. Si pasas clases adicionales al usar el componente, se fusionarán con las clases predeterminadas.

```html
<input {{
  $props.merge({ class: ['input'] }).toAttrs()
}} />
```

| Input | Output |
| :-- | :-- |
| `<input {{ $props.merge({ class: ['input'] }).toAttrs() }} />` | `<input class="input" ... />` |
| `<input {{ $props.merge({ class: ['input', 'large'] }).toAttrs() }} />` | `<input class="input large" ... />` |

### Removiendo clases existentes

La serialización de props no ofrece una API incorporada para eliminar clases existentes usando el método

`merge`. Sin embargo, puedes usar una prop adicional que alguien puede pasar para ignorar las clases existentes.

```html
<input {{
  $props
    .mergeUnless(removeExistingStyles, { class: ['input'] })
    .except(['removeExistingStyles'])
    .toAttrs()
}} />
```

Las clases por defecto se aplicarán a menos que pases la prop

`removeExistingStyles` al renderizar el componente.

```edge
@!input({
  removeExistingStyles: true,
  class: ['flex', 'mt-2', 'mb-4', 'border']
})
```


***

## API de Props

A continuación, la lista de métodos disponibles en el objeto

`$props`.

### has

Verifica si existe una determinada prop.

```edge
{{ $props.has('text') }}
```


### get

Obtiene el valor de una determinada prop.

```edge
{{ $props.get('text') }}
```


### only

Obtiene un nuevo objeto de props solo con las claves mencionadas.

```edge
{{ $props.only(['text', 'class']).get('text') }}
```


### except

Obtiene un nuevo objeto de props excepto las claves mencionadas.

```edge
{{ $props.except(['text', 'size']) }}
```


### merge / mergeIf / mergeUnless

Fusiona propiedades personalizadas con los valores de props. Los valores de props tienen prioridad sobre las propiedades personalizadas.

En el siguiente ejemplo, el valor de la propiedad

`type` será

`text` a menos que se proporcione un valor explícito al renderizar el componente.

```html
<button {{ $props.merge({ type: 'text' }).toAttrs() }}>
</button>
```

```edge
@!component('components/button', { type: 'reset' })
```

Salida HTML

```html
<button type="reset">
</button>
```


***

Listo para generar el archivo descargable cuando lo solicites.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/components/props

