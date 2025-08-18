<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Encryption (Security) | AdonisJS Documentation](https://docs.adonisjs.com/guides/security/encryption)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Encryption (Security)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Encryption (Security) | AdonisJS Documentation

> Fuente oficial: [Encryption (Security) | AdonisJS Documentation](https://docs.adonisjs.com/guides/security/encryption)

***

## ¿Para qué sirve el encryption service en AdonisJS?

- Permite cifrar y descifrar datos en tu aplicación.
- Basado en el algoritmo `aes-256-cbc` y protección HMAC para evitar manipulación de datos.
- Usa el `appKey` definido en `config/app.ts` como clave secreta.
    - Es fundamental mantener este valor privado y seguro.
    - Si cambias el key después, los datos cifrados previamente no podrán descifrarse (cookies/sesiones incluidas).

***

## Encriptar valores

```js
import encryption from '@adonisjs/core/services/encryption'

const encrypted = encryption.encrypt('hola mundo')

// Puedes indicar una duración tras la cual el dato expira
const encrypted = encryption.encrypt('hola mundo', '2 hours')
```


***

## Desencriptar valores

```js
import encryption from '@adonisjs/core/services/encryption'

const value = encryption.decrypt(encryptedValue)
```


***

## Tipos de datos soportados

- string
- number
- bigInt
- boolean
- null
- object
- array
- Date (convertido a string ISO)

Ejemplo:

```js
encryption.encrypt({ id: 1, name: 'virk' })
encryption.encrypt([1, 2, 3])
encryption.encrypt(true)
encryption.encrypt(10)
encryption.encrypt(BigInt(10))
encryption.encrypt(new Date())
```


***

## Usar claves secretas personalizadas

- Puedes crear una instancia manual de Encryption con un key distinto:

```js
import { Encryption } from '@adonisjs/core/encryption'

const encryption = new Encryption({ secret: 'clavealeatoria_larga' })
```


***

¿Te interesa este contenido como archivo `.md` o en algún formato especial para importar a tu sistema de conocimiento? Indícalo en tu mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/security/encryption

