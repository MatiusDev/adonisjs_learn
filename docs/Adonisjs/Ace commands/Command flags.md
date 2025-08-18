<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Command flags (Ace commands) | AdonisJS Documentation](https://docs.adonisjs.com/guides/ace/flags)

Aquí tienes un resumen detallado basado en la documentación oficial de AdonisJS sobre **Command flags** para comandos en Ace.

***

# Command Flags in Ace (AdonisJS)

Fuente: [Command flags - Ace - AdonisJS](https://docs.adonisjs.com/guides/ace/flags)

## ¿Qué son las flags?

- Flags son parámetros nombrados que se pasan con doble guion `--flag` o guion simple para alias `-f`.
- Pueden ir en cualquier orden, y el valor puede ser booleano, string, número, o arreglo.


## Declarar flags

- Defines flags como propiedades de clase usando decoradores `@flags`.

Ejemplos:

```ts
import { BaseCommand, flags } from '@adonisjs/ace'

export default class Command extends BaseCommand {
  @flags.boolean()
  declare resource: boolean

  @flags.string()
  declare model: string

  @flags.number()
  declare score: number

  @flags.array()
  declare groups: string[]
}
```


## Tipos de flags

- **Booleanas:** `--resource` activa flag (`true`), sin flag es `undefined`, con `--no-resource` es `false`.
- **String:** `--model user`, si valor lleva espacios: `--model "user name"`.
- **Número:** Validado que sea número.
- **Array:** Puede repetirse `--group admin --group mod`.


## Opciones adicionales de flags

- `flagName`: Personalizar nombre flag en CLI.
- `description`: Texto para ayuda.
- `alias`: Alias con un solo carácter (ej. `-r`).

Ejemplo con alias y opciones:

```ts
@flags.boolean({
  flagName: 'server',
  alias: ['s'],
  description: 'Start the server',
  default: true
})
declare startServer: boolean
```


## Valores por defecto

- Puedes declarar defaults cuando flag no se provee.

```ts
@flags.boolean({
  default: true
})
declare startServer: boolean

@flags.string({
  default: "sqlite"
})
declare connection: string
```


## Procesar valor

- Usa `parse` para transformar valor antes de asignar:

```ts
@flags.string({
  parse(value) {
    return value.toUpperCase()
  }
})
declare name: string
```


## Acceder a flags y flags desconocidas

- En el comando accede a todas las flags pasadas con `this.parsed.flags`.
- Flags no reconocidas (flexibilidad) están en `this.parsed.unknownFlags`.

```ts
console.log(this.parsed.flags)
console.log(this.parsed.unknownFlags)
```


***

Si quieres, puedo formatear este contenido como archivo markdown para tu uso. ¿Te gustaría?

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/ace/flags

[^2]: https://docs.adonisjs.com/guides/ace/flags

[^3]: https://docs.adonisjs.com/guides/ace/introduction

[^4]: https://docs.adonisjs.com/guides/ace/arguments

[^5]: https://v5-docs.adonisjs.com/guides/ace-commandline

[^6]: https://docs.adonisjs.com/guides/ace/creating-commands

[^7]: https://legacy.adonisjs.com/docs/4.0/ace

[^8]: https://legacy.adonisjs.com/docs/4.1/ace

[^9]: https://docs.adonisjs.com/guides/references/commands

[^10]: https://github.com/adonisjs/ace

[^11]: https://www.npmjs.com/package/@adonisjs/ace

