<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Has lo mismo con el contenido de esta url [Config providers (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/config-providers)

Aquí tienes el archivo markdown de conocimiento base para IA sobre la página oficial de **Config providers (Concepts)** en AdonisJS v6. El contenido está referenciado explícitamente a su fuente.

***

# Config providers (Concepts) | AdonisJS Documentation

> Fuente oficial: [Config providers (Concepts) | AdonisJS Documentation](https://docs.adonisjs.com/guides/concepts/config-providers)

***

## ¿Qué son los config providers?

Algunos archivos de configuración (por ejemplo, `config/hash.ts`) exportan un **config provider** en vez de un objeto plano.
Un config provider ofrece una API para que los paquetes resuelvan dependencias de forma lazy sólo después de bootear la aplicación.

***

## Sin config providers: El problema

Ejemplo clásico de configuración:

```js
import { Scrypt } from '@adonisjs/core/hash/drivers/scrypt'

export default {
  default: 'scrypt',
  list: {
    scrypt: () => new Scrypt({
      cost: 16384,
      blockSize: 8,
      parallelization: 1,
      maxMemory: 33554432,
    })
  }
}
```

Si el driver Scrypt necesita, por ejemplo, una instancia de `Emitter`, no puedes pedirla al container porque el container no está disponible antes del boot.
Si creas un `Emitter` dentro del archivo config, ese objeto no será compartido globalmente, y tendrás que resolver todas las dependencias manualmente (mucho boilerplate).

***

## Con config provider

La solución es usar el **config provider** que recibe la instancia de la app al estar todo listo, para así resolver dependencias vía el container.

Ejemplo usando config provider:

```js
import { configProvider } from '@adonisjs/core'
import { Scrypt } from '@adonisjs/core/hash/drivers/scrypt'

export default {
  default: 'scrypt',
  list: {
    scrypt: configProvider.create(async (app) => {
      const emitter = await app.container.make('emitter')
      return () => new Scrypt({
        cost: 16384,
        blockSize: 8,
        parallelization: 1,
        maxMemory: 33554432,
      }, emitter)
    })
  }
}
```

- El config provider se ejecuta sólo cuando se necesita ese servicio, después del boot.
- Puedes usar imports dinámicos para cargar dependencias a demanda:

```js
import { configProvider } from '@adonisjs/core'

export default {
  default: 'scrypt',
  list: {
    scrypt: configProvider.create(async (app) => {
      const { Scrypt } = await import('@adonisjs/core/hash/drivers/scrypt')
      const emitter = await app.container.make('emitter')
      return () => new Scrypt({ ... }, emitter)
    })
  }
}
```


***

## Acceso a la configuración resuelta

Desde el servicio correspondiente puedes consultar la configuración resuelta:

```js
import hash from '@adonisjs/core/services/hash'
console.log(hash.config)
```


***

¿Quieres este contenido en formato `.md` para importar en tu base de conocimientos o alguna adaptación especial? Indícalo en el siguiente mensaje.

<div style="text-align: center">⁂</div>

[^1]: https://docs.adonisjs.com/guides/concepts/config-providers

