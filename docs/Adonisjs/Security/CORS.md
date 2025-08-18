<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [CORS (Security) | AdonisJS Documentation](https://docs.adonisjs.com/guides/security/cors)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **CORS (Security)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# CORS (Security) | AdonisJS Documentation

> Fuente oficial: [CORS (Security) | AdonisJS Documentation](https://docs.adonisjs.com/guides/security/cors)

***

## ¿Qué es CORS y para qué sirve?

- CORS (Cross-Origin Resource Sharing) protege tu app de peticiones no autorizadas (AJAX/fetch desde otros dominios).
- Navegadores bloquean peticiones cross-origin automáticamente a menos que configures políticas CORS.
- AdonisJS provee el paquete `@adonisjs/cors` para implementar estas políticas vía middleware.

***

## Instalación y configuración básica

```bash
node ace add @adonisjs/cors
```

- Registra el provider en `adonisrc.ts`.
- Crea `config/cors.ts`.
- Registra el middleware global en el kernel:

```js
server.use([() => import('@adonisjs/cors/cors_middleware')])
```


***

## Configuración en `config/cors.ts`

```js
import { defineConfig } from '@adonisjs/cors'

export default defineConfig({
  enabled: true,
  origin: true, // o false, o array, o '*', o función dinámica
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true, // o array, o false, o función
  exposeHeaders: [],
  credentials: true,
  maxAge: 90,
})
```


### Principales opciones:

- **enabled:** Encender/apagar middleware temporalmente.
- **origin:** Controla el header `Access-Control-Allow-Origin`.
    - `true`: permite origen actual del request.
    - `false`: bloquea.
    - `['dominio.com']`: array de dominios.
    - `'*'`: permite todos (ojo con credentials!).
    - Función: lógica custom por request.
- **methods:** Métodos HTTP permitidos en preflight (`OPTIONS`).
- **headers:**
    - `true`: permite todos los headers.
    - Array de strings: headers permitidos explícitos.
    - Función: customización por request.
- **exposeHeaders:** Headers visibles vía `Access-Control-Expose-Headers`.
- **credentials:** Añade/omite header `Access-Control-Allow-Credentials`.
- **maxAge:** Tiempo cache preflight (en segundos).

***

## Debug de CORS

- Los problemas suelen resolverse revisando y entendiendo los headers de respuesta enviados por tu servidor.
- Lee recursos y tutoriales de CORS si tienes dudas concretas sobre el comportamiento en el navegador.

***

¿Quieres este contenido como archivo `.md` o preparado para tu sistema de documentación o IA? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/security/cors

