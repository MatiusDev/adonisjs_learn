<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Tooling config (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/tooling-config)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Tooling config (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Tooling config (Concepts) | AdonisJS Documentation

> Fuente oficial: [Tooling config (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/tooling-config)

***

## Filosofía y herramientas

AdonisJS promueve una experiencia de desarrollo consistente y agradable usando:

- **TypeScript** para tipado y revisiones estáticas.
- **Prettier** para formato automático y homogéneo del código.
- **ESLint** para reglas de calidad y buenas prácticas.
- Todas las preferencias y reglas están centralizadas en presets listos para usar en los starter kits y paquetes oficiales.

***

## Configuración de TypeScript: `@adonisjs/tsconfig`

- Incluye config base para proyectos con TypeScript y AdonisJS.
- Usa `"module": "NodeNext"` y Just-in-Time compilation con `TS Node + SWC`.
- Puedes instalar y aplicar el preset:

```bash
npm i -D @adonisjs/tsconfig
npm i -D typescript ts-node-maintained @swc/core
```

Para apps AdonisJS:

```json
"extends": "@adonisjs/tsconfig/tsconfig.app.json",
"compilerOptions": {
  "rootDir": "./",
  "outDir": "./build"
}
```

Para paquetes oficiales:

```json
"extends": "@adonisjs/tsconfig/tsconfig.package.json",
"compilerOptions": {
  "rootDir": "./",
  "outDir": "./build"
}
```


***

## Configuración de Prettier: `@adonisjs/prettier-config`

- Preset de formato código fuente para mantener el estilo uniforme.

Instalación:

```bash
npm i -D @adonisjs/prettier-config
npm i -D prettier
```

En `package.json`, agrega:

```json
"prettier": "@adonisjs/prettier-config"
```

No olvides crear `.prettierignore` para excluir ciertas carpetas (ejemplo: `build`, `node_modules`).

***

## Configuración de ESLint: `@adonisjs/eslint-config`

- Preset de reglas de linting.
- Incluye `eslint-plugin-prettier` para integración perfecta entre ESLint y Prettier.

Instalación:

```bash
npm i -D @adonisjs/eslint-config
npm i -D eslint
```

Para una app AdonisJS:

```json
"eslintConfig": {
  "extends": "@adonisjs/eslint-config/app"
}
```

Para un paquete:

```json
"eslintConfig": {
  "extends": "@adonisjs/eslint-config/package"
}
```


***

## Resumen

Usar estos presets asegura:

- Consistencia entre proyectos AdonisJS.
- Menos configuración manual.
- Mejor soporte en equipos y proyectos colaborativos.
- Los starter kits oficiales ya vienen preconfigurados con estos presets.

***

¿Te gustaría este contenido como archivo `.md` o algún formato especial para tu base de conocimiento o herramienta IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/tooling-config

