<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Commands (References) | AdonisJS Documentation](https://docs.adonisjs.com/guides/references/commands)

Aquí tienes un resumen detallado y estructurado basado en la documentación oficial de AdonisJS sobre los comandos Ace.

***

# Referencia de comandos en AdonisJS (Ace)

Fuente: [Commands (References)](https://docs.adonisjs.com/)

## Ejecutar comandos base

- Ejecutar comandos:

```bash
node ace
```

- Listar comandos:

```bash
node ace list
```

- Obtener ayuda de un comando:

```bash
node ace <command> --help
```


## Comandos más usados

### serve

- Levanta servidor en modo desarrollo.
- Opciones comunes:
`--hmr` (hot module reload), `--watch` (vigilar cambios), `--clear`, `--assets`, `--poll` (para docker).


### build

- Construye artefactos para producción.
- Opciones: ignorar errores TS (`--ignore-ts-errors`), definir gestor de paquetes, activar/desactivar assets.


### add

- Instala y configura paquetes al mismo tiempo.
- Ejemplo:

```bash
node ace add @adonisjs/lucid --dev --package-manager=yarn
```


### configure

- Configura paquetes ya instalados.


### make:\*

- Genera stubs para recursos:
    - `make:controller [nombre]` - controlador HTTP
    - `make:model [nombre]`
    - `make:middleware [nombre]`
    - `make:event [nombre]`
    - `make:validator [nombre]`
    - `make:listener [nombre]` (opcional con `--event`)
    - `make:service [nombre]`
    - `make:exception [nombre]`
    - `make:command [nombre]`
    - `make:view [nombre]`
    - `make:provider [nombre]`
    - `make:mail [nombre]` (opcional `--intent`)
    - `make:policy [nombre]`


### Otros comandos útiles

- `generate:key`: genera clave secreta y la almacena en `.env`.
- `inspect:rcfile`: revisa configuración global.
- `list:routes`: muestra rutas HTTP.


## Alias de comandos

- Setea alias para comandos frecuentes en `adonisrc.ts` en `commandsAliases`.
- Ejemplo:

```json
"commandsAliases": {
  "resource": "make:controller --resource --singular"
}
```

- Uso:

```bash
node ace resource admin
```


## Ciclo de vida en comandos personalizados

- Comandos implementan métodos:
    - `prepare()`
    - `interact()`
    - `run()`
    - `completed()`
- Soportan inyección de dependencias con decorador `@inject()`.


## Control de errores en comandos

- Usa `try/catch` en `run` o maneja errores en `completed`.
- Controla `exitCode` y registra errores con el logger del comando.


## Generación de manifiesto

- Tras agregar comandos, actualizar con:

```bash
node ace generate:manifest
```


***

¿Quieres que te prepare este contenido formateado y listo para guardar como archivo markdown? Dame el aviso.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/references/commands

[^2]: https://docs.adonisjs.com/guides/ace/introduction

[^3]: https://v5-docs.adonisjs.com/guides/ace-commandline

[^4]: https://legacy.adonisjs.com/docs/4.1/ace

[^5]: https://docs.adonisjs.com/guides/ace/creating-commands

[^6]: https://legacy.adonisjs.com/docs/4.0/ace

[^7]: https://docs.adonisjs.com/guides/ace/arguments

[^8]: https://docs.adonisjs.com/guides/ace/prompts

[^9]: https://docs.adonisjs.com/guides/references/commands

[^10]: https://docs.adonisjs.com/guides/ace/terminal-ui

[^11]: https://www.npmjs.com/package/@adonisjs/ace

