<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Introduction (Testing) | AdonisJS Documentation](https://docs.adonisjs.com/guides/testing/introduction)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Introduction (Testing)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Testing (Introduction) | AdonisJS Documentation

> Fuente oficial: [Introduction (Testing) | AdonisJS Documentation](https://docs.adonisjs.com/guides/testing/introduction)

***

## Testing en AdonisJS

- Soporte de testing *in-built* utilizando Japa.
- No requiere instalación manual: todo preconfigurado para comenzar.
- Comando principal:

```bash
node ace test
```

- Directorio: tests/
    - tests/functional: funcionales (E2E, feature tests).
    - tests/unit: unitarios.

***

## Organización y configuración de suites

- Las suites se definen en `adonisrc.ts`:

```js
tests: {
  suites: [
    { name: 'functional', files: ['tests/functional/**/*.spec.(js|ts)'] },
    { name: 'unit', files: ['tests/unit/**/*.spec.(js|ts)'] },
  ]
}
```

- Puedes personalizar suites o agregar más.
- Configura hooks de suite en `tests/bootstrap.ts` (`configureSuite`), por ejemplo, para levantar un server sólo en tests funcionales.

***

## Hooks globales y plugins Japa

- Configura hooks globales (`setup`, `teardown`) en `tests/bootstrap.ts`:

```js
export const runnerHooks = {
  setup: [() => { /* before all tests */ }],
  teardown: [() => { /* after all tests */ }]
}
```

- Puedes registrar plugins extra y reporters:

```js
export const plugins = [
  assert(),
  pluginAdonisJS(app)
]
export const reporters = {
  activated: ['spec']
}
```


***

## Crear tests

- Crea un nuevo test:

```bash
node ace make:test posts/create --suite=functional
```

- Los tests utilizan `test` de `@japa/runner`:

```js
import { test } from '@japa/runner'
test('hashes user password', async ({ assert }) => {
  // assertions
})
```

- Crea grupos de tests con `test.group`, con hooks de ciclo de vida (`setup`, `teardown`, `each.setup`, etc).

***

## Hooks y estructura avanzada

- Ejemplo de group y hooks:

```js
test.group('creating user', (group) => {
  group.each.setup(async () => { /* before each */ })
  group.each.teardown(async () => { /* after each */ })
  group.setup(async () => { /* once before all tests */ })
  group.teardown(async () => { /* once after all */ })
  test('hashes user password', async ({ assert }) => { /* ... */ })
})
```


***

## Ejecución y filtrado

- Ejecuta todos o una suite:

```bash
node ace test
node ace test functional
node ace test unit
```

- Modo watch:

```bash
node ace test --watch
```

- Filtrado:
    - `--tests`: por título exacto.
    - `--files`: por nombre o patrón de archivo.
    - `--groups`: por nombre de grupo.
    - `--tags`: por tag.
    - `--matchAll`: requiere que coincidan todas las tags.
- Otros flags útiles:
    - `--force-exit`: salida inmediata sin shutdown grácil.
    - `--retries=#`: reintentar tests fallidos.
    - `--failed`: correr sólo los que fallaron en la corrida anterior.
    - `--reporter`: elige qué reporters usar.

***

## Variables de entorno en testing

- Puedes definir `.env.test` con variables específicas.
- Recuerda ajustar `SESSION_DRIVER=memory` durante testing.

***

## Próximos pasos

- Leer documentación de Japa para:
    - API de `test`.
    - Testing de código asincrónico.
    - Uso de datasets para evitar duplicidad de tests.

***

¿Te gustaría este contenido en archivo `.md` o con estructura especial para importar? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/testing/introduction

