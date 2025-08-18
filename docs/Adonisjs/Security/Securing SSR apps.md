<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Securing SSR apps (Security) | AdonisJS Documentation](https://docs.adonisjs.com/guides/security/securing-ssr-applications)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Securing SSR apps (Security)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Securing server-rendered applications (Security) | AdonisJS Documentation

> Fuente oficial: [Securing SSR apps (Security) | AdonisJS Documentation](https://docs.adonisjs.com/guides/security/securing-ssr-applications)

***

## Seguridad en aplicaciones SSR con AdonisJS

### Paquete recomendado: `@adonisjs/shield`

- Requiere tener previamente configurado `@adonisjs/session`.
- Instala con:

```bash
node ace add @adonisjs/shield
```

- Registra provider, crea `config/shield.ts` y middleware global.

***

## Protección CSRF

- **¿Qué es?** Evita que sitios maliciosos envíen formularios/requets en nombre de tus usuarios.
- **Implementación:**
Agrega un campo hidden con el token en tus formularios usando el helper:

```edge
{{ csrfField() }}
```

    - El middleware verifica automáticamente el token en cada POST, PUT, PATCH, DELETE.
- Si el token es inválido/missing, se lanza la excepción `E_BAD_CSRF_TOKEN`:
    - Por defecto, redirige y muestra un flash message.
    - Puedes personalizar el manejo en el Exception Handler.
- **Config en `config/shield.ts`:**
    - `enabled`: activa/desactiva CSRF.
    - `exceptRoutes`: rutas exentas (array de patterns o función).
    - `enableXsrfCookie`: si usas AJAX/frontend, activa este flag para exponer el token vía cookie `XSRF-TOKEN`.
    - `methods`: qué métodos HTTP proteger.

***

## Content Security Policy (CSP)

- Defiende contra XSS y ataques similares — limita fuentes de recursos (JS, CSS, imágenes…).
- Disabled por default, activalo en config:

```js
csp: {
  enabled: true,
  directives: {
    defaultSrc: [`'self'`],
    scriptSrc: [`'self'`, '@nonce'],
    // Más directivas...
  },
  reportOnly: false,
}
```

- Soporta:
    - Usar nonce en scripts/styles inline: Edge usa la variable `cspNonce`.
    - Keywords especiales para integración con Vite: `@viteDevUrl`, `@viteHmrUrl`, `@viteUrl` para permitir dev server o CDN.

***

## HSTS (Strict Transport Security)

- Fuerza el uso de HTTPS en el browser.
- Configuración:

```js
hsts: {
  enabled: true,
  maxAge: '180 days',
  includeSubDomains: true,
}
```


***

## X-Frame Options

- Protege contra clickjacking impidiendo render dentro de iframes.
- Configuración:

```js
xFrame: {
  enabled: true,
  action: 'DENY' // o 'SAMEORIGIN'/'ALLOW-FROM'
}
```


***

## X-Content-Type-Options (No Sniff)

- Bloquea ataques vía MIME sniffing diciendo al browser que sólo confíe en el Content-Type enviado.
- Shield activa el header `X-Content-Type-Options: nosniff` cuando está habilitado:

```js
contentTypeSniffing: {
  enabled: true,
}
```


***

¿Quieres este contenido como archivo `.md` preformateado o en alguna estructura específica para tu sistema de documentación o IA? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/security/securing-ssr-applications

