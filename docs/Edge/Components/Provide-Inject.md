<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Provide/Inject (Components) | Edge Documentation](https://edgejs.dev/docs/components/provide_inject)

Aquí tienes la traducción fiel y completa sobre Provide/Inject en componentes Edge, respetando la estructura y ejemplos originales:

***

# Provide/Inject API

La API de provide/inject está inspirada en la API de contexto de Svelte y la API provide/inject de Vue. Su propósito es compartir el estado con un árbol de componentes sin tener que pasarlo explícitamente como props.

La mayoría de las veces, un grupo de componentes relacionados utilizará la API Provide/Inject para compartir/acceder al estado entre sí de manera transparente.

***

## Renderizando un Mapa con Marcadores

Vamos a reproducir el ejemplo de maps del tutorial de contexto de Svelte y aprender cómo construirlo con Edge. También utilizaremos Alpine.js para renderizar el mapa usando el SDK de Mapbox JavaScript.

El código fuente final para este ejemplo está disponible en Github. Necesitarás un token de acceso para tu cuenta de Mapbox para renderizar el mapa.

### API deseada

Este es el ejemplo de la API que queremos lograr. El componente

`map` es responsable de renderizar el mapa usando el SDK de Mapbox, y el componente

`map.marker` muestra un marcador en el mapa.

```edge
@map({ center: [-84, 35], zoom: 3 })
  @!map.marker({ lat: 37.8225, lon: -122.0024, label: 'Edge Body Shaping' })
  @!map.marker({ lat: 33.8981, lon: -118.4169, label: 'Edge Barbershop & Essentials' })
  @!map.marker({ lat: 29.723, lon: -95.4189, label: 'Edge Waxing Studio' })
  @!map.marker({ lat: 28.3378, lon: -81.3966, label: 'Edge 30 Nutritional Consultants' })
  @!map.marker({ lat: 40.6483, lon: -74.0237, label: 'Edge Brands LLC' })
@end
```


***

### El componente Map

Como el mapa se renderiza usando el componente

`map`, necesita acceder a todos los marcadores antes de renderizar. Aquí es donde entra la API provide/inject.

- El componente

`map` compartirá/inyectará un objeto con sus hijos.

- El componente

`map.marker` (un hijo de map) accederá al objeto compartido y agregará un marcador al array de marcadores.

- Finalmente, el componente

`map` pasará todos los datos a un componente Alpine y renderizará el mapa con el SDK de Mapbox.

```edge
{{-- Define una variable local con las opciones del mapa --}}
@let(map = {
  center,
  zoom,
  markers: [],
})

{{-- Comparte el objeto map con los hijos --}}
@inject({ map })

{{-- Ejecuta los hijos, pero no los renderiza --}}
@eval(await $slots.main())

{{-- Renderiza un div y lo enlaza a un componente Alpine --}}
<div x-data="map({{ js.stringify(map) }})" id="map"></div>
```


***

### El componente Marker

El trabajo de

`map.marker` es agregar marcadores al array

`map.markers`. Puede acceder al estado inyectado utilizando la variable

`$context`.

```edge
{{-- Asegúrate de que el componente marker esté anidado dentro de map --}}
@if(!$context.map)
  @newError(
    'El componente map.marker debe estar anidado dentro del componente map',
    $caller.filename,
    $caller.line,
    $caller.col
  )
@end

{{-- Agrega las props como marcador al objeto map --}}
@eval($context.map.markers.push({ lat, lon, label }))
```

Eso es todo lo necesario para lograr la API deseada.

***

### Componente Alpine

Finalmente, definimos un componente Alpine que utilizará el SDK de Mapbox para renderizar el mapa en el cliente.

```js
document.addEventListener('alpine:init', () => {
  window.Alpine.data('map', function (data) {
    return {
      createMap() {
        mapboxgl.accessToken = '<!-- TU ACCESS TOKEN -->'
        return new mapboxgl.Map({
          container: this.$root,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: data.center,
          zoom: data.zoom
        })
      },
      addMarker(map, markerData) {
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(markerData.label)
        new mapboxgl.Marker().setLngLat([markerData.lon, markerData.lat]).setPopup(popup).addTo(map)
      },
      init() {
        const map = this.createMap()
        if (data.markers && Array.isArray(data.markers)) {
          data.markers.forEach((marker) => {
            this.addMarker(map, marker)
          })
        }
      }
    }
  })
})
```


***

## El decorador @inject

Puedes inyectar o compartir el estado con los hijos de un componente usando la etiqueta

`@inject`. Asegúrate de llamar la etiqueta

`@inject` antes de renderizar o evaluar los slots del componente.

```edge
@let(sharedState = {})
@inject(sharedState)
```


***

## Variable \$context

Los componentes hijos pueden acceder al estado compartido usando la variable

`$context`.

```edge
@map()
  {{ inspect($context) }}
@end
```


***

Listo para generar el archivo descargable cuando lo solicites.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/components/provide_inject

