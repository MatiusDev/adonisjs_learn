<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Database (Testing) | AdonisJS Documentation](https://docs.adonisjs.com/guides/testing/database)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Database (Testing)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Database tests (Testing) | AdonisJS Documentation

> Fuente oficial: [Database (Testing) | AdonisJS Documentation](https://docs.adonisjs.com/guides/testing/database)

***

## Testing y la base de datos en AdonisJS

- Los database tests permiten asegurar que tu app interactúa correctamente con la DB y los datos escritos y leídos son los esperados.
- Temas tratados: migraciones, limpieza entre tests, uso de seeds.

***

## Migrar la base de datos antes del testing

- Usa los hooks de `testUtils.db()` en `tests/bootstrap.ts`.


### Opción 1: Reset total con migraciones

- Ejecuta todas las migraciones al inicio y las revierte al terminar:

```js
import testUtils from '@adonisjs/core/services/test_utils'
export const runnerHooks = {
  setup: [() => testUtils.db().migrate()],
  teardown: [],
}
```

    - Así cada corrida de tests inicia con una DB limpia y vacía (pero puede ser más lento).


### Opción 2: Truncar tablas entre ciclos

- Sólo ejecuta todas las migraciones la primera vez; después de cada ciclo de tests, vacía las tablas pero mantiene el schema:

```js
export const runnerHooks = {
  setup: [() => testUtils.db().truncate()],
}
```

    - Más rápido si tienes muchas migraciones.

***

## Seeds automáticos

- Si necesitas cargar datos de ejemplo, usa el hook de seeds:

```js
export const runnerHooks = {
  setup: [() => testUtils.db().seed()],
}
```

    - Se ejecutan todos los seeds antes de arrancar los tests.

***

## Mantener limpieza entre tests

### Transacción global (rollback tras cada test)

- Inicia y revierte una transacción por cada test:

```js
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

test.group('User', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
})
```

- **Importante**: no funciona si tu código probado ya inicia su propia transacción (no anidables). En ese caso, usa truncate/migrate.


### Truncar tablas tras cada test

- Alternativa si usas transacciones en tu código:

```js
import { test } from '@japa/runner'

test.group('User', (group) => {
  group.each.setup(() => testUtils.db().truncate())
})
```


***

¿Quieres este contenido como archivo `.md` para importar o necesitas adaptación para tu sistema de documentación o inteligencia artificial? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/testing/database

