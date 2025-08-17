<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Assembler hooks (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/assembler-hooks)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Assembler hooks (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Assembler hooks (Concepts) | AdonisJS Documentation

> Fuente oficial: [Assembler hooks (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/assembler-hooks)

***

## ¿Qué son los assembler hooks?

- Los assembler hooks te permiten ejecutar código en puntos específicos del ciclo de vida del assembler de AdonisJS.
- El assembler administra el dev server, el build de la aplicación y la ejecución de tests.
- Los hooks son útiles para tareas como generación de archivos, compilación de código o integración de pasos custom en el build.

**Ejemplo:**
El paquete `@adonisjs/vite` usa el hook `onBuildStarting` para compilar los assets del frontend antes del resto del build cuando se ejecuta `node ace build`.

***

## ¿Cómo se agregan hooks?

- Se definen en el archivo `adonisrc.ts` bajo la propiedad `hooks`.
- Cada hook es un array de funciones a ejecutar.
- Se recomienda **importar dinámicamente** los hooks para evitar carga innecesaria en el arranque.

Ejemplo:

```js
import { defineConfig } from '@adonisjs/core/app'

export default defineConfig({
  hooks: {
    onBuildCompleted: [
      () => import('my-package/hooks/on_build_completed'),
    ],
    onBuildStarting: [
      () => import('my-package/hooks/on_build_starting'),
    ],
    onDevServerStarted: [
      () => import('my-package/hooks/on_dev_server_started'),
    ],
    onSourceFileChanged: [
      () => import('my-package/hooks/on_source_file_changed'),
    ],
  },
})
```


***

## Crear un hook

Un hook es simplemente una función asíncrona exportada como default.

Ejemplo de hook personalizado para un build task:

```js
import type { AssemblerHookHandler } from '@adonisjs/core/types/app'

const buildHook: AssemblerHookHandler = async ({ logger }) => {
  logger.info('Generating some files...')
  await myCustomLogic()
}

export default buildHook
```

Luego se registra en `adonisrc.ts`:

```js
import { defineConfig } from '@adonisjs/core/app'

export default defineConfig({
  hooks: {
    onBuildStarting: [
      () => import('./hooks/on_build_starting'),
    ],
  },
})
```

Cada vez que ejecutes `node ace build`, ejecutará el hook definido.

***

## Lista de hooks disponibles

| Hook | Momento de ejecución | Uso típico |
| :-- | :-- | :-- |
| `onBuildStarting` | Antes de iniciar el build | Generación de archivos, integración custom |
| `onBuildCompleted` | Al finalizar el build | Acciones post-build |
| `onDevServerStarted` | Al arrancar el dev server | Notificaciones, integración |
| `onSourceFileChanged` | Cada vez que se modifica un archivo fuente | Tareas ante cambios (ej: hot reload) |


***

¿Necesitas este contenido como archivo `.md` o alguna estructura especial para importar/entrenar tu IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/assembler-hooks

