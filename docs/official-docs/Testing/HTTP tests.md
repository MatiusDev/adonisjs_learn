<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [HTTP tests (Testing) | AdonisJS Documentation](https://docs.adonisjs.com/guides/testing/http-tests)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **HTTP tests (Testing)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# HTTP tests (Testing) | AdonisJS Documentation

> Fuente oficial: [HTTP tests (Testing) | AdonisJS Documentation](https://docs.adonisjs.com/guides/testing/http-tests)

***

## ¿Qué son los HTTP tests?

- Permiten testear endpoints de tu app realizando peticiones HTTP reales y asertando sobre respuestas, headers, cookies, sesión, etc.
- Se realizan con el plugin API client de Japa (similar a Axios/fetch pero para testing en AdonisJS).
- Para testing en navegador real (interacciones), usar el Browser client (Playwright).

***

## Setup y uso básico

1. Instala el cliente:

```bash
npm i -D @japa/api-client
```

2. Registra el plugin en `tests/bootstrap.ts`:

```js
import { apiClient } from '@japa/api-client'
export const plugins = [
  assert(),
  apiClient(),
  pluginAdonisJS(app)
]
```

    - Opcional: puedes pasar `baseURL` explícito.
3. Escribe tests en `tests/functional` y usa el contexto `client`:

```js
import { test } from '@japa/runner'

test.group('Users list', () => {
  test('get a list of users', async ({ client }) => {
    const response = await client.get('/users')
    response.assertStatus(200)
    response.assertBody({ data: [{ id: 1, email: 'foo@bar.com' }] })
  })
})
```


***

## Open API Testing

- Puedes usar archivos Open API para validar la forma del response (`assertAgainstApiSpec`).
- Instala y registra plugin:

```bash
npm i -D @japa/openapi-assertions
```

```js
import { openapi } from '@japa/openapi-assertions'
export const plugins = [
  openapi({ schemas: [app.makePath('resources/open_api_schema.yaml')] }),
  apiClient(), /* ... */
]
```

- Usa:

```js
response.assertAgainstApiSpec()
```


***

## Leer y escribir cookies

- Envía cookies:

```js
await client.get('/users').withCookie('user_preferences', { limit: 10 })
await client.get('/users').withEncryptedCookie('key', value)
await client.get('/users').withPlainCookie('key', value)
```

- Lee cookies de respuesta:

```js
response.cookies()
response.cookie('user_preferences')
response.assertCookie('user_preferences')
```


***

## Manejar sesión y flash messages en tests

- Registra `sessionApiClient` y configura `.env.test` con `SESSION_DRIVER=memory`.

```js
import { sessionApiClient } from '@adonisjs/session/plugins/api_client'
export const plugins = [ /* ... */, sessionApiClient(app) ]
```

- Envía datos de sesión:

```js
await client.post('/checkout').withSession({ cartItems: [...] })
```

- Lee session y flasheos:

```js
response.session()
response.session('clave')
response.flashMessages()
response.assertSession('cart_items')
response.assertFlashMessage('success', 'Mensaje de éxito')
```


***

## Autenticación en tests (authApiClient)

- Si usas auth, registra el plugin:

```js
import { authApiClient } from '@adonisjs/auth/plugins/api_client'
export const plugins = [ /* ... */, authApiClient(app) ]
```

- Autenticar usuario:

```js
await client.get('/me').loginAs(user)
await client.get('/me').withGuard('api_tokens').loginAs(user)
```


***

## CSRF y tests

- Para CSRF, registra plugins `shieldApiClient` y `sessionApiClient`, y usa `.withCsrfToken()`:

```js
await client.post('/posts').form(data).withCsrfToken()
```


***

## Ayuda para generación de rutas

- Usa el helper `route` para mantener URLs sincronizadas con tus rutas:

```js
test('get a list of users', async ({ client, route }) => {
  const response = await client.get(route('users.list'))
  // ...
})
```


***

¿Quieres este contenido como archivo `.md` o alguna otra estructura para tu sistema de documentación o IA? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/testing/http-tests

