<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Deployment (Getting started) | AdonisJS Documentation](https://docs.adonisjs.com/guides/getting-started/deployment)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Deployment (Getting started)** de AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Deployment (Getting started) | AdonisJS Documentation

> Fuente oficial: [Deployment (Getting started) | AdonisJS Documentation](https://docs.adonisjs.com/guides/getting-started/deployment)

***

## Requisitos para despliegue

- Necesitas un servidor con **Node.js >= 20.6** y **npm** para instalar dependencias de producción.

***

## Crear el build de producción

Para compilar tu aplicación para producción:

```bash
node ace build
```

- El resultado va a la carpeta `./build`.
- Si usas Vite: los assets compilados van a `./build/public`.
- Copia el contenido de `build` al servidor de producción.
- **El build será la raíz de tu aplicación en producción.**

***

## Despliegue con Docker

Ejemplo de Dockerfile para AdonisJS:

```Dockerfile
FROM node:22.16.0-alpine3.22 AS base

FROM base AS deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

FROM base AS production-deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci --omit=dev

FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 8080
CMD ["node", "./bin/server.js"]
```

Personaliza según tus necesidades.

***

## Reverse proxy con Nginx

Ejemplo básico de configuración Nginx:

```nginx
server {
  listen 80;
  server_name <APP_DOMAIN.COM>;
  location / {
    proxy_pass http://localhost:<ADONIS_PORT>;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_cache_bypass $http_upgrade;
  }
}
```


***

## Variables de entorno

- En servidores dedicados, usar archivo `.env` en una ubicación segura.
- En plataformas gestionadas (Heroku, Cleavr), usa el panel de control para definir variables.

Ejemplo para usar `.env` en `/etc/secrets/`:

```bash
ENV_PATH=/etc/secrets node build/bin/server.js
```


***

## Arrancar el servidor en producción

- Lo básico: `node server.js`
- Recomendado: **Usar pm2** como process manager para manejar reinicios, cluster, y ejecución en background.

Ejemplo de archivo pm2:

```js
module.exports = {
  apps: [
    {
      name: 'web-app',
      script: './server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
};
```

```bash
pm2 start ecosystem.config.js
```


***

## Migraciones de base de datos

Si usas Lucid y SQL, debes correr las migraciones:

```bash
node ace migration:run --force
```

- Corre siempre las migraciones **antes** de reiniciar el servidor.
- Deshabilita rollbacks en producción (`disableRollbacksInProduction: true`).
- Evita ejecutar migraciones desde varios servidores; Lucid usa advisory locks en MySQL y PostgreSQL.

***

## Almacenamiento persistente para archivos subidos

- Plataformas como K8s, Heroku, EKS, etc. usan **filesystems efímeros**.
- Para subir archivos de usuarios, emplea almacenamiento externo (S3, GCS, Spaces).

***

## Logs

- AdonisJS usa **pino logger** por defecto (logs en JSON por stdout/stderr).
- Configura un servicio externo para recolectar logs o guárdalos localmente.

***

## Servir archivos estáticos

### Usar CDN

- Es el método recomendado para servir assets.
- Los archivos generados por Vite están fingerprinted y pueden cachearse indefinidamente.
- Actualiza `vite.config.js` y `config/vite.ts` para usar la URL del CDN.
- Publica los assets compilados (`public/assets`) al CDN (ejemplo: S3).


### Usar Nginx

- Puedes cachear agresivamente los assets generados por Vite.

Ejemplo de bloque Nginx:

```nginx
location ~ \.(jpg|png|css|js|gif|ico|woff|woff2) {
  root <PATH_TO_ADONISJS_APP_PUBLIC_DIRECTORY>;
  sendfile on;
  sendfile_max_chunk 2m;
  add_header Cache-Control "public";
  expires 365d;
}
```


### Usar servidor estático de AdonisJS

- El servidor embebido sirve archivos de `public` por defecto.
- **No recomendado para producción**: mejor usar CDN o Nginx.

***

¿Quieres este contenido como archivo `.md` para importar, una estructura especial, o filtros para tu base de datos IA? Indica tus preferencias.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/getting-started/deployment

