<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Introduction (Authentication) | AdonisJS Documentation](https://docs.adonisjs.com/guides/authentication/introduction)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Introduction (Authentication)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Authentication (Introducción) | AdonisJS Documentation

> Fuente oficial: [Introduction (Authentication) | AdonisJS Documentation](https://docs.adonisjs.com/guides/authentication/introduction)

***

## Autenticación en AdonisJS

- Sistema de autenticación robusto y seguro, apto para apps server-rendered, SPAs y móviles.
- El sistema se basa en **guards** (tipo de login) y **providers** (lookup en base de datos).
    - **Guards:** Implementación end-to-end de cierto flujo de login (session, access_tokens, basic auth).
    - **Providers:** Recuperan usuario/tokens desde la base de datos. Puedes usar los nativos o implementar tus propios.


### Seguridad por defecto

- Contraseñas y tokens hasheados adecuadamente.
- Protección contra timing y session fixation attacks.

***

## Qué NO incluye el paquete auth

- No resuelve registro de usuarios, activación ni recuperación de password.
- No maneja roles ni permisos (para autorización, usar Bouncer).

***

## Guards disponibles

- **Session:** Usa cookies y sesión (recomendada para apps SSR y APIs con frontend en el mismo dominio).
- **Access tokens:** Tokens opacos generados tras login. Útil para apps móviles o cuando frontend y backend están en dominios diferentes.
- **Basic auth:** Autenticación HTTP básica via header Authorization. No recomendado para producción salvo desarrollos rápidos o pruebas.

***

## Proveedores de usuario

- Los providers entregan los datos del usuario para cada guard.
- El provider para sesión busca usuarios por id; el de access tokens verifica/fetch tokens.
- El paquete provee un lucid user provider que utiliza modelos Lucid.

***

## Instalación

- Viene listo en los starter kits `web` y `api`.
- Para instalar manualmente:

```bash
# Session (default)
node ace add @adonisjs/auth --guard=session
# Access tokens
node ace add @adonisjs/auth --guard=access_tokens
# Basic auth
node ace add @adonisjs/auth --guard=basic_auth
```

- El comando:
    - Instala el paquete y registra el provider en `adonisrc.ts`.
    - Registra el middleware de inicialización de auth y el middleware protector en `start/kernel.ts`.
    - Crea el modelo de usuario y las migraciones necesarias.

***

## Middleware de inicialización (`initialize_auth_middleware`)

- Crea una instancia de Authenticator y la comparte como `ctx.auth` en los requests (y en Edge como `auth`).
- **No autentica ni protege rutas:** solo inicializa el sistema para el request.
- Para proteger rutas, usa el *auth middleware* correspondiente.

Ejemplo en plantilla Edge:

```edge
@if(auth.isAuthenticated)
  <p> Hello {{ auth.user.email }} </p>
@end
```


***

## Migración y modelo por defecto

- El comando de configuración genera una migración para la tabla `users`:

```ts
table.increments('id').notNullable()
table.string('full_name').nullable()
table.string('email', 254).notNullable().unique()
table.string('password').notNullable()
table.timestamp('created_at').notNullable()
table.timestamp('updated_at').nullable()
```

- Personaliza el modelo `User` si cambias la estructura.

***

## Próximos pasos

- Aprende a verificar las credenciales de usuario asegurando la seguridad.
- Aprende a usar los guards session (autenticación stateful) y access tokens (token-based).

***

¿Deseas este contenido como archivo `.md` o con estructura especial para importar a tu sistema IA? Indícalo.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/authentication/introduction

