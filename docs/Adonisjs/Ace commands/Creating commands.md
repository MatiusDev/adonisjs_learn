<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Creating commands (Ace commands) | AdonisJS Documentation](https://docs.adonisjs.com/guides/ace/creating-commands)

Aquí tienes un resumen estructurado basado en la documentación oficial de AdonisJS sobre la creación de comandos personalizados con Ace.

***

# Creating Commands in AdonisJS (Ace commands)

Fuente: [Creating commands (Ace commands) | AdonisJS Documentation](https://docs.adonisjs.com/guides/ace/creating-commands)

## Crear un comando personalizado

- Comandos personalizados se ubican en el directorio raíz `commands/`.
- Crear nuevo comando usando el CLI:

```bash
node ace make:command greet
```

- Esto crea el archivo `commands/greet.ts` que contiene una clase que extiende `BaseCommand`.
- La clase debe implementar el método `run()` que contiene la lógica del comando.


## Metadatos del comando

En la clase comando se definen propiedades estáticas para configurar el comando:

- `static commandName: string`
Nombre del comando, ejemplo: `'greet'`.
- `static description: string`
Breve descripción para listar.
- `static help: string[]`
Texto extendido para el parámetro `--help`.
- `static aliases: string[]`
Alias para el comando.
- `static options` (`CommandOptions`)
Configuraciones internas:
    - `startApp: boolean` — arranca la app antes de ejecutar el comando (default `false`).
    - `allowUnknownFlags: boolean` — permite flags desconocidos (default `false`).
    - `staysAlive: boolean` — no termina la app tras ejecución (default `false`).


## Ciclo de vida del comando

Opcionales métodos para hook:


| Método | Descripción |
| :-- | :-- |
| `prepare()` | Se ejecuta primero para preparar estado. |
| `interact()` | Interactividad, prompts con usuario. |
| `run()` | Lógica principal del comando. |
| `completed()` | Ejecutado tras el `run`, para cleanup y manejo de errores. |

## Inyección de dependencias

- Decorar métodos con `@inject()` para resolver dependencias de IoC container.

```ts
@inject()
async run(userService: UserService) {
  // Puedes usar userService dentro del método
}
```


## Manejo de errores y exit code

- Capturar excepciones dentro de un bloque `try/catch` en `run`.
- Registrar errores y setear `this.error` y `this.exitCode` para señalizar errores.
- También puedes manejar errores en `completed()`.

Ejemplo básico:

```ts
async run() {
  try {
    // Código principal
  } catch (error) {
    this.logger.error(error)
    this.error = error
    this.exitCode = 1
  }
}
```


## Controlar el ciclo de vida de la app

- Por defecto Ace termina la app tras un comando.
- Si `staysAlive = true`, deberás terminar manualmente con `this.terminate()` cuando quieras.


## Escuchar evento de cierre

- Usar hook del app para limpieza en shutdown.

```ts
prepare() {
  this.app.terminating(() => {
    // Limpieza antes de terminar
  })
}
```


## Registro del comando

- Para que Ace detecte tu comando nuevo, genera o actualiza el manifiesto:

```bash
node ace generate:manifest
```

- Esto refresca `ace-manifest.json` para listar y ejecutar comandos.

***

**¿Quieres que te entregue este contenido como archivo markdown listo para guardar o en otro formato?** Me lo puedes pedir.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/ace/creating-commands

[^2]: https://docs.adonisjs.com/guides/ace/creating-commands

[^3]: https://v5-docs.adonisjs.com/guides/ace-commandline

[^4]: https://docs.adonisjs.com/guides/ace/introduction

[^5]: https://dev.to/wrrnwng/create-your-own-adonisjs-commands-to-create-and-drop-databases-2b7o

[^6]: https://www.gkmit.co/blog/creating-custom-commands-with-adonisjs/

[^7]: https://adocasts.com/lessons/lets-learn-adonis-5-the-ace-cli

[^8]: https://www.youtube.com/watch?v=9lhE5EWmzEY

[^9]: https://legacy.adonisjs.com/docs/4.1/ace

[^10]: https://legacy.adonisjs.com/docs/4.0/ace

