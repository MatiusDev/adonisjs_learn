<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Installation (Getting started) | AdonisJS Documentation](https://docs.adonisjs.com/guides/getting-started/installation)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Installation (Getting started)** de AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Installation (Getting started) | AdonisJS Documentation

> Fuente oficial: [Installation (Getting started) | AdonisJS Documentation](https://docs.adonisjs.com/guides/getting-started/installation)

***

## Requisitos previos

- **Node.js 20 o superior** es necesario para trabajar con AdonisJS.
- Se recomienda instalar Node.js usando instaladores oficiales o Volta (gestor multiplataforma para manejar varias versiones de Node.js).

```bash
node -v  # Ejemplo: v22.0.0
```


***

## Crear una nueva aplicación

Para crear un nuevo proyecto:

```bash
npm init adonisjs@latest hello-world
```


### CLI flags comunes

- `--kit`: Elige el starter kit (`web`, `api`, `slim`, `inertia`).
- `--db`: Elige el dialecto de base de datos (`sqlite`, `postgres`, `mysql`, `mssql`).
- `--git-init`: Inicializa el repo git (default: `false`).
- `--auth-guard`: Elige el guard de autenticación (`session`, `access_tokens`, `basic_auth`).

**Importante:** Usa doble guión (`-- --flag=value`) para pasar los flags al inicializador.

Ejemplos:

```bash
npm init adonisjs@latest hello-world -- --db=mysql
npm init adonisjs@latest hello-world -- --db=postgres --kit=api
npm init adonisjs@latest hello-world -- --kit=api --auth-guard=access_tokens
```


***

## Starter kits oficiales

Los starter kits ofrecen estructura de carpetas, configuración y herramientas específicas para distintos estilos de aplicación.

### Web starter kit

- Ideal para apps web tradicionales con renderizado server-side usando Edge.js.
- Recomendado para apps con interactividad limitada. Se pueden agregar Hotwire, HTMX, Unpoly y Alpine.js para mejorar la experiencia.
- Incluye: `@adonisjs/core`, `edge.js`, `@vinejs/vine`, `@adonisjs/lucid`, `@adonisjs/auth`, `@adonisjs/shield`, `@adonisjs/static`, `vite`.


### API starter kit

- Pensado para servidores JSON API; ideal para backend de apps con React, Vue, etc.
- No incluye archivos estáticos ni vistas.
- CSRF y XSS desactivados, CORS activado.
- Incluye autenticación basada en sesión; puedes cambiar a tokens con `--auth-guard`.


### Slim starter kit

- Configuración mínima, solo núcleo y estructura básica de carpetas.


### Inertia starter kit

- Permite SPAs server-driven usando frameworks como React, Vue, Solid o Svelte.
- Flags para elegir adaptador (`--adapter`) y SSR (`--ssr`, `--no-ssr`).


### Traer tu propio starter kit

- Puedes usar starter kits personalizados desde repositorios en GitHub, GitLab, o Bitbucket.
- Soporta modo Git+SSH y selección de rama, tag o commit.

Ejemplo:

```bash
npm init adonisjs@latest -- -K="github_user/repo#develop"
```


***

## Arrancar el servidor de desarrollo

Usa el comando:

```bash
node ace serve --hmr
```

- HMR (Hot Module Replacement) para desarrollo.
- Accede a tu app en [http://localhost:3333](http://localhost:3333).

***

## Compilar para producción

Las apps de AdonisJS se escriben en TypeScript y se deben compilar a JavaScript antes de producción:

```bash
node ace build
```

- El output va a la carpeta `build`.
- Si usas Vite, compila assets en `build/public`.

***

## Configuración del entorno de desarrollo

- Se recomienda usar **ESLint** para linting y **Prettier** para formato.
- Los starter kits ya incluyen configuración y se recomienda instalar los plugins en tu editor.
- Comandos útiles:

```bash
npm run lint        # Ejecuta ESLint
npm run lint -- --fix  # Autocorrige issues con ESLint
npm run format      # Ejecuta Prettier
```


***

## Extensiones recomendadas para VSCode

- **AdonisJS**: rutas, ace commands, migraciones, docs en VSCode.
- **Edge**: highlight, autocompletar y snippets para plantillas.
- **Japa**: ejecuta tests vía atajos o desde la barra de actividad.

***

¿Quieres este contenido ya preparado como un archivo `.md` o alguna adaptación específica? Indica tus preferencias de formato o estructura.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/getting-started/installation

