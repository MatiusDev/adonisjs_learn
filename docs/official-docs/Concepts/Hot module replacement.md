<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Hot module replacement (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/hot-module-replacement)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Hot module replacement (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Hot module replacement (Concepts) | AdonisJS Documentation

> Fuente oficial: [Hot module replacement (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/hot-module-replacement)

***

## ¿Qué es HMR en AdonisJS?

- HMR (“Hot Module Replacement”) en AdonisJS permite recargar módulos JS del backend al modificarse, sin reiniciar todo el proceso.
- Es muy útil para acelerar el ciclo de feedback durante el desarrollo.
- No repropaga estados ni actualiza el navegador; AdonisJS sólo recarga módulos del backend.
- Ideal tanto para APIs JSON como apps web tradicionales.

***

## Conceptos clave

- AdonisJS HMR **no actualiza el estado en el navegador** ni reconcilia frontend; sólo backend.
- Funciona **solamente** con imports dinámicos (ejemplo: controllers, middleware, listeners).
- Los imports de los módulos (“top-level imports” en controllers, servicios, modelos) también pueden beneficiarse.
- Los starter kits oficiales usan HMR por defecto.

***

## Uso y configuración

1. Instala el paquete hot-hook:

```bash
npm i -D hot-hook
```

2. Configura las “boundaries” en `package.json`:

```json
"hotHook": {
  "boundaries": [
    "./app/controllers/**/*.ts",
    "./app/middleware/*.ts"
  ]
}
```

3. Arranca el servidor en modo HMR:

```bash
node ace serve --hmr
```

4. (Opcional) Actualiza el script dev:

```json
"scripts": {
  "dev": "node ace serve --hmr"
}
```


***

## ¿Cuándo se hace HMR vs reload completo?

- Al iniciar con `--hmr`, AdonisJS y el paquete `hot-hook` crean un árbol de dependencias desde `bin/server.ts`.
- Solo los archivos importados se vigilan; archivos no importados no disparan reload/HMR.
- El array `boundaries` determina los archivos que aplican para HMR.
- **Nunca añadas config, providers, o preload files como boundaries:** en esos casos es preferible reiniciar el proceso, ya que tienen efectos secundarios difíciles de manejar.

**Regla:**

- Si el módulo es usado/executado sólo durante una petición HTTP, puede usarse HMR.
- Si el módulo es necesario para bootear la aplicación, debe reiniciarse el proceso.

***

## Técnica interna

- Si un archivo boundary cambia, se recarga sólo ese módulo usando HMR (estos suelen ser controllers, middleware, etc. gracias a su import dinámico).
- Si un archivo fuera de boundary cambia (como config, provider, preload), se reinicia el proceso completo para evitar efectos secundarios.

***

¿Quieres este contenido en archivo `.md` para importar, o alguna estructura especial para tu plataforma IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/hot-module-replacement

