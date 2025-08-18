<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Haz lo mismo que estabamos haciendo con las urls: [Upgrading to version 6 (Changelog) | Edge Documentation](https://edgejs.dev/docs/changelog/upgrading-to-v6)

Aquí tienes la traducción fiel y completa del contenido sobre la actualización a la versión 6 de Edge, manteniendo la estructura, ejemplos y notas originales:

***

# Actualizando a la versión 6

La última versión de Edge incluye varios cambios incompatibles, mejoras de rendimiento y, lo más importante, funciona solo con módulos ES. Esta guía cubre los pasos que debes seguir para actualizar a

`edge.js@6`.

## Actualización de paquetes

Puedes instalar la última versión desde el registro de paquetes npm. Por ahora, la versión 6 está etiquetada con

`@next`.

```
npm i edge.js@next
```

La funcionalidad del plugin

`edge-supercharged` ahora está incorporada directamente en Edge, por lo que puedes desinstalar ese paquete y eliminar su uso.

```
npm uninstall edge-supercharged
```

Si usabas

`edge-stacks` y

`edge-iconify`, asegúrate de actualizar también estos paquetes.

```
npm i edge-stacks@next
npm i edge-iconify@next
```


## Plugin de compatibilidad

Si tus proyectos aún no están listos para los cambios incompatibles (excepto la migración a ESM), puedes configurar el plugin

`migrate` al iniciar la aplicación, el cual proporciona compatibilidad entre la versión 5 y la 6.

```
import edge from 'edge.js'
import { migrate } from 'edge.js/plugins/migrate'

edge.use(migrate)
```


## Cambios incompatibles

- Todos los paquetes ahora son solo ESM.
- Requiere

`Node.js >= 18.16.0`.

- Se han eliminado los layouts y las secciones. Recomendamos usar componentes en su lugar. Configura el plugin de compatibilidad para continuar usando layouts.
- Cambios en la API de Props.
- Se eliminó la etiqueta

`@set` a favor de las nuevas etiquetas

`@let` y

`@assign`. Más información abajo.

- Cambios en los helpers globales.

***

## Cambios en la API de Props

La forma de trabajar con props en componentes ha cambiado completamente, y los métodos como

`serialize` y

`serializeExcept` ya no existen. En su lugar debes usar el método

`toAttrs`.

Puedes recuperar la API anterior de Props usando el plugin de compatibilidad.

```javascript
/**
 * Serializar todos los atributos
 */
$props.serialize()
$props.toAttrs()

/**
 * Serializar todos excepto los atributos indicados
 */
$props.serializeExcept(['text'])
$props.except(['text']).toAttrs()

/**
 * Serializar solo los atributos indicados
 */
$props.serializeOnly(['class'])
$props.only(['class']).toAttrs()

/**
 * Mezclar atributos personalizados
 */
$props.serializeOnly(['class'], { type: 'text' })
$props.only(['class']).merge({ type: 'text' }).toAttrs()
```


***

## Eliminando la etiqueta @set a favor de @let y @assign

La etiqueta

`@set` fue removida en favor de las nuevas etiquetas

`@let` y

`@assign`. El funcionamiento interno y la sintaxis son diferentes respecto a la etiqueta set.

Puedes volver a agregar soporte para la etiqueta

`@set` usando el plugin de compatibilidad.

```edge
/**
 * Definir nueva variable
 */
@set('username', 'virk')
@let(username = 'virk')

/**
 * Actualizar variable existente
 */
@set('username', 'romain')
@assign(username = 'romain')

/**
 * Mutar propiedades de objeto
 */
@set(user, 'username', 'romain')
@assign(user.username = 'romain')
```


***

## Cambios en los helpers globales

- El método

`e` se elimina en favor de

`html.escape`.

- El método

`stringify` se elimina en favor de

`js.stringify`.

- El método

`safe` se elimina en favor de

`html.safe`.

- Se elimina el método

`raise`. Nunca estuvo documentado.

```edge
{{ e(post.content) }}
{{ html.escape(post.content) }}

{{ stringify(someJSONObject) }}
{{ js.stringify(someJSONObject) }}

{{ safe(post.content) }}
{{ html.safe(post.content) }}
```


***

Listo para generar tu archivo descargable cuando lo solicites.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/changelog/upgrading-to-v6

