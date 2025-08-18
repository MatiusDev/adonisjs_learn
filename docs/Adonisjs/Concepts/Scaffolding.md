<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Scaffolding (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/scaffolding)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Scaffolding and codemods (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Scaffolding and codemods (Concepts) | AdonisJS Documentation

> Fuente oficial: [Scaffolding (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/scaffolding)

***

## ¿Qué es el scaffolding en AdonisJS?

- El scaffolding genera archivos fuente a partir de plantillas estáticas (“stubs”).
- Los codemods permiten modificar el código TypeScript automáticamente, parseando el AST.
- AdonisJS usa ambos para acelerar tareas repetitivas (crear archivos, configurar paquetes).

***

## Componentes principales

### Stubs

- Son las plantillas para generar archivos mediante comandos (make:controller, etc.).
- Se procesan como archivos `.stub` usando Tempura (engine compatible con handlebars).

Ejemplo de stub:

```handlebars
export default class {{ modelName }}Resource {
  serialize({{ modelReference }}: {{ modelName }}) {
    return {{ modelReference }}.toJSON()
  }
}
```


### Generadores

- Los generadores ayudan a mantener las convenciones de nombres (archivos, clases, métodos) y pueden ser personalizados.

```handlebars
{{#var entity = generators.createEntity(name)}}
{{#var modelName = generators.modelName(entity.name)}}
{{#var modelReference = string.camelCase(modelName)}}
{{#var resourceFileName = string(modelName).snakeCase().suffix('_resource').ext('.ts').toString()}}
```


### Codemods

- Basados en `@adonisjs/assembler` y `ts-morph`.
- Solo disponibles en desarrollo.
- Utilizados para tareas como agregar providers, registrar middleware, actualizar `adonisrc.ts`, etc.

***

## Ejemplo de uso de stubs en un comando

```ts
import { BaseCommand } from '@adonisjs/core/ace'
const STUBS_ROOT = new URL('./stubs', import.meta.url)

export default class MakeApiResource extends BaseCommand {
  async run() {
    const codemods = await this.createCodemods()
    await codemods.makeUsingStub(STUBS_ROOT, 'api_resource.stub', { name: this.name })
  }
}
```


***

## Destino de los archivos generados

La ruta destino se puede especificar en el propio stub usando la función `exports`:

```handlebars
exports({
  to: app.makePath('app/api_resources', entity.path, resourceFileName)
})
```


***

## Ejecting stubs

- Usa el comando `node ace eject` para copiar un stub o un directorio de stubs al proyecto (`stubs/`).
- Puedes ejectar stubs de otros paquetes con el flag `--pkg`.

```bash
node ace eject make/controller/main.stub
node ace eject make/controller --pkg=@adonisjs/core
```


***

## Personalización con flags

- Todos los comandos de scaffolding pasan los CLI flags al stub, permitiendo adaptar el workflow o la ruta de destino.

Ejemplo:

```bash
node ace make:controller invoice --feature=billing
```

En el stub:

```handlebars
{{#var featureDirectoryName = flags.feature}}
exports({
  to: app.makePath('features', featureDirectoryName, controllerFileName)
})
```


***

## Variables y helpers disponibles siempre en stubs

| Variable | Descripción |
| :-- | :-- |
| app | Instancia de la clase Application |
| generators | Módulo de generadores (nombres, archivos, etc.) |
| randomString | Helper para cadenas aleatorias |
| string | Helper para transformar cadenas (camelCase, etc.) |
| flags | Flags CLI enviados al comando |


***

## Codemods API (principales métodos)

- `defineEnvValidations`: Define reglas de validación para variables de entorno.
- `defineEnvVariables`: Añade variables a `.env` y `.env.example`.
- `registerMiddleware`: Registra middleware en los stacks conocidos (server, router, named).
- `updateRcFile`: Actualiza `adonisrc.ts` para providers, comandos, aliases, metaFiles.
- `registerJapaPlugin`: Agrega plugins a `tests/bootstrap.ts`.
- `registerPolicies`: Registra policies en `app/policies/main.ts`.
- `registerVitePlugin`: Agrega plugins a `vite.config.ts`.
- `installPackages`: Instala paquetes usando el package manager detectado.
- `getTsMorphProject`: Permite transformaciones personalizadas con ts-morph.

***

¿Quieres este contenido listo como archivo `.md` para importar, o alguna estructura especial para tu base de conocimientos IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/scaffolding

