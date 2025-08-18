<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo para [Terminal UI (Ace commands) | AdonisJS Documentation](https://docs.adonisjs.com/guides/ace/terminal-ui)

Aquí tienes un resumen detallado basado en la documentación oficial de AdonisJS sobre **Terminal UI en Ace commands**.

***

# Terminal UI en Ace commands (AdonisJS)

Fuente: [Terminal UI - Ace commands](https://docs.adonisjs.com/guides/ace/terminal-ui)

## Introducción

- Terminal UI de Ace está potenciado por la librería `@poppinss/cliui`.
- Provee herramientas para mostrar logs, tablas, animaciones y un flujo visual de tareas.
- Diseñado para integrar bien con testing (modo `raw` para desactivar colores y formateo).


## Logging

Puedes usar logger para mostrar mensajes con estilos predefinidos:

```ts
this.logger.debug('Mensaje debug')
this.logger.info('Mensaje info')
this.logger.success('Mensaje éxito')
this.logger.warning('Mensaje advertencia')
this.logger.error(new Error('Error detectado'))
this.logger.fatal(new Error('Error fatal'))
```

Opciones para prefijos y sufijos en mensajes:

```ts
this.logger.info('Instalando paquetes', { suffix: 'npm i --production' })
this.logger.info('Instalando paquetes', { prefix: process.pid })
```


### Animación de carga

Muestra un mensaje animado con puntos suspensivos:

```ts
const animation = this.logger.await('Descargando paquetes', { suffix: 'npm i' })
animation.start()
animation.update('Descomprimiendo', { suffix: undefined })
animation.stop()
```


### Acciones con estados

Crea acciones que puedan marcarse como `succeeded`, `failed` o `skipped` para reflejar el estado de una tarea:

```ts
const task = this.logger.action('Creando archivo de configuración')
try {
  await doWork()
  task.displayDuration().succeeded()
} catch {
  task.failed()
}
```


## Tablas

Renderiza tablas para mostrar datos consolidados:

```ts
const table = this.ui.table()
table.head(['Migración', 'Duración', 'Estado'])
table.row(['1590591892626_tenant.ts', '2ms', 'DONE'])
table.row(['1590595949175_entity.ts', '4ms', 'DONE'])
table.render()
```

- Puedes aplicar colores a celdas y alinear columnas, incluso hacer tablas full width:

```ts
table.row([ 'archivo.ts', this.colors.green('DONE') ])
table.fullWidth().fluidColumn(1).render()
```


## Stickers (Cuadros destacados)

Muestra textos o instrucciones en cuadros resaltados para llamar la atención:

```ts
const sticker = this.ui.sticker()
sticker.add('Servidor iniciado')
sticker.add('')
sticker.add(`URL: ${this.colors.cyan('http://localhost:3333')}`)
sticker.render()
```


## Tareas (Tasks)

Widget para mostrar progreso animado de varias tareas consecutivas o paralelas:

```ts
const tasks = this.ui.tasks()

tasks.add('Clonando repo', async (task) => {
  // Tarea 1
  return 'Completado'
})
.add('Actualizando paquete', async () => {
  // Tarea 2 fallida
  return task.error('Error al actualizar')
})
.add('Instalando dependencias', async () => {
  // Tarea 3 correcta
  return 'Instalado'
})
.run()
```

Puedes actualizar el estado/progreso de la tarea en tiempo real con:

```ts
task.update('Descarga al 40%')
```

Habilita modo verbose para renderizado detallado (útil para depuración):

```ts
const tasks = this.ui.tasks({ verbose: this.verbose })
```


## Uso de ANSI Colors

Accede al helpers de colores a través de `this.colors`, usa métodos como:

```ts
this.colors.red('Error')
this.colors.bgGreen().white(' Éxito ')
```


***

¿Quieres este resumen en archivo markdown o en formato para tu sistema de documentación? Dime.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/ace/terminal-ui

[^2]: https://docs.adonisjs.com/guides/ace/terminal-ui

[^3]: https://docs.adonisjs.com/guides/ace/introduction

[^4]: https://v5-docs.adonisjs.com/guides/ace-commandline

[^5]: https://docs.adonisjs.com/guides/ace/prompts

[^6]: https://github.com/thetutlage/ace-sample-project

[^7]: https://docs.adonisjs.com/guides/testing/console-tests

[^8]: https://docs.adonisjs.com

[^9]: https://docs.adonisjs.com/guides/references/commands

[^10]: https://docs.adonisjs.com/guides/ace/arguments

[^11]: https://docs.adonisjs.com/guides/concepts/application

