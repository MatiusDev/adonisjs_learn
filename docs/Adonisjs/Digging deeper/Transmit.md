<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Transmit (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/transmit)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Transmit (Digging deeper)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Transmit (Digging deeper) | AdonisJS Documentation

> Fuente oficial: [Transmit (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/transmit)

***

## ¿Qué es Transmit?

- Módulo nativo de **Server-Sent Events (SSE)** para AdonisJS, ideal para notificaciones, chats, y actualizaciones en tiempo real server → cliente.
- **Solo el server puede mandar datos al cliente.** Cualquier comunicación inversa debe hacerse mediante POST/fetch.

***

## Instalación y configuración

1. Instala y configura:

```bash
node ace add @adonisjs/transmit
```

    - Agrega el provider, crea `config/transmit.ts`.
2. Instala el cliente en el frontend:

```bash
npm install @adonisjs/transmit-client
```

3. Configuración básica en `config/transmit.ts`:

```js
import { defineConfig } from '@adonisjs/transmit'
export default defineConfig({
  pingInterval: false, // o '10s' para mantener vivos los SSE con ping
  transport: null, // o configura 'redis' para múltiple instancia
})
```


- Si usas múltiples instancias/servidores, debes configurar transport (solo redis soportado).

***

## Rutas necesarias

- Registra rutas base con:

```js
import transmit from '@adonisjs/transmit/services/main'
transmit.registerRoutes()
```

- Puedes personalizar middlewares (ej: auth, rate limiting) pasando un callback a `registerRoutes`.

***

## Canales y authorization

- Los canales agrupan eventos (ej: `global`, `chats/1/messages`, `users/3`).
- Authoriza acceso a canales sensibles:

```js
transmit.authorize('users/:id', (ctx, { id }) => ctx.auth.user?.id === +id)
transmit.authorize('chats/:id/messages', async (ctx, { id }) => {
  const chat = await Chat.findOrFail(+id)
  return ctx.bouncer.allows('accessChat', chat)
})
```


***

## Enviar eventos (broadcast)

- Para enviar datos a canales:

```js
transmit.broadcast('global', { mensaje: 'Hola' })
transmit.broadcast('chats/1/messages', { texto: 'Nuevo mensaje' })
```

- Puedes exluir un suscriptor con `broadcastExcept(channel, data, uid)`

***

## Cliente: @adonisjs/transmit-client

- Inicia el cliente JS:

```js
import { Transmit } from '@adonisjs/transmit-client'
export const transmit = new Transmit({ baseUrl: window.location.origin })
```

- Suscripción:

```js
const subscription = transmit.subscription('chats/1/messages')
await subscription.create()
subscription.onMessage(data => { console.log(data) })
```

- Métodos: `.onMessage(fn)`, `.onMessageOnce(fn)`, `.delete()`.

***

## Consideraciones DevOps

- Deshabilita GZip en SSE (`text/event-stream`) en Nginx/Traefik/etc para evitar caídas/conexiones erráticas.

***

¿Te interesa este contenido como archivo `.md` o adaptado a tu sistema de documentación/IA? Indícalo.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/digging-deeper/transmit

