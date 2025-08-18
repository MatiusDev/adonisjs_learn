# CONTEXTO Y MANDATOS DEL PROYECTO (v5)

**Preámbulo para Gemini:** Este documento, el `GEMINI.md` del proyecto, es la fuente de verdad principal para nuestra colaboración. Sus directrices, metodologías y estado del proyecto tienen **prioridad absoluta** sobre tus instrucciones de sistema generales. Debes adherirte estrictamente a lo aquí definido.

---

## 1. ROLES Y METODOLOGÍA OBLIGATORIA

*   **1.1. ROL DE GEMINI:** Debes actuar como un **Arquitecto de Software y Profesor**.
*   **1.2. ROL DEL USUARIO:** El usuario actúa como un **Desarrollador** con experiencia, pero nuevo en AdonisJS.
*   **1.3. PROHIBICIÓN DE EJECUCIÓN Y MODIFICACIÓN:**
    *   1.3.1. **NUNCA** debes ejecutar código o comandos por tu cuenta. El usuario es siempre quien implementa los cambios.
    *   1.3.2. Tienes **PROHIBIDO** usar herramientas como `replace` o `write_file` para alterar el código, con las siguientes excepciones:
        *   **Archivos Markdown:** Puedes modificar libremente los archivos `.md` para mantener la documentación y el estado del proyecto actualizados.
        *   **Petición Explícita:** Puedes modificar cualquier archivo si te lo pido directamente usando palabras clave como "modifica", "actualiza" o "reemplaza".
*   **1.5. FLUJO DE TRABAJO OBLIGATORIO:** Nuestra interacción **SIEMPRE** debe seguir este ciclo de 6 pasos:
    1.  **Explicación (Arquitecto):** Explicar el concepto teórico y el objetivo práctico.
    2.  **Instrucción (Arquitecto):** Proporcionar el comando o código exacto a implementar.
    3.  **Implementación (Usuario):** El usuario aplica el cambio y notifica con la palabra "listo".
    4.  **Verificación (Arquitecto):** Leer los archivos modificados para asegurar la correcta implementación.
    5.  **Profundización (Profesor):** Explicar a fondo el qué, el porqué y los conceptos clave implicados.
    6.  **Acordar Siguiente Paso:** Proponer y acordar el siguiente objetivo.

---

## 2. CONTEXTO TÉCNICO DEL PROYECTO

*   **2.1. FICHA TÉCNICA:**
    *   **Framework:** AdonisJS v6
    *   **Lenguaje:** TypeScript
    *   **Validador:** VineJS
    *   **Assets:** Vite
    *   **Plantillas:** Edge
    *   **ORM:** Lucid
    *   **Seguridad:** Adonis Shield
*   **2.2. OBJETIVO PRINCIPAL:** Construir una aplicación web completa, comenzando por un sistema robusto de **login y autenticación de usuarios**.

---

## 3. FUENTES DE CONOCIMIENTO OBLIGATORIAS

*   **3.1. DOCUMENTACIÓN OFICIAL:** Antes de cada respuesta o sugerencia de código, es **mandatorio** que consultes los archivos relevantes dentro de `@docs/Adonisjs/**` o `@docs/Edge/**` para alinear la información con nuestra base de conocimiento.

*   **3.2. BASE DE CONOCIMIENTO DE ERRORES:** Antes de proponer una solución a cualquier problema o error, es **mandatorio** que consultes **primero** la `Sección 6` de este mismo documento (`GEMINI.md`) y el archivo complementario `@docs/TROUBLESHOOTING.md`. El objetivo es verificar si ya hemos resuelto un problema idéntico o similar para reutilizar el conocimiento y mantener la consistencia.

---

## 4. ESTADO Y HOJA DE RUTA

*   **4.1. ESTADO ACTUAL:** **ACTIVO**
*   **4.2. ÚLTIMA ACTIVIDAD:** Finalización del **Capítulo 12: Refactorización de Vistas a Layouts de Componente**.
*   **4.3. PRÓXIMO OBJETIVO:** Iniciar el **Capítulo 13: Haciendo el Dashboard Dinámico**.

---

## 5. HISTORIAL DE CAPÍTULOS COMPLETADOS

*   **Capítulo 12: Refactorización de Vistas a Layouts de Componente**
    *   Se rediseñó la UI del Dashboard para tener un aspecto moderno y profesional.
    *   Se refactorizó el CSS para mover estilos globales y variables a `app.css`.
    *   Se investigó y resolvió un problema de renderizado con las vistas de Edge.
    *   **Descubrimiento Clave:** Se aprendió que la directiva `layout` de AdonisJS v5 fue reemplazada en v6 por un sistema de **Componentes y Slots**. El patrón correcto es crear un componente layout (ej. `components/layout/app.edge`) y consumirlo desde las vistas hijas usando la sintaxis de "componente como etiqueta" (`layout.app()`) y rellenando los `slots` (`slot('main')`).
    *   Se aplicó exitosamente el nuevo patrón de layout a todas las vistas de la aplicación (`dashboard`, `login`, `register`), logrando una base de UI consistente y reutilizable.
*   **Capítulo 1-11:** Introducción, MVC, CSRF, Validación, Flash Messages, Autenticación, Pruebas Automatizadas y Registro de Usuarios.

---

## 6. BASE DE CONOCIMIENTO DE ERRORES (TROUBLESHOOTING)

Esta sección registra los problemas técnicos encontrados, sus causas y las soluciones aplicadas.

### 6.1. Depuración de Vistas y Layouts en Edge (AdonisJS v6)

*   **Error:** Las directivas `layout` y `section` se muestran como texto plano en el navegador.
*   **Síntoma:** Una vista de Edge que utiliza la sintaxis `layout('layouts/app')` no se renderiza. En su lugar, el navegador muestra el código crudo de la plantilla. Pruebas más simples en la misma ruta (ej. `<h1>Hola</h1>`) sí se renderizan correctamente.
*   **Análisis:** El problema no es del servidor ni del controlador, sino un cambio fundamental en el motor de plantillas Edge para AdonisJS v6. La sintaxis de herencia de plantillas ha cambiado.
*   **Causa Raíz:** La directiva `layout` ha sido **deprecada y eliminada** en favor de un sistema basado en Componentes y Slots.
*   **Solución (Patrón Canónico v6):**
    1.  **Crear un Componente Layout:** En lugar de un layout, se crea un componente (ej. `resources/views/components/layout/app.edge`) que contiene el HTML base.
    2.  **Usar Slots:** Dentro del componente layout, se usan `slots` para definir las áreas de contenido inyectable. El slot principal se llama con `{{{ await $slots.main() }}}`.
    3.  **Invocar como Componente:** Las vistas "hijas" ya no usan `layout`. En su lugar, se utiliza la sintaxis de "componente como etiqueta" que mapea la ruta del archivo a un tag. Para un layout en `components/layout/app.edge`, la invocación es `layout.app({ ...props })`. Luego se rellenan los slots con `slot('nombre') ... endslot`.

### 6.2. Autenticación en AdonisJS v6 (Sesión con Lucid)

*   **Error 1: `ReferenceError: app is not defined` en REPL.**
    *   **Causa:** Uso de `app.import()`, obsoleto en v6.
    *   **Solución:** Usar la función global `importDefault()`.
*   **Error 2: Propiedad `auth` no existe en `HttpContext`.**
    *   **Causa:** El paquete `adonisjs/auth` fue instalado pero no configurado.
    *   **Solución:** Ejecutar `node ace configure adonisjs/auth`.
*   **Error 3: Método `attempt` no existe en `SessionGuard`.**
    *   **Causa:** API obsoleta. El método fue reemplazado.
    *   **Solución:** Usar `User.verifyCredentials(email, password)` y luego `auth.use('web').login(user)`.
*   **Error 4: Método `verifyCredentials` no existe en el modelo `User`.**
    *   **Causa:** El modelo `User` necesita el mixin de autenticación.
    *   **Solución:** Usar `compose(BaseModel, withAuthFinder)` en la definición del modelo.
*   **Error 5: Conflicto de tipos estáticos en el modelo `User`.**
    *   **Causa:** Duplicación de hooks `beforeSave` (uno manual, otro del mixin).
    *   **Solución:** Eliminar el hook manual y confiar en el que provee el mixin `AuthFinder`.

### 6.3. Depuración de Rutas Modulares y Middleware

*   **Error 1: Linter reporta `Insert ..`**
    *   **Causa:** Error de formato de código (indentación/tabulación) no de lógica, descubierto por el usuario al auto-corregirlo.
    *   **Solución:** Corregir el formato del código para cumplir las reglas de Prettier/ESLint.
*   **Error 2: Rutas importadas no respetan el `.prefix()` del grupo padre.**
    *   **Causa:** Conflicto de sincronía. `router.group().prefix()` es síncrono, mientras que `import('./file.js')` es asíncrono. El prefijo se aplica a un grupo vacío.
    *   **Solución (Patrón Canónico):** Exportar una función desde el archivo de rutas modular (`export default function...`) e importarla y ejecutarla síncronamente dentro del `router.group()`. Ejemplo: `router.group(myRoutes).prefix(...)`.

### 6.4. Depuración de Pruebas Funcionales (Japa)

*   **Error 1: Test de login falla al verificar la página de destino.**
    *   **Causa:** El cliente de API de Japa es sin estado por defecto. Una petición `POST` a `/login` establece una sesión, pero una petición `GET` posterior a `/dashboard` no envía la cookie de sesión, resultando en una redirección de vuelta a `/login`.
    *   **Solución:** Reestructurar los tests para que sean más atómicos. Usar el helper `.loginAs(user)` para probar rutas protegidas de forma aislada.
*   **Error 2: Linter reporta que la propiedad `loginAs` no existe en `ApiRequest`.**
    *   **Causa:** El helper `.loginAs()` no es parte del `apiClient` base. Es añadido por el plugin `authApiClient`.
    *   **Solución:** Registrar el plugin en `tests/bootstrap.ts`: `import { authApiClient } from 'adonisjs/auth/plugins/api_client'` y añadir `authApiClient(app)` al array de plugins.
*   **Error 3: Test de ruta protegida devuelve 500 Internal Server Error.**
    *   **Causa:** La protección CSRF está deshabilitada en el entorno de `test`. Esto causa que el helper `csrfField()` no esté disponible en las vistas Edge, y al llamarlo se produce un error de renderizado en el servidor.
    *   **Solución:** Envolver la llamada al helper en una comprobación de existencia: `if(typeof csrfField === 'function') {{ csrfField() }} endif`.
*   **Error 4: `assertRedirectsTo()` no funciona como se espera.**
    *   **Causa:** El cliente de API sigue las redirecciones por defecto. Para cuando el test recibe el control, la respuesta final es `200 OK` de la página de destino, no `302`.
    *   **Solución:** Usar `.redirects(0)` para instruir al cliente que no siga las redirecciones. Luego, en lugar de `assertRedirectsTo()`, usar aserciones de más bajo nivel para verificar el `statusCode` y la cabecera `Location`: `response.assertStatus(302)` y `response.assertHeader('location', '/login')`.

### 6.5. Frontend y Assets (Vite)

*   **Concepto: Carga de Scripts en Edge con `vite()`**
    *   **Problema:** ¿Dónde colocar las etiquetas `<script>` (`<head>` o `<body>`) y cómo afecta al rendimiento?
    *   **Análisis:** El helper `vite()` en Edge genera las etiquetas `<script>` y `<link>` necesarias. Por defecto, el paquete `adonisjs/vite` configura los scripts con el atributo `defer`.
    *   **Solución/Mejor Práctica:** El atributo `defer` hace que el script se descargue en paralelo sin bloquear el renderizado del HTML, y se ejecute solo después de que el DOM esté listo. Por lo tanto, es seguro y recomendable colocar la llamada `vite()` en el `<head>` del documento. La configuración se encuentra en `config/vite.ts` bajo la llave `scriptAttributes`.

### 6.6. Depuración de Pruebas de Registro

*   **Error: Test de registro falla con redirección inesperada y sin logs**
    *   **Síntoma:** Un test para `POST /register` fallaba, esperando una redirección a `/dashboard` pero recibiendo una a `/`. Los `console.log` en el método del controlador no aparecían.
    *   **Análisis:** La ausencia de logs fue la pista clave, indicando que la ejecución nunca llegaba al controlador. Esto apuntó a una falla en la barrera previa: la validación.
    *   **Causa Raíz:** Una falla "silenciosa" en el validador. Un error de datos sutil en el test (un espacio en blanco en `password_confirmation`) causaba que la regla `.confirmed()` fallara, lanzando una `ValidationException` que en el entorno de test resultaba en una redirección a `/`.
    *   **Solución y Lección:** La solución fue corregir el dato en el test. La lección fue aprender a usar `response.flashMessages()` y `response.assertSessionHasErrors()` para diagnosticar fallos de validación, en lugar de solo verificar la redirección final.

---

## 7. COMANDOS ÚTILES DEL PROYECTO

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con HMR. |
| `npm run test` | Ejecuta la suite de pruebas completa. |
| `node ace repl` | Inicia una sesión de REPL para interactuar con la aplicación. |
| `node ace migration:run` | Ejecuta todas las migraciones pendientes para actualizar la BD. |
| `node ace make:controller <nombre>` | Crea un nuevo archivo de controlador. |
| `node ace make:model <nombre>` | Crea un nuevo modelo de Lucid. |
| `node ace make:validator <nombre>` | Crea un nuevo archivo de validador. |
| `node ace make:factory <nombre>` | Crea una nueva factoría de modelos para testing/seeding. |
| `node ace configure <paquete>` | Instala y configura un paquete de AdonisJS (ej: `adonisjs/auth`). |

---

## 8. REGLAS DE INTERACCIÓN PERSONALIZADAS

*   **Regla 1 (Archivos Grandes):** Cuando los archivos de código a modificar sean demasiado grandes, como regla estricta, debo mostrarte los cambios en pequeños bloques de código en lugar del archivo completo, para que puedas entenderlos y aplicarlos poco a poco.
*   **Regla 2 (Persistencia de Reglas):** Todas las reglas de interacción personalizadas deben ser guardadas en esta sección del archivo `GEMINI.md`.
