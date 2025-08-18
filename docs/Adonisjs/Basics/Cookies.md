<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Cookies (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/cookies)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Cookies (Basics)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Cookies (Basics) | AdonisJS Documentation

> Fuente oficial: [Cookies (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/cookies)

***

## Lectura y escritura de cookies

- **Leer cookies:**

```js
request.cookie('key', defaultValue)
```

- **Escribir cookies:**

```js
response.cookie('key', value)
```

- **Eliminar cookies:**

```js
response.clearCookie('key')
```


***

## Configuración global

Las cookies se configuran en `config/app.ts` bajo la propiedad `http.cookie`:

```js
http: {
  cookie: {
    domain: '',
    path: '/',
    maxAge: '2h',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    partitioned: false,
    priority: 'medium',
  }
}
```

- Opciones pueden ser sobrescritas por cookie individualmente.

***

## Tipos de datos soportados

Las cookies se serializan con `JSON.stringify`, por lo que puedes almacenar:

- string
- number
- bigInt
- boolean
- null
- object
- array
- Date (como string ISO)

***

## Tipos de cookies

### Cookies firmadas (signed)

- Generadas por defecto con `response.cookie()`.
- Son a prueba de manipulación: si el contenido es modificado, la firma es inválida y la cookie es ignorada.
- Se usa la `appKey` de `config/app.ts` para la firma.
- Valor decodificable (base64).

```js
response.cookie('user_id', 1)
request.cookie('user_id')
```


***

### Cookies encriptadas (encrypted)

- Para almacenar valores sensibles, no decodificables por terceros.
- Usa:

```js
response.encryptedCookie('key', value)
request.encryptedCookie('key')
```


***

### Cookies en claro (plain)

- Accesibles vía `document.cookie` en el frontend.
- Serialización base64 por defecto para soportar objetos/arrays.
- Se puede desactivar encoding:

```js
response.plainCookie('token', tokenValue, { httpOnly: true, encode: false })
request.plainCookie('token', { encoded: false })
```


***

## Personalización por cookie

Al escribir cookies puedes sobreescribir configuración global:

```js
response.cookie('key', value, {
  domain: '',
  path: '/',
  maxAge: '2h',
  httpOnly: true,
  secure: true,
  sameSite: 'lax'
})
```


***

## Borrar cookies

```js
response.clearCookie('key')
```


***

## Tests y cookies

- Puedes definir cookies con las herramientas de testing `Japa API client` y `Japa browser client`.

***

¿Necesitas este contenido como archivo `.md` o estructurado para sistemas IA? Dímelo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/basics/cookies

