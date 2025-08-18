<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Helpers (References) | AdonisJS Documentation](https://docs.adonisjs.com/guides/references/helpers)

Aquí tienes un resumen organizado y estructurado sobre las utilidades conocidas como **Helpers** en AdonisJS, basado en la documentación oficial.

***

# Helpers en AdonisJS

Fuente: [Helpers (References) | AdonisJS Documentation](https://docs.adonisjs.com/guides/references/helpers)

## Introducción a los Helpers

- **Helpers** es un módulo que agrupa utilidades que usan el core y los paquetes oficiales de AdonisJS.
- No se añade peso extra a `node_modules` porque estas utilidades ya están presentes en el framework.
- Se pueden importar desde:

```ts
import is from '@adonisjs/core/helpers/is'
import * as helpers from '@adonisjs/core/helpers'
import string from '@adonisjs/core/helpers/string'
```


## Utilidades comunes en Helpers

### escapeHTML

Escapa entidades HTML para evitar inyección.

```ts
string.escapeHTML('<p>foo & bar</p>') // Resultado seguro para HTML
```


### encodeSymbols

Codifica símbolos no ASCII.

```ts
string.encodeSymbols('foo © bar ≠ baz') // Codifica símbolos
```


### prettyHrTime

Imprime tiempo legible basado en retorno de `process.hrtime`.

```ts
import { hrtime } from 'node:process'
const start = hrtime()
// operación
const end = hrtime(start)
console.log(string.prettyHrTime(end))
```


### string case conversions

Diferentes funciones para transformar cadenas de texto:

- **camelCase:** `string.camelCase('user_name')` → `'userName'`
- **pascalCase:** `string.pascalCase('user name')` → `'UserName'`
- **snakeCase:** `string.snakeCase('UserName')` → `'user_name'`
- **dashCase:** `string.dashCase('UserName')` → `'user-name'`
- **dotCase:** `string.dotCase('UserName')` → `'User.Name'`
- **capitalCase, titleCase, sentenceCase, noCase** y otros.


### truncate y excerpt

Corta cadenas largo fijo, opcionalmente evitando cortar en medio de palabras.

```ts
string.truncate('Hola mundo grande', 10) // Resultado: 'Hola mun...'
string.excerpt('<p>Hola mundo</p>', 5) // Resultado: 'Hola ...'
```


### slug

Genera slugs compatibles con URLs.

```ts
string.slug('Hola mundo!') // 'hola-mundo'
```


### interpolate

Interpolación de texto con handlebars-like.

```ts
string.interpolate('Hola {{name}}', { name: 'Juan' }) // 'Hola Juan'
```


### plural, isPlural, singular, isSingular

Funciones para determinar/pluralizar o singularizar palabras.

```ts
string.plural('box')        // 'boxes'
string.isPlural('boxes')    // true
string.singular('boxes')    // 'box'
string.isSingular('box')    // true
```


### random

Genera string aleatorio criptográficamente seguro.

```ts
string.random(32) // Ejemplo: "8w7f788sh6..."
```


### Other utilities

- **base64:** Base64 encode/decode seguro para URLs.
- **MessageBuilder:** Serializador de datos con expiración y propósito.
- **Secret:** Clase para envolver datos sensibles que no deben mostrarse en logs.
- **is:** Detector de tipos (e.g., `is.object({})` → true).
- **fsReadAll / fsImportAll:** Para cargar archivos y módulos desde directorios.
- **safeEqual:** Comparación segura contra ataques timing.

***

¿Quieres que prepare esta información en un archivo markdown completo para que la puedas guardar o usar en tu base documental? Puedo hacerlo en seguida. Solo dime.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/references/helpers

[^2]: https://docs.adonisjs.com/guides/references/helpers

[^3]: https://v5-docs.adonisjs.com/guides/helpers

[^4]: https://docs.adonisjs.com/guides/references/edge

[^5]: https://v5-docs.adonisjs.com/reference/views/globals/all-helpers

[^6]: https://github.com/orgs/adonisjs/discussions/3625

[^7]: https://docs.adonisjs.com

[^8]: https://docs.adonisjs.com/guides/references/commands

[^9]: https://legacy.adonisjs.com/docs/3.2/helpers

[^10]: https://v5-docs.adonisjs.com/reference/i18n/view-helpers

[^11]: https://docs.adonisjs.com/guides/references/events

