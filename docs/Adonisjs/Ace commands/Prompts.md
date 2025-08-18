<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Prompts (Ace commands) | AdonisJS Documentation](https://docs.adonisjs.com/guides/ace/prompts)

Aquí tienes un resumen detallado basado en la documentación oficial de AdonisJS sobre **Prompts en Ace commands**.

***

# Prompts in Ace commands (AdonisJS)

Fuente: [Prompts (Ace commands) - AdonisJS Documentation](https://docs.adonisjs.com/guides/ace/prompts)

## ¿Qué son los Prompts?

- Widgets interactivos en terminal para solicitar input al usuario.
- Soportan múltiples tipos: input, list, password, confirm, toggle, select, multi-select, autocomplete.
- Basados en paquete `@poppinss/prompts`.
- Pensados para testing: puedes interceptar/prompts en tests y responder automáticamente.


## Cómo mostrar un prompt básico

- Usar `this.prompt` dentro de comandos Ace.

```ts
import { BaseCommand } from '@adonisjs/core/ace'

export default class Greet extends BaseCommand {
  async run() {
    const modelName = await this.prompt.ask('Enter the model name')
    console.log(modelName)
  }
}
```


## Tipos de prompts comunes

- `ask`: entrada texto simple.
- `secure`: entrada oculta para passwords.
- `choice`: lista simple para elegir uno.
- `multiple`: lista para seleccionar varios.
- `confirm`: pregunta sí/no → devuelve boolean.
- `toggle`: pregunta con opciones personalizadas.
- `autocomplete`: lista con búsqueda fuzzy.


## Opciones comunes para prompts

- `default`: valor por defecto si usuario no ingresa nada.
- `hint`: texto explicativo junto al prompt.
- `parse`: función que transforma valor antes de guardar.
- `validate`: función para validar valor y mostrar error.
- `limit`: limita número de opciones visibles en listas.


## Ejemplo: prompt de password

```ts
const password = await this.prompt.secure('Enter your password', {
  validate(value) {
    return value.length >= 6 || 'Password must be at least 6 chars'
  }
})
```


## Ejemplo: prompt de selección múltiple

```ts
const selected = await this.prompt.multiple('Select your hobbies', [
  { name: 'music', message: 'Music' },
  { name: 'sports', message: 'Sports' },
  { name: 'art', message: 'Art' },
])
console.log(selected) // Array de claves seleccionadas
```


## Ejemplo: confirm

```ts
const shouldDelete = await this.prompt.confirm('Are you sure you want to delete this?')
if (shouldDelete) {
  // continuar con borrado
}
```


## Uso en tests

- Puedes simular respuestas en tests automáticos para evitar interacción manual.

***

¿Quieres este contenido en formato markdown para guardar o adaptar a tu plataforma de documentación/IA? Avísame.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/ace/prompts

[^2]: https://docs.adonisjs.com/guides/ace/prompts

[^3]: https://v5-docs.adonisjs.com/guides/ace-commandline

[^4]: https://docs.adonisjs.com/guides/ace/creating-commands

[^5]: https://docs.adonisjs.com/guides/ace/introduction

[^6]: https://www.npmjs.com/package/@adonisjs/ace/v/5.1.0

[^7]: https://princecurie.tech/how-to-build-a-command-line-application-with-typescript-and-adonisjs-ace

[^8]: https://github.com/adonisjs/ace

[^9]: https://docs.adonisjs.com/guides/ace/terminal-ui

[^10]: https://github.com/thetutlage/ace-sample-project

[^11]: https://www.youtube.com/watch?v=dbQSPhF65UY

