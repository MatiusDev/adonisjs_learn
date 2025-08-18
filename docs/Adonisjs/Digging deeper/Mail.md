<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# [Mail (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/mail)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Mail (Digging deeper)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Mail (Digging deeper) | AdonisJS Documentation

> Fuente oficial: [Mail (Digging deeper) | AdonisJS Documentation](https://docs.adonisjs.com/guides/digging-deeper/mail)

***

## ¿Cómo enviar emails con AdonisJS?

- Usa `@adonisjs/mail` (sobre Nodemailer, pero con mejoras y API fluida).
- Soporta SMTP, SES, Mailgun, Sparkpost, Resend, Brevo y más.
- Experiencia de testing mejorada, clases para mails, mailer fake, colas, attachments, templates, MJML…

***

## Instalación y configuración

```bash
node ace add @adonisjs/mail --transports=smtp --transports=resend
```

- Crea `config/mail.ts`, define mailers, global from/replyTo,...
- Ejemplo configuración básica:

```js
import env from '#start/env'
import { defineConfig, transports } from '@adonisjs/mail'

export default defineConfig({
  default: 'smtp',
  from: { address: '', name: '' },
  replyTo: { address: '', name: '' },
  mailers: {
    smtp: transports.smtp({ host: env.get('SMTP_HOST'), port: env.get('SMTP_PORT') }),
    resend: transports.resend({ key: env.get('RESEND_API_KEY'), baseUrl: 'https://api.resend.com' }),
    // Otros: mailgun, sparkpost, ses, etc.
  }
})
```


***

## Enviar emails

- Enviar directo:

```js
import mail from '@adonisjs/mail/services/main'
await mail.send(message => {
  message.to(user.email)
         .from('info@example.org')
         .subject('Verifica tu email')
         .htmlView('emails/verify_email', { user })
})
```

- Cambia de mailer: `mail.use('resend').send(...)`

***

## Colas de emails

- Usa `mail.sendLater` para encolar el envío (in-memory por defecto, puedes conectar BullMQ).
- Puedes definir un messenger custom para producción.

***

## Clases de Email

- Puedes crear mails como clases:

```bash
node ace make:mail verify_email
```

```js
import { BaseMail } from '@adonisjs/mail'
export default class VerifyEmailNotification extends BaseMail {
  subject = 'Verifica tu email'
  prepare() {
    this.message.to('user@email.com')
  }
}
```

- Envía instancia:
`await mail.send(new VerifyEmailNotification(user))`

***

## Testing y Fake Mailer

- Usa `mail.fake()` para interceptar mails durante los tests (en memoria, sin enviar nada):

```js
const { mails } = mail.fake()
mails.assertSent(VerifyEmailNotification, email =>
  email.message.hasTo('test@email.com')
)
mail.restore()
```

- Método para asserts: `assertSent`, `assertNotSent`, `assertSentCount`, `assertNoneSent`, `assertQueued`, etc.

***

## Adjuntos y embebidos

- Adjunta archivos con `message.attach(ruta/Buffer, [opciones])`.
- Embebe imágenes con helper Edge `embedImage()`/`embedImageData()`.
- Usa calendarios e invites: `.icalEvent(`contenido`, {method, filename})`.
- Utiliza MJML en Edge para emails responsive:

```edge
@mjml()
<mjml>...</mjml>
@end
```


***

## Headers, Reply-to, CC/BCC, variables…

- Todos los campos y headers configurables vía API.
- Compatible con headers “List-*” para listas de correo, etc.

***

## Transports custom

- Puedes envolver tu propio transport Nodemailer y exponerlo como transport AdonisJS vía config.

***

¿Quieres este contenido como archivo `.md` o para un sistema de documentación/IA? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/digging-deeper/mail

