<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Extending the framework (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/extending-adonisjs)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Extending the framework (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Extending the framework (Concepts) | AdonisJS Documentation

> Fuente oficial: [Extending the framework (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/extending-adonisjs)

***

## Arquitectura extensible

AdonisJS está diseñado para facilitar la extensión tanto desde paquetes propios como desde el código de tu aplicación. El equipo oficial utiliza los APIs core para crear el ecosistema.

***

## Macros y getters

- Permiten agregar propiedades (macros/métodos) y getters a la prototype de una clase, funcionando como un "azúcar sintáctico" sobre Object.defineProperty.
- Se usa el paquete `macroable` bajo el capó.
- Para que TypeScript reconozca las extensiones, debes usar declaración de tipos (declaration merging).

**Ejemplo: añadir un macro**

```ts
import { Request } from '@adonisjs/core/http'
Request.macro('wantsJSON', function (this: Request) {
  const firstType = this.types()[^0]
  if (!firstType) return false
  return firstType.includes('/json') || firstType.includes('+json')
})

// Agregar los tipos con declaration merging:
declare module '@adonisjs/core/http' {
  interface Request {
    wantsJSON(): boolean
  }
}
```

- El path del módulo en `declare module` debe coincidir con el import.
- El nombre de la interfaz debe coincidir con la clase modificada.

**Ejemplo: añadir un getter**

```ts
Request.getter('hasRequestId', function (this: Request) {
  return this.header('x-request-id')
})
// Uso:
if (ctx.request.hasRequestId) { /* ... */ }
```

**Getter singleton (cache por instancia)**

```ts
Request.getter('hasRequestId', function (this: Request) {
  return this.header('x-request-id')
}, true)
```


***

## Clases macroables

Puedes extender con macros y getters las siguientes clases y paths:


| Clase | Import path |
| :-- | :-- |
| Application | `@adonisjs/core/app` |
| Request | `@adonisjs/core/http` |
| Response | `@adonisjs/core/http` |
| HttpContext | `@adonisjs/core/http` |
| Route | `@adonisjs/core/http` |
| RouteGroup | `@adonisjs/core/http` |
| RouteResource | `@adonisjs/core/http` |
| BriskRoute | `@adonisjs/core/http` |
| ExceptionHandler | `@adonisjs/core/http` |
| MultipartFile | `@adonisjs/core/bodyparser` |


***

## Ejemplo de estructura para extender

- Escribe macros/getters en un archivo especial (por ejemplo, `extensions.ts`) y cárgalo durante el método `boot` de tu service provider.

```ts
export default class AppProvider {
  async boot() {
    await import('../src/extensions.js')
  }
}
```


***

## Extensión de módulos

Muchos módulos de AdonisJS permiten registrar implementaciones personalizadas:

- Crear Hash driver personalizado
- Crear Session driver
- Crear Social auth driver
- Extender REPL
- Registrar loader custom para i18n translations
- Registrar formatter custom para i18n

***

¿Quieres este contenido como archivo `.md` listo para importar o alguna estructura especial para tu base de conocimientos IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/extending-adonisjs

