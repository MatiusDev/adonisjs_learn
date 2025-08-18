<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo para la siguiente pagina [https://docs.adonisjs.com/guides/security/hashing](https://docs.adonisjs.com/guides/security/hashing)

Aquí tienes un resumen estructurado y práctico de la documentación oficial de AdonisJS sobre **Hashing** (manejo y almacenamiento seguro de contraseñas) válido para el ecosistema moderno de AdonisJS.

***

# Hashing en AdonisJS

> Basado en: [Hashing (Security) | AdonisJS Documentation](https://docs.adonisjs.com/guides/security/hashing)

***

## ¿Para qué sirve el hash service?

- Permite almacenar contraseñas y datos sensibles usando **hashes criptográficos** seguros.
- Soporta algoritmos: `bcrypt`, `scrypt`, `argon2` y la posibilidad de crear drivers personalizados.
- Los hashes se guardan en formato PHC (Password Hashing Competition), un estándar interoperable.

***

## Uso básico

- **Generar hash:**

```ts
import hash from '@adonisjs/core/services/hash'
const hashed = await hash.make('mi_clave')
// Ejemplo salida: $argon2id$v=19$m=65536,t=3,p=4$...
```

- **Verificar hash:**

```ts
if (await hash.verify(hashActual, valorPlano)) {
  // contraseña es correcta
}
```

- Hashing es unidireccional: ninguna función puede volver a la contraseña original a partir del hash.

***

## Configuración (`config/hash.ts`)

```ts
import { defineConfig, drivers } from '@adonisjs/core/hash'

export default defineConfig({
  default: 'scrypt',
  list: {
    scrypt: drivers.scrypt(),
    // argon: drivers.argon2(),
    // bcrypt: drivers.bcrypt(),
  }
})
```

**Cambia el `default` según el driver que uses.**

***

### Opciones por algoritmo

- **Argon2** (recomendado):
    - Instalar: `npm i argon2`
    - Configura versión, variante, iteraciones, memoria, paralelismo, tamaño de salt y largo del hash.
    - Ejemplo:

```ts
argon: drivers.argon2({
  version: 0x13,
  variant: 'id',
  iterations: 3,
  memory: 65536,
  parallelism: 4,
  saltSize: 16,
  hashLength: 32,
})
```

- **Bcrypt**:
    - Instalar: `npm i bcrypt`
    - Opciones: `rounds`, `saltSize`, `version`.
- **Scrypt** (default):
    - Sin dependencias externas, usa crypto de Node.
    - Opciones: `cost`, `blockSize`, `parallelization`, `saltSize`, `maxMemory`, `keyLength`.

***

## Hash automático con Lucid

- Puedes usar un model hook para hashear contraseñas antes de guardarlas:

```ts
import { BaseModel, beforeSave } from '@adonisjs/lucid'
import hash from '@adonisjs/core/services/hash'
export default class User extends BaseModel {
  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
}
```

- Si usas el paquete `@adonisjs/auth`, no necesitas hooks: `AuthFinder` lo hace por ti automáticamente.

***

## Cambiar driver en tiempo real

```ts
await hash.use('scrypt').make('clave')
await hash.use('bcrypt').make('clave')
await hash.use('argon').make('clave')
```


***

## ¿Cuándo re-hashear una contraseña?

- Usa `hash.needsReHash(hashAlmacenado)` para saber si un hash necesita ser actualizado a nuevas configuraciones.
- Usar durante login:

```ts
if (await hash.needsReHash(user.password)) {
  user.password = await hash.make(plainPassword)
  await user.save()
}
```


***

## Faking de hash en tests

- Hashing es costoso; para tests rápidos:

```ts
import hash from '@adonisjs/core/services/hash'
hash.fake()
// ... ejecuciones de tests
hash.restore()
```

- Hace que hashing sea instantáneo y evita ralentización de tus factories.

***

## Crear tu propio driver

- Implementa la interfaz `HashDriverContract` e inspira tu driver en drivers oficiales.
- Referencia tu driver en el config usando un factory.

***

¿Quieres este contenido como archivo markdown o documentación IA estructurada? Solo dilo.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/security/hashing

