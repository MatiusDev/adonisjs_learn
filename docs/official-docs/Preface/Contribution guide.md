<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Contribution Guide (Preface) | AdonisJS Documentation](https://docs.adonisjs.com/guides/preface/contribution-guide)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Contribution Guide (Preface)** de AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Contribution Guide (Preface) | AdonisJS Documentation

> Fuente oficial: [Contribution Guide (Preface) | AdonisJS Documentation](https://docs.adonisjs.com/guides/preface/contribution-guide)

***

## Formas de contribuir

No solo el código cuenta como contribución; también puedes:

- Corregir errores tipográficos en la documentación.
- Mejorar la documentación existente.
- Escribir cookbooks o artículos técnicos para la comunidad.
- Triaging de issues y compartir opiniones en los mismos.
- Ayudar en Discord y los foros de discusión.

***

## Reporte de bugs

Antes de abrir un issue, depura y verifica el problema.

Categoría de issues:

- **Perfecta:** Bug aislado y reproducible con un test fallido en el repo.
- **Buena:** Bug aislado con una reproducción mínima en GitHub.
- **Decente:** Issue bien explicada, con código relevante, archivos de configuración y versión.
- **Pobre:** Pregunta genérica con poca información; este tipo de issues se cierran automáticamente.

Usa siempre formato markdown adecuado para los bloques de código.

***

## Discusiones y propuestas

- Para discutir ideas: crea temas en la categoría **💡Ideas** del foro.
- Para compartir recetas o artículos: usa la categoría **📚 Cookbooks**.

***

## Pull Requests

- Se recomienda discutir primero cualquier cambio antes de comenzar a trabajar en un PR.
- PRs para bugs suelen aceptarse tras confirmación del error.
- Si propones una nueva funcionalidad, explica la necesidad y proporciona material educativo relevante.
- Debes estar listo para ayudar a documentar cualquier funcionalidad nueva que aportes.

***

## Preparación del repositorio

1. Clona el repositorio en tu máquina local.
2. Instala dependencias solo con `npm install` (no uses yarn).
3. Ejecuta tests con `npm test`.
4. No actualices dependencias como parte de una feature; haz un PR específico para esto.

***

## Herramientas utilizadas

| Herramienta | Uso |
| :-- | :-- |
| TypeScript | Todos los repos son escritos en TypeScript. |
| TS Node | Ejecuta tests/scripts sin compilar TS. |
| SWC | Compilador TS rápido, integrado en TS Node. |
| Release-It | Publica paquetes en npm y GitHub. |
| ESLint | Estilo de código, reglas bajo eslint-plugin-adonis. |
| Prettier | Formatea el código para salida consistente. |
| EditorConfig | Configura reglas de indentación y whitespace. |
| Conventional Changelog | Commitlint para mensajes coherentes. |
| Husky | Enforce convenciones con git hooks. |


***

## Comandos frecuentes

| Comando | Descripción |
| :-- | :-- |
| `npm run test` | Ejecuta los tests usando ts-node |
| `npm run compile` | Compila TypeScript a JavaScript en `build` |
| `npm run release` | Inicia proceso de release con np |
| `npm run lint` | Lint del código con ESLint |
| `npm run format` | Formatea el código con Prettier |
| `npm run sync-labels` | Sincroniza labels de github (solo admins) |

Antes de subir código, ejecuta:

```bash
npm run format   # Para formatear con Prettier
npm run lint     # Para analizar con ESLint
```


***

## Reconocimiento de contribuciones

- GitHub muestra a los contributors en la barra lateral del repo.
- Los release notes de GitHub incluyen referencias automáticas a los contribuyentes.

***

¿Te gustaría este contenido en formato `.md` listo para importar, o con alguna estructura especial para tu sistema de IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/preface/contribution-guide

