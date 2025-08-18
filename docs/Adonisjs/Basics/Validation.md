<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Validation (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/validation)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Validation (Basics)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Validation (Basics) | AdonisJS Documentation

> Fuente oficial: [Validation (Basics) | AdonisJS Documentation](https://docs.adonisjs.com/guides/basics/validation)

***

## Validación en AdonisJS

- La validación de datos se realiza generalmente en el controlador, permitiendo filtrar y dar respuesta a errores inmediatamente.
- Una vez validado, puedes usar los datos de confianza para lógica de negocio, base de datos, emails, etc.

***

## VineJS: La librería de validación recomendada

- **VineJS** es la librería oficial, framework-agnostic, rápida y con type safety.
- Viene preconfigurada en los starter kits `web` y `api`.
- AdonisJS no fuerza su uso; puedes cambiar de librería si lo prefieres.


### Instalación

```bash
node ace add vinejs
```

- Esto instala `@vinejs/vine` y lo añade a `providers` en `adonisrc.ts`.

***

## Uso de validadores

- Cada acción suele tener su propio validador (crear post, actualizar, eliminar, etc.).


### Crear un validador

```bash
node ace make:validator post
```

- Esto crea el archivo (vacío) dentro de `app/validators`.


#### Ejemplo de validadores

```js
import vine from '@vinejs/vine'

// Crear post
export const createPostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    slug: vine.string().trim(),
    description: vine.string().trim().escape()
  })
)

// Actualizar post
export const updatePostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    description: vine.string().trim().escape()
  })
)
```


### Uso en controller

```js
import { createPostValidator, updatePostValidator } from '#validators/post_validator'

export default class PostsController {
  async store({ request }) {
    // Forma explícita
    const data = request.all()
    const payload = await createPostValidator.validate(data)

    // Forma recomendada (valida body, query y archivos)
    const payload = await request.validateUsing(createPostValidator)
    return payload
  }

  async update({ request }) {
    const payload = await request.validateUsing(updatePostValidator)
    return payload
  }
}
```


***

## Error handling

- Las excepciones de validación se manejan automáticamente por el `HttpExceptionHandler` usando content negotiation.
    - Si el pedido fue JSON, recibes errores como array.
    - Si fue HTML, se usan flash messages para los formularios.
    - Si fue JSON API: formato JSON API.
- No necesitas try/catch alrededor de validate.

***

## Validar cookies, headers y params

Puedes incluir cookies, headers y params en tus validadores:

```js
const validator = vine.compile(
  vine.object({
    username: vine.string(),
    cookies: vine.object({}),
    headers: vine.object({}),
    params: vine.object({}),
  })
)
await request.validateUsing(validator)
```


***

## Pasar metadata al validador

Si el validador necesita datos del request (ejemplo: userId), pásalos como metadatos:

```js
await request.validateUsing(updateUserValidator, { meta: { userId: auth.user.id } })
```

Puedes hacer type-safe la metadata con `vine.withMetaData<{ userId: number }>()`.

***

## Mensajes y reportes de error personalizados

- Edita mensajes globales con:

```js
import vine, { SimpleMessagesProvider } from '@vinejs/vine'
vine.messagesProvider = new SimpleMessagesProvider({
  required: 'El campo {{ field }} es obligatorio',
  'username.required': 'Debes elegir un usuario',
})
```

- O configura reporter custom:

```js
vine.errorReporter = () => new JSONAPIErrorReporter()
```


***

## Reglas contribuidas por AdonisJS

- AdonisJS añade reglas como `vine.file` y desde Lucid las reglas `unique` y `exists`.

***

¿Quieres este archivo en formato `.md` directamente o una estructura especial? Dímelo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/basics/validation

