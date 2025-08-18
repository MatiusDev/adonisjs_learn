<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Quiero que revises el contenido de esta pagina web, me lo traduzcas y que se vea igual como en la pagina para yo descargarlo: [Introduction (Guides) | Edge Documentation](https://edgejs.dev/docs/introduction)

Primero te mostraré la traducción del contenido, manteniendo la estructura, formato y ejemplos exactamente como aparecen en la página. Después te proporcionaré el archivo descargable con la traducción completa.

***

# Introducción

Edge es un motor de plantillas **simple**, **moderno** y **con baterías incluidas** para Node.js. Edge es similar a escribir JavaScript. Si sabes JavaScript, sabes Edge.

```
¡Hola {{ user.username }}!
```

**Hola mundo**

Este es un ejemplo hola mundo en Edge.

```
{{ user.subscription?.plan || 'No suscrito' }}
```

**Expresiones de JavaScript**

Edge es capaz de evaluar cualquier expresión de JavaScript.

```
@let(payments = await user.getPayments())
Has realizado {{ payments.length }} pagos hasta ahora.
```

** Async/await **

También puedes usar las palabras clave async/await dentro de tus plantillas.

```
@if(user.hasSubscription)
¡Hurra! Tienes acceso a más de 280 videos.
@else
Los videos solo están disponibles para suscriptores.
@end
```

**Condicionales**

Escribir condicionales es similar a JavaScript.

```
@each(comment in post.comments)
@include('partials/comment')
@end
```

**Bucles**

Puedes iterar sobre Arrays y Objetos usando una sintaxis unificada.

```
@accordion()

@accordion.item({ title: '¿Qué es Edge?' })
Edge es un motor de plantillas para Node.js
@end

@accordion.item({ title: '¿Por qué debería usar Edge?' })
Porque necesitas un motor de plantillas 🤷🏻♂️
@end

@accordion.item({ title: '¿Cómo puedo apoyar a Edge?' })
Convirtiéndote en patrocinador en Github
@end

@end
```

**Componentes**

Edge también tiene componentes. Permiten reutilizar el markup con un estado aislado...

## ¿Por qué otro motor de plantillas?

Muchos no se harán esta pregunta porque todos los motores de plantillas populares en el ecosistema Node.js están abandonados o apenas han innovado en los últimos años.

Sin embargo, hemos evolucionado y usado Edge dentro de AdonisJS durante casi siete años. A continuación algunas características seleccionadas de Edge.

- Edge no es restrictivo: puedes escribir cualquier expresión de JavaScript dentro de él.
- Stack de errores preciso.
- Modelo mental simple y sin dialecto personalizado que aprender.
- Capa de componentes con soporte para slots y API de provide/inject.
- Integración de iconos con Iconify.
- API extensible. El 80% de las funciones de Edge están implementadas usando la API pública.


## ¿Edge vs Vue.js / React / Svelte?

Edge es un motor de plantillas para el backend completamente diferente a librerías frontend como Vue.js o React.

- No hay reactividad en Edge.
- No está ligado a ninguna implementación del DOM. Edge ni siquiera está ligado a HTML.
- No tienes que compilar plantillas Edge. Estas se compilan en tiempo de ejecución.

Una mejor comparación sería Nunjucks vs. Edge o Pug vs. Edge.

## Edge vs JSX

Aunque JSX es excelente, estrictamente hablando no es un motor de plantillas. JSX es una extensión de sintaxis de JavaScript para XML, comúnmente usada en frameworks como React, que muchos desarrolladores web emplean para generar HTML.

Por otro lado, Edge es un motor de plantillas que puedes integrar dentro de cualquier lenguaje de marcado. Ya sea Markdown, JSON, YAML y, por supuesto, HTML.

Me gusta JSX por muchas razones, incluyendo la seguridad de tipos (cuando se usa con TypeScript). Sin embargo, JSX puede ser más verboso y ligeramente de bajo nivel para todos los gustos. Por otro lado, Edge puede ser una excelente opción para quienes disfrutan de la sintaxis concisa y expresiva del motor de plantillas...

## ¿Por qué debería usar Edge?

Si te gusta la simplicidad de usar motores de plantillas backend y has estado buscando uno que se sienta moderno, refrescante y no te obligue a aprender un lenguaje nuevo, entonces Edge es para ti.

Si vives en el ecosistema de `<tu-framework-frontend>`, no necesitas Edge. Imagina que nunca abriste este sitio 😉

## Próximos pasos

- Comienza con la guía de inicio rápido.
- Lee la guía de especificación de sintaxis para entender mejor la sintaxis de Edge.


## Llamado a colaboradores

Estamos buscando colaboradores para ayudar a crear extensiones de resaltado de sintaxis para todos los editores de código principales.

**Sublime Text**- Oficialmente soportado
**VSCode**- Oficialmente soportado
**Vim**- Necesitamos colaboradores para resaltar Edge en Vim.
**WebStorm**- Se necesitan colaboradores. El rastreador de problemas de JetBrains tiene una solicitud abierta para un resaltador de sintaxis.

Avísanos abriendo un issue en Github si decides crear una extensión para un editor de código. Puedes aprender más sobre la sintaxis de Edge leyendo la guía de especificación.

## Patrocinadores

Lista de individuos y empresas que patrocinan públicamente a Harminder Virk en Github. Si estás patrocinando y no ves tu nombre, asegúrate de que tu patrocinio no sea privado.

***

Aquí tienes la traducción fiel conservando los ejemplos y estructura del archivo.

Ahora te crearé el archivo descargable con todo el contenido traducido.
<span style="display:none">[^1]</span>

<div style="text-align: center">⁂</div>

[^1]: https://edgejs.dev/docs/introduction

