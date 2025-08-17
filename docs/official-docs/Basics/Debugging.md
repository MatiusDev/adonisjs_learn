<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Debugging (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/debugging)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Debugging (Basics)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Debugging (Basics) | AdonisJS Documentation

> Fuente oficial: [Debugging (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/debugging)

***

## Debug con VSCode

- Crea `.vscode/launch.json` y usa Node.js debugger.
- Ejemplo de configuración:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Dev server",
      "program": "${workspaceFolder}/ace.js",
      "args": ["serve", "--hmr"],
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Tests",
      "program": "${workspaceFolder}/ace.js",
      "args": ["test", "--watch"],
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "type": "node",
      "request": "attach",
      "name": "Attach Program",
      "port": 9229,
      "autoAttachChildProcesses": true,
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

- Usa `(CMD + Shift + P)` > *Debug: Select and Start Debugging* para seleccionar la configuración.
- Para comandos Ace arbitrarios, usa `node --inspect ace comando`.

***

## Debug de Edge templates

- Usa `@debugger` en la plantilla para un breakpoint manual.

```edge
@debugger
```


***

## Dump and Die (`dd`)

- Alternativa avanzada a `console.log`.
- Detiene la ejecución y muestra la variable en el navegador o terminal.

```js
import { dd } from '@adonisjs/core/services/dumper'
dd(variable)
```

- Ventajas:
    - Muestra ubicación del código.
    - Inspección profunda de objetos y prototipos.
    - Soporta temas visuales (HTML).


### Helpers en Edge

- `@dd(variable)`: detiene y muestra.
- `@dump(variable)`: sólo muestra, sigue ejecutando.
    - Asegúrate de incluir el stack `@stack('dumper')` en tu layout.

***

## Configuración de dumper

En `config/app.ts` bajo la clave `dumper` puedes personalizar:

- Profundidad de inspección (`depth`)
- Si mostrar miembros estáticos, prototipo, etc.
- Máximo largo de array/string.
- Clases a colapsar por defecto.

```js
export const dumper = dumperConfig({
  console: {
    depth: 10,
    collapse: ['DateTime', 'Date'],
    inspectStaticMembers: true,
  },
  html: {
    depth: 10,
    inspectStaticMembers: true,
  }
})
```


***

## Debug logs internos de AdonisJS

- Usa la variable de entorno `NODE_DEBUG` para ver logs de paquetes de AdonisJS o módulos nativos de Node:

```bash
NODE_DEBUG="adonisjs:*" node ace serve --hmr
NODE_DEBUG="adonisjs:*,net,fs" node ace serve --hmr
```


***

¿Quieres este contenido en archivo `.md` o alguna adaptación para plataformas IA? Dímelo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/basics/debugging

