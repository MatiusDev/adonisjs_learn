<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url  [HTTP overview (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/http-overview)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **HTTP overview (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# HTTP overview (Concepts) | AdonisJS Documentation

> Fuente oficial: [HTTP overview (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/http-overview)

***

## Capa HTTP en AdonisJS

AdonisJS es esencialmente un framework web para aplicaciones que responden a peticiones HTTP. La capa HTTP está construida desde cero, no utiliza microframeworks externos.

### Módulos de la capa HTTP

- **Router**: Define endpoints (rutas); cada ruta referencia a un handler (closure o clase controlador).
- **Controllers**: Clases JS que gestionan la lógica de negocio y se vinculan a rutas.
- **HttpContext (`ctx`)**: Instancia por cada request, contiene datos como body, headers, usuario autenticado, etc.
- **Middleware**: Pipeline basado en el patrón "Chain of Responsibility". Permite interceptar y responder requests antes del handler.
- **Exception handler global**: Centraliza el manejo de excepciones y transforma errores en respuestas HTTP o los reporta a sistemas externos.
- **Server**: Une router, middleware y exception handler, expone el método `handle` vinculado al servidor HTTP de Node.js.

***

## ¿Cómo se inicia el servidor HTTP?

- El método `boot` de la clase Server inicia la aplicación HTTP:
    - Crea el pipeline de middleware.
    - Compila rutas.
    - Importa e instancia el exception handler global.

En una app típica, el método `boot` es llamado por el módulo Ignitor desde `bin/server.ts`.
Debes definir rutas, middleware y exception handler **antes** de llamar a `boot`, normalmente desde los archivos preload `start/routes.ts` y `start/kernel.ts`.

***

## Ciclo de vida de una petición HTTP

1. **Creación de HttpContext**
    - El servidor crea una instancia de HttpContext y la pasa a middleware, handlers y el exception handler.
    - Si AsyncLocalStorage está activo, la misma instancia se comparte por contexto local.
2. **Ejecución del middleware de servidor**
    - Middleware de servidor se ejecutan primero y pueden responder la request antes de pasar a rutas.
    - Todas las peticiones pasan por el middleware, tengan o no una ruta definida.
3. **Búsqueda de la ruta**
    - Si ningún middleware de servidor responde, se busca una ruta por `req.url`.
    - Si no existe, retorna `404 - Not found`.
4. **Ejecución del middleware de ruta**
    - Si la ruta existe, se ejecutan middleware globales y "named" middleware correspondientes.
5. **Handler de ruta**
    - Finalmente el request llega al handler de la ruta (controlador, closure, etc.) y se genera la respuesta.
6. **Manejo de excepciones**
    - Si ocurre una excepción, el request es enviado al exception handler global que la convierte en respuesta.
7. **Serialización de respuesta**
    - Al definir el cuerpo de la respuesta (con `response.send` o devolviendo un valor), AdonisJS serializa la respuesta y aplica los headers adecuados.

***

¿Necesitas este contenido en archivo `.md` para importar, o alguna estructuración especial para tu base de conocimientos IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/http-overview

