<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Browser tests (Testing) | AdonisJS Documentation](https://docs.adonisjs.com/guides/testing/browser-tests)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Browser tests (Testing)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Browser tests (Testing) | AdonisJS Documentation

> Fuente oficial: [Browser tests (Testing) | AdonisJS Documentation](https://docs.adonisjs.com/guides/testing/browser-tests)

***

## ¿Qué son los browser tests?

- Son tests ejecutados en navegadores reales (Chrome, Firefox, Safari) usando Playwright.
- **No** se utiliza el framework de testing de Playwright, sino el plugin `browserClient` para Japa.

***

## Setup inicial

1. Instala dependencias:

```bash
npm i -D playwright @japa/browser-client
```

2. Agrega suite `browser` en `adonisrc.ts`:

```js
tests: {
  suites: [
    {
      name: 'browser',
      files: ['tests/browser/**/*.spec(.ts|.js)'],
      timeout: 300_000
    }
  ]
}
```

3. Registra el plugin en `tests/bootstrap.ts`:

```js
import { browserClient } from '@japa/browser-client'
export const plugins = [
  assert(),
  apiClient(),
  browserClient({ runInSuites: ['browser'] }),
  pluginAdonisJS(app)
]
```


***

## Ejemplo básico

Crea test en `tests/browser/...`:

```js
import { test } from '@japa/runner'

test.group('Home page', () => {
  test('see welcome message', async ({ visit }) => {
    const page = await visit('/')
    await page.assertTextContains('body', 'It works!')
  })
})
```

Corre tests:

```bash
node ace test browser
```


***

## Leer y escribir cookies

- Cada test tiene su propio browserContext (aislamiento de cookies).
- Escribe o lee cookies:

```js
await browserContext.setCookie('username', 'virk')
await browserContext.getCookie('cartTotal')
await browserContext.setEncryptedCookie('username', 'virk')
await browserContext.getEncryptedCookie('cartTotal')
```


***

## Manejar sesión y flash messages en tests de browser

- Registra `sessionBrowserClient`:

```js
import { sessionBrowserClient } from '@adonisjs/session/plugins/browser_client'
export const plugins = [
  /* ..., */ sessionBrowserClient(app)
]
```

    - Asegúrate de usar `SESSION_DRIVER=memory` en `.env.test`.
- Escribe sesión o flashes:

```js
await browserContext.setSession({ cartItems: [{ id:1 }, { id:2 }] })
await browserContext.setFlashMessages({ success: 'Hecho!' })
```

- Lee sesión o flashes:

```js
const session = await browserContext.getSession()
const flashes = await browserContext.getFlashMessages()
```


***

## Autenticación en browser tests

- Usa `authBrowserClient` plugin:

```js
import { authBrowserClient } from '@adonisjs/auth/plugins/browser_client'
export const plugins = [
  /* ..., */ authBrowserClient(app)
]
```

- Marca usuario como logueado:

```js
await browserContext.loginAs(user)
// O con otro guard
await browserContext.withGuard('admin').loginAs(user)
```


***

## Ayuda para rutas dinámicas

- Usa el helper `route` para componer URLs:

```js
test('see list of users', async ({ visit, route }) => {
  const page = await visit(route('users.list'))
})
```


***

¿Quieres este contenido como archivo `.md` o de cierta manera compatible con tu sistema de documentación/IA? Indícalo.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/testing/browser-tests

