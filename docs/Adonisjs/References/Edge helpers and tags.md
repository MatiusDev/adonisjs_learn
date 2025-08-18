<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Edge helpers and tags (References) | AdonisJS Documentation](https://docs.adonisjs.com/guides/references/edge)

Aquí tienes un resumen detallado sobre los helpers y tags que AdonisJS aporta al motor de plantillas Edge, basado en la documentación oficial.

***

# Edge Helpers and Tags (AdonisJS)

Fuente: [Edge helpers and tags (References)](https://docs.adonisjs.com/guides/references/edge)

## Helpers disponibles en Edge

- **request**: instancia de la petición HTTP actual (solo disponible en vistas renderizadas por `ctx.view.render`).

```edge
{{ request.url() }}
{{ request.input('signature') }}
```

- **route/signedRoute**: genera URLs para rutas definidas.

```edge
<a href="{{ route('posts.show', [post.id]) }}">View post</a>
<a href="{{ signedRoute('unsubscribe', [user.id], { expiresIn: '3 days', prefixUrl: 'https://example.com' }) }}">Unsubscribe</a>
```

- **app**: instancia de la aplicación.

```edge
{{ app.getEnvironment() }}
```

- **config**: para obtener valores de configuración.

```edge
@if(config('app.appKey'))
  Clave de aplicación existe.
@endif
```

- **session**: copia inmutable de la sesión.

```edge
Visits count: {{ session.get('page.visits') }}
```

- **flashMessages**: mensajes flash de sesión.

```edge
@if(flashMessages.has('notification'))
  <div class="{{ flashMessages.get('notification').type }}">
    {{ flashMessages.get('notification').message }}
  </div>
@endif
```

- **old**: alias para obtener valor anterior de formulario.

```edge
{{ old('email') }}
```

- **t**: traducciones (de `@adonisjs/i18n`).

```edge
{{ t('messages.greeting') }}
```

- **i18n**: instancia del gestor de i18n (traducción y formateo).

```edge
{{ i18n.formatCurrency(100, { currency: 'USD' }) }}
```

- **auth**: información del usuario autenticado.

```edge
@if(auth.isAuthenticated())
  Email: {{ auth.user.email }}
@endif
```

- **asset**: para resolver URLs de activos.

```edge
<img src="{{ asset('images/logo.png') }}" />
```

- **embedImage / embedImageData**: para mails, embebe imágenes inline con CID.

```edge
<img src="{{ embedImage(app.makePath('path/to/image.png')) }}" />
```

- **helpers para mensajes flash y errores**
    - `@flashMessage('key')`: solo muestra contenido si mensaje existe.
    - `@error('key')`: muestra mensajes de error.
    - `@inputError('field')`: muestra errores de campo.
- **@vite / @viteReactRefresh**: para incluir bundles de Vite.

```edge
@vite(['resources/js/app.js'])
@viteReactRefresh()
```

- **@can / @cannot**: verifica permisos en plantillas.

```edge
@can('editPost', post)
  <!-- contenido para autorizado -->
@endcan
```


## Uso recomendado

- Usar helpers para facilitar construcción de URLs, traducciones y control de contenido dinámico.
- Utilizar tags para control condicional, manejo de errores y acceso seguro basado en permisos.
- Plugins oficiales pueden agregar más helpers y tags.

***

¿Quieres que te entregue esta información en archivo markdown para que puedas guardar o integrar en tu base documental? Solo dime.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/references/edge

[^2]: https://docs.adonisjs.com/guides/references/edge

[^3]: https://docs.adonisjs.com/guides/views-and-templates/edgejs

[^4]: https://docs.adonisjs.com/guides/references/helpers

[^5]: https://legacy.adonisjs.com/docs/4.0/helpers

[^6]: https://docs.adonisjs.com/guides/basics/routing

[^7]: https://mauricius.dev/how-to-use-presenters-in-adonisjs-edge-templating-engine/

[^8]: https://legacy.adonisjs.com/docs/4.1/helpers

[^9]: https://www.youtube.com/watch?v=pggNXk4MOEk

[^10]: https://docs.adonisjs.com

[^11]: https://docs.adonisjs.com/guides/views-and-templates/introduction

