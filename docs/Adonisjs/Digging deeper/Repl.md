<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Repl (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/repl)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Repl (Digging deeper)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# REPL (Digging deeper) | AdonisJS Documentation

> Fuente oficial: [Repl (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/repl)

***

## ¿Qué es el REPL de AdonisJS?

- Es un REPL interactivo, *application-aware*, sobre el de Node.js.
- Permite interactuar, probar código y acceder a servicios/clases de tu app en tiempo real.
- Comando para iniciar:

```bash
node ace repl
```


***

## Principales ventajas sobre el REPL estándar

- Importación y ejecución de archivos TypeScript.
- Atajos para importar servicios (router, hash, helpers, etc).
- Instanciación rápida de clases y acceso a IoC container.
- Extensible: puedes agregar métodos y comandos personalizados.

***

## Trucos y funcionamiento interactivo

- **Prompt:** ejecuta JS y muestra el resultado.
- `.editor` ⇒ Modo editor multilinea (Ctrl+D para ejecutar, Ctrl+C para cancelar).
- Puedes acceder al resultado de la última instrucción con `_` (y largo de string, etc.).
- Accede al último error con la variable `_error`.
- Historial persistido en `~/.adonisjs_v6_repl_history` (reutiliza con ↑ o Ctrl+R).
- Salida: `.exit` o Ctrl+C dos veces.

***

## Importar módulos

- Usar imports dinámicos:

```js
const { default: User } = await import('#models/user')
// o shortcut:
const User = await importDefault('#models/user')
```


***

## Métodos helper en REPL

- `.ls` : muestra métodos globales disponibles (importDefault, make, loadApp, loadHash, loadRouter, loadHelpers, etc).
- Ejemplo: `await loadRouter()` pone el router en el contexto para uso inmediato.

***

## Métodos y comandos custom

- Puedes definir tus propios métodos para el REPL usando `repl.addMethod`:

```js
repl.addMethod('loadModels', async () => {
  // Carga todos los modelos al contexto "models"
}, { description: "Carga todos los modelos", usage: "await loadModels()" })
```

- Ubica este código en un archivo preload especial (ej: `start/repl.ts`).

***

## Buenas prácticas

- Si editas código de tu app, reinicia el REPL para ver los cambios.
- Usa el REPL como laboratorio de consulta, debug y pruebas rápidas sobre tu app.

***

¿Quieres este contenido como archivo `.md` u otro formato para documentación/IA? Indícalo.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/digging-deeper/repl

