<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Introduction (Ace commands) | AdonisJS Documentation](https://docs.adonisjs.com/guides/ace/introduction)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Introduction (Ace commands)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Introduction (Ace commands) | AdonisJS Documentation

> Fuente oficial: [Introduction (Ace commands) | AdonisJS Documentation](https://docs.adonisjs.com/guides/ace/introduction)

***

## ¿Qué es Ace?

- Es el framework de **línea de comandos** (CLI) de AdonisJS.
- Todos los comandos (creación de modelos, controladores, migraciones, etc) se ejecutan vía `node ace`.
- El archivo principal `ace.js` (no TS) es el entry point y arranca el entorno TypeScript/setea hooks internos.

***

## Comandos estándar

- Ver todos los comandos:

```bash
node ace
# o
node ace list
```

- Ver ayuda detallada de un comando:

```bash
node ace make:controller --help
```

- Salida de ayuda está estructurada según el estándar docopt.

***

## Colores en consola

- Ace detecta si tu terminal soporta colores.
- Fuerza/deshabilita colores:

```bash
node ace list --no-ansi    # Sin colores
node ace list --ansi       # Forzar colores
```


***

## Alias de comandos

- Puedes definir shortcuts en el objeto `commandsAliases` de tu `adonisrc.ts`:

```js
commandsAliases: {
  resource: 'make:controller --resource --singular'
}
# Uso:
node ace resource admin
# Expande a:
# node ace make:controller --resource --singular admin
```


***

## Ejecución programática de comandos

- Usa el servicio ace para correr comandos desde código JS/TS:

```js
import ace from '@adonisjs/core/services/ace'

// Ejecuta comando y obtiene resultado
const cmd = await ace.exec('make:controller', ['user', '--resource'])
console.log(cmd.exitCode)
console.log(cmd.result)
console.log(cmd.error)
```

- Puedes chequear si un comando existe antes de ejecutarlo:

```js
await ace.boot()
if (ace.hasCommand('make:controller')) {
  await ace.exec('make:controller', ['user', '--resource'])
}
```


***

¿Quieres este contenido como archivo `.md` o adaptado para tu sistema de documentación/IA? Indícalo.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/ace/introduction

