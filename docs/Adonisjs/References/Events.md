<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Events (References) | AdonisJS Documentation](https://docs.adonisjs.com/guides/references/events)

Aquí tienes un resumen basado en la documentación oficial de AdonisJS sobre los eventos disponibles, su uso y cómo manejarlos.

***

# Events in AdonisJS (Reference)

Fuente: [AdonisJS Events Reference](https://docs.adonisjs.com/guides/references/events)

## Conceptos Claves de Eventos

- Los eventos son despachados por el núcleo del framework y paquetes oficiales.
- La implementación usa internamente una versión extendida de EventEmitter (basada en `emittery`).


## Eventos Comunes

### HTTP

- `http:request_completed`
Se emite al completar una petición HTTP.
Incluye la duración y el contexto de la solicitud.
- `http:server_ready`
Se emite cuando el servidor HTTP está listo para aceptar conexiones.


### Contenedor IoC

- `container_binding:resolved`
Emite cada vez que el contenedor IoC resuelve un binding o instancia.


### Session

- `session:initiated`
Cuando la sesión es iniciada.
- `session:committed`
Cuando la sesión es escrita/persistida.
- `session:migrated`
Cuando la sesión genera un nuevo ID (ej. después de regeneración).


### i18n (Internacionalización)

- `i18n:missing:translation`
Cuando falta una traducción para una clave en un idioma.


### Mail

- `mail:sending`
Antes de enviar un mail (o encolarlo).
- `mail:sent`
Después de enviar el mail.
- `mail:queueing`
Al poner un mail en la cola.
- `mail:queued`
Cuando un mail ha sido encolado.
- `queued:mail:error`
Cuando un mail en cola falla al enviarse.


### Auth y Bouncer

- `session_auth:login_attempted`
Intento de login con guardia de sesión.
- `session_auth:login_succeeded`
Login exitoso.
- `session_auth:authentication_failed`
Fallo en autenticación.
- `session_auth:logged_out`
Cuando un usuario se desloguea.
- `access_tokens_auth:authentication_succeeded/failed`
Autenticación exitosa o fallida con tokens.
- `authorization:finished`
Cuando una autorización finaliza.


### Cache

- `cache:hit/miss/written/deleted/cleared`
Eventos de cache para hit, miss, escritura, borrado, limpieza.


## Uso básico de eventos

- Se usa el servicio `emitter` para escuchar eventos.

```ts
import emitter from '@adonisjs/core/services/emitter'

emitter.on('http:request_completed', (event) => {
  console.log(`Request completed: ${event.duration}`)
})
```

- Para escuchar eventos de mail:

```ts
emitter.on('mail:sent', (event) => {
  console.log(event.mailerName)
  console.log(event.message)
})
```


## Listeners con Clases

- Se pueden definir eventos y listeners usando clases.
- Los listeners pueden ser cargados dinamicamente.


## Eventos Personalizados

- Puede emitir eventos personalizados usando `emitter.emit('event:name', payload)`.


## Captura de errores

- Se recomienda capturar errores en listeners para evitar interrupciones.

***

¿Quieres esta información en un archivo markdown completo o en otro formato para tu base documental? Estoy listo para preparártelo.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/references/events

[^2]: https://v5-docs.adonisjs.com/guides/events

[^3]: https://docs.adonisjs.com/guides/references/events

[^4]: https://docs.adonisjs.com

[^5]: https://legacy.adonisjs.com/docs/4.0/events

[^6]: https://docs.adonisjs.com/guides/digging-deeper/emitter

[^7]: https://legacy.adonisjs.com/docs/4.1/events

[^8]: https://github.com/adonisjs/events

[^9]: https://legacy.adonisjs.com/docs/3.2/events

[^10]: https://stackbay.org/modules/chapter/learn-adonisjs/events-and-listeners

[^11]: https://dev.to/tngeene/events-and-mailing-part-1-2oi1

