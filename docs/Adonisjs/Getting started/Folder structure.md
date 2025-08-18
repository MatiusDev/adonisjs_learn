<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Folder structure (Getting started) | AdonisJS Documentation](https://docs.adonisjs.com/guides/getting-started/folder-structure)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Folder structure (Getting started)** de AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Folder structure (Getting started) | AdonisJS Documentation

> Fuente oficial: [Folder structure (Getting started) | AdonisJS Documentation](https://docs.adonisjs.com/guides/getting-started/folder-structure)

***

## Descripción general

AdonisJS proporciona una estructura de carpetas predeterminada para mantener los proyectos ordenados y fáciles de refactorizar. Esta estructura se puede adaptar libremente según las necesidades del equipo o proyecto.

***

## Archivos y carpetas principales

### `adonisrc.ts`

- Configura el workspace y ajustes de runtime.
- Permite registrar providers, definir alias de comandos, y los archivos a copiar a producción.


### `tsconfig.json`

- Configuración de TypeScript.
- Opciones recomendadas para AdonisJS:

```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "isolatedModules": true,
    "declaration": false,
    "outDir": "./build",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true
  }
}
```


### Sub-path imports (`package.json`)

- Alias para importar rutas fácilmente:

```json
"imports": {
  "#controllers/*": "./app/controllers/*.js",
  "#exceptions/*": "./app/exceptions/*.js",
  "#models/*": "./app/models/*.js",
  "#mails/*": "./app/mails/*.js",
  "#services/*": "./app/services/*.js",
  "#listeners/*": "./app/listeners/*.js",
  "#events/*": "./app/events/*.js",
  "#middleware/*": "./app/middleware/*.js",
  "#validators/*": "./app/validators/*.js",
  "#providers/*": "./app/providers/*.js",
  "#policies/*": "./app/policies/*.js",
  "#abilities/*": "./app/abilities/*.js",
  "#database/*": "./database/*.js",
  "#tests/*": "./tests/*.js",
  "#start/*": "./start/*.js",
  "#config/*": "./config/*.js"
}
```


***

## Directorios más usados

### `bin/`

- Archivos de entrada para cada entorno.
    - `server.ts`: inicia el app en entorno web (HTTP).
    - `console.ts`: inicia comandos Ace.
    - `test.ts`: ejecuta tests.


### `ace.js`

- Arranca el CLI ace para comandos locales.
- Extensión `.js` para ser ejecutado por `node` sin compilar.


### `app/`

- Código principal de dominio: controllers, models, services, etc.

Ejemplo:

```
app/
  controllers/
  exceptions/
  middleware/
  models/
  validators/
```


### `resources/`

- Plantillas Edge y archivos fuente de frontend.

Ejemplo:

```
resources/
  views/
  js/
  css/
  fonts/
  images/
```


### `start/`

- Archivos importados en el ciclo de boot: routes, kernels, eventos, validadores.

Ejemplo:

```
start/
  env.ts
  kernel.ts
  routes.ts
  validator.ts
  events.ts
```

- No se auto-importan; sólo convención.


### `public/`

- Archivos estáticos (css, imágenes, frontend JS).
- **Diferencia**: `resources` = fuente; `public` = output compilado.
- Con Vite, los assets van en `resources` y el output en `public`.


### `database/`

- Migraciones y seeders.

Ejemplo:

```
database/
  migrations/
  seeders/
```


### `commands/`

- Comandos Ace personalizados.


### `config/`

- Archivos de configuración de runtime.

Ejemplo:

```
config/
  app.ts
  bodyparser.ts
  cors.ts
  database.ts
  drive.ts
  hash.ts
  logger.ts
  session.ts
  static.ts
```


### `types/`

- Interfaces y tipos TypeScript personalizados.

Ejemplo:

```
types/
  events.ts
  container.ts
```


### `providers/`

- Service providers customizados.

Ejemplo:

```
providers/
  app_provider.ts
  http_server_provider.ts
```


### `tmp/`

- Archivos temporales y generados (ej: uploads, logs).
- Debe estar en `.gitignore`, no copiar a producción.


### `tests/`

- Organización de tests: unitarios, funcionales, regresión.

Ejemplo:

```
tests/
  bootstrap.ts
  functional/
  regression/
  unit/
```


***

## Resumen

AdonisJS facilita una separación clara del código, configuraciones, y assets para mantener la mantenibilidad, claridad y extensibilidad del proyecto. Cada carpeta tiene un propósito concreto que acelera el desarrollo profesional y ordenado.

***

¿Quieres este contenido como archivo `.md` para importar o alguna estructura especial? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/getting-started/folder-structure

