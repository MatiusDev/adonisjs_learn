<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [TypeScript build process (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/typescript-build-process)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **TypeScript build process (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# TypeScript build process (Concepts) | AdonisJS Documentation

> Fuente oficial: [TypeScript build process (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/typescript-build-process)

***

## Herramientas de compilación en AdonisJS

AdonisJS elige un enfoque sencillo y probado, usando:

- **TSC**: Compilador oficial de TypeScript. Se usa para **type-checking** y para crear el build de producción (standalone JS).
- **TS Node Maintained**: Para desarrollo, compila TS “Just in Time” y permite ejecutar archivos TS sin convertirlos previamente.
- **SWC**: Compilador de TS (implementación en Rust) que acelera el JIT/development junto con TS Node.

| Herramienta | Uso | Type checking |
| :-- | :-- | :-- |
| `TSC` | Build producción | Sí |
| `TS Node` | Desarrollo | No |
| `SWC` | Desarrollo | No |


***

## Ejecutar archivos TypeScript sin compilar

Puedes ejecutar archivos `.ts` sin compilar usando TS Node Maintained y el flag `--import`:

```bash
node --import=ts-node-maintained/register/esm bin/server.js
node --import=ts-node-maintained/register/esm bin/test.ts
node --import=ts-node-maintained/register/esm bin/console.ts
node --import=ts-node-maintained/register/esm path/to/file.ts
```

> **Nota sobre extensiones:**
Aunque el archivo en disco sea `.ts`, muchas veces el import/referencia debe ser `.js` por el sistema ESModules. Desde TypeScript 5.7 puedes usar `.ts` nativamente en imports para algunas herramientas modernas.

***

## Servidor de desarrollo

Se recomienda usar el comando de AdonisJS:

```bash
node ace serve --watch
```

Ventajas:

- Incluye file watcher y reinicia server automáticamente en cambios.
- Detecta el bundler de frontend (ej: Vite) y lanza su dev server si corresponde.

Extras:

- Pasar argumentos a Vite:

```bash
node ace serve --watch --assets-args="--debug --base=/public"
```

- No lanzar dev server de assets:

```bash
node ace serve --watch --no-assets
```

- Pasar flags de Node.js:

```bash
node ace --no-warnings --inspect serve --watch
```


***

## Crear build de producción

Utiliza:

```bash
node ace build
```

El build production realiza:

- Borra `./build` si existe.
- Reescribe `ace.js` eliminando el loader TS Node/ESM.
- Compila assets con Vite si aplica.
- Usa `tsc` para transpilar TS a JS.
- Copia los archivos registrados en `metaFiles` a `./build`.
- Copia `package.json` y `package-lock.json` o `yarn.lock` a `./build`.

> **Ojo:** Si modificas manualmente `ace.js`, esos cambios se perderán con el build.

Para lanzar el build:

```bash
cd build
npm ci --omit=dev
node bin/server.js
```

Opciones adicionales:

- Argumentos a Vite build:

```bash
node ace build --assets-args="--debug --base=/public"
```

- Sin compilar frontend assets:

```bash
node ace build --no-assets
```


***

## ¿Qué es un standalone build?

- Es la salida JS lista para correr en producción sin los archivos fuente TypeScript.
- Permite reducir el tamaño desplegado y simplifica el proceso en producción: basta con copiar `./build`, instalar dependencias y lanzar el server.

***

¿Quieres este contenido en archivo `.md` listo para importar, o alguna estructura especial para tu base de conocimientos IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/typescript-build-process

