<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Command arguments (Ace commands) | AdonisJS Documentation](https://docs.adonisjs.com/guides/ace/arguments)

Aquí tienes un resumen detallado basado en la documentación oficial de AdonisJS sobre **Command arguments** para comandos personalizados en Ace.

***

# Command arguments - Ace commands (AdonisJS)

Fuente: [Official docs](https://docs.adonisjs.com/guides/ace/arguments)

## Definición de argumentos posicionales

- Argumentos son valores posicionales que se pasan después del nombre del comando.
- Debes definirlos como propiedades dentro de la clase del comando y decorarlos con el decorador `@args`.
- El orden de definición dentro de la clase determina el orden de los argumentos en CLI.


## Decoradores de argumentos

- `@args.string()` para aceptar un string:

```ts
import { BaseCommand, args } from '@adonisjs/ace'

export default class GreetCommand extends BaseCommand {
  static commandName = 'greet'

  @args.string()
  declare name: string

  async run() {
    console.log('Hello', this.name)
  }
}
```

- Para aceptar múltiples valores en un solo argumento:
    - Usa `@args.spread()`
    - Debe ser el último argumento:

```ts
@args.spread()
declare names: string[]

async run() {
  console.log(this.names)
}
```


## Configuración avanzada del argumento

- Personaliza el nombre del argumento mostrado en ayuda:

```ts
@args.string({ argumentName: 'user-name' })
declare name: string
```

- Agrega descripción para ayuda:

```ts
@args.string({
  description: 'The name of the user'
})
declare name: string
```

- Argumentos opcionales:
Define `required: false` (deben ir al final).

```ts
@args.string({ required: false })
declare name?: string
```

- Valor por defecto:

```ts
@args.string({ required: false, default: 'guest' })
declare name: string
```

- Procesamiento previo del valor (parse):

```ts
@args.string({
  parse: (value) => value.toUpperCase()
})
declare name: string
```


## Acceder a todos los argumentos

- Accede a todos los argumentos pasados desde `this.parsed.args` (un objeto).

```ts
console.log(this.parsed.args)
```


***

¿Quieres que te entregue este contenido en formato markdown para guardar o adaptado a otro sistema? Solo dime.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/ace/arguments

[^2]: https://docs.adonisjs.com/guides/ace/arguments

[^3]: https://docs.adonisjs.com/guides/ace/introduction

[^4]: https://v5-docs.adonisjs.com/guides/ace-commandline

[^5]: https://docs.adonisjs.com/guides/ace/creating-commands

[^6]: https://www.npmjs.com/package/@adonisjs/ace/v/5.1.0

[^7]: https://legacy.adonisjs.com/docs/4.0/ace

[^8]: https://docs.adonisjs.com/guides/references/commands

[^9]: https://docs.adonisjs.com/guides/ace/prompts

[^10]: https://legacy.adonisjs.com/docs/4.1/ace

[^11]: https://github.com/adonisjs/ace

