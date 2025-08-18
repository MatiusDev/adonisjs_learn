
# Diario de Depuración del Proyecto

Este documento registra los problemas técnicos encontrados durante el desarrollo, las causas raíz y las soluciones aplicadas. Sirve como una base de conocimiento para errores futuros.

---

## Depuración de Vistas y Layouts en Edge (AdonisJS v6)

### Error: Las directivas `@layout` y `@section` se muestran como texto plano en el navegador.

*   **Síntoma:** Una vista de Edge que utiliza la sintaxis `@layout('layouts/app')` no se renderiza. En su lugar, el navegador muestra el código crudo de la plantilla. Pruebas más simples en la misma ruta (ej. `<h1>Hola</h1>`) sí se renderizan correctamente.
*   **Análisis:** El problema no es del servidor ni del controlador, sino un cambio fundamental en el motor de plantillas Edge para AdonisJS v6. La sintaxis de herencia de plantillas ha cambiado.
*   **Causa Raíz:** La directiva `@layout` ha sido **deprecada y eliminada** en favor de un sistema basado en Componentes y Slots.
*   **Solución (Patrón Canónico v6):**
    1.  **Crear un Componente Layout:** En lugar de un layout, se crea un componente (ej. `resources/views/components/layout/app.edge`) que contiene el HTML base.
    2.  **Usar Slots:** Dentro del componente layout, se usan `slots` para definir las áreas de contenido inyectable. El slot principal se llama con `{{{ await $slots.main() }}}`.
    3.  **Invocar como Componente:** Las vistas "hijas" ya no usan `@layout`. En su lugar, se utiliza la sintaxis de "componente como etiqueta" que mapea la ruta del archivo a un tag. Para un layout en `components/layout/app.edge`, la invocación es `@layout.app({ ...props })`. Luego se rellenan los slots con `@slot('nombre') ... @endslot`.

*   **Código de Referencia (Layout `components/layout/app.edge`):**
    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <title>{{ title }}</title>
      {{{ await $slots.head() }}}
    </head>
    <body>
      {{{ await $slots.main() }}}
    </body>
    </html>
    ```

*   **Código de Referencia (Vista `pages/login.edge`):**
    ```html
    @layout.app({ title: 'Login' })
      @slot('head')
        {{-- CSS específico de la página --}}
      @endslot
      @slot('main')
        {{-- Contenido principal de la página --}}
      @endslot
    @end
    ```
---

## Autenticación en AdonisJS v6 (Sesión con Lucid)

Durante la implementación del flujo de login, nos encontramos con una serie de 5 errores de configuración y de API que resolvimos de forma incremental.

### Error 1: `ReferenceError: app is not defined` en el REPL

*   **Síntoma:** Al intentar importar un modelo en el REPL con `app.import('#models/user')`, la consola arrojaba `app is not defined`.
*   **Causa:** El método `app.import()` es de versiones anteriores de AdonisJS o de un contexto diferente. La API del REPL en v6 ha cambiado.
*   **Solución:** Utilizar la función global `importDefault()` que está disponible en el entorno del REPL.
*   **Código Correcto:** `const User = await importDefault('#models/user')`

### Error 2: La propiedad `auth` no existe en `HttpContext`

*   **Síntoma:** El linter de TypeScript marcaba un error en `login({ auth }: HttpContext)`, indicando que `auth` no era una propiedad válida.
*   **Causa:** El paquete `@adonisjs/auth` había sido instalado vía `npm`, pero no había sido **configurado** dentro de la aplicación. La configuración es un paso crucial que registra los proveedores de servicios y las definiciones de tipo.
*   **Solución:** Ejecutar el comando de configuración del paquete.
*   **Comando:** `node ace configure @adonisjs/auth`

### Error 3: El método `attempt` no existe en `SessionGuard`

*   **Síntoma:** Después de solucionar el error anterior, el linter marcaba un nuevo error en la línea `await ctx.auth.use('web').attempt(email, password)`.
*   **Causa:** Un conocimiento obsoleto de la API. En versiones modernas de AdonisJS v6, el método `attempt` (que busca y verifica) fue reemplazado por un enfoque más explícito y desacoplado.
*   **Solución (descubierta por el usuario):** La documentación oficial mostró que el nuevo patrón es un proceso de dos pasos.
*   **Información Clave de la Documentación:** "We use the verifyCredentials from the AuthFinder mixin to find a user by email and password."
*   **Código Correcto:** 
    1.  `const user = await User.verifyCredentials(email, password)`
    2.  `await ctx.auth.use('web').login(user)`

### Error 4: El método `verifyCredentials` no existe en el modelo `User`

*   **Síntoma:** Inmediatamente después de aplicar la solución anterior, el linter marcó un error en `User.verifyCredentials(...)`.
*   **Causa:** Un modelo de Lucid no obtiene esta funcionalidad por defecto. Debe ser explícitamente "mejorado" para que sepa cómo autenticarse.
*   **Solución (descubierta por el usuario):** La documentación oficial indicó la necesidad de usar un Mixin de autenticación.
*   **Información Clave de la Documentación:** "Using the Auth Finder mixin"
*   **Código Correcto:** Usar la función `compose` de AdonisJS para combinar el `BaseModel` con el mixin `withAuthFinder` en la definición de la clase del modelo: `export default class User extends compose(BaseModel, AuthFinder) { ... }`

### Error 5: Conflicto de Tipos Estáticos en la Clase `User`

*   **Síntoma:** Un error de TypeScript complejo en la definición de la clase `User` después de añadir el mixin `AuthFinder`.
*   **Causa:** El mixin `AuthFinder` ya incluye internamente un hook `@beforeSave` para hashear la contraseña automáticamente. Nosotros estábamos manteniendo nuestro hook `@beforeSave` manual, creando un conflicto.
*   **Solución (descubierta por el usuario):** Eliminar nuestro hook `@beforeSave` manual y confiar en el que provee el mixin.
*   **Información Clave de la Documentación:** "The AuthFinder mixin registers a beforeSave hook to automatically hash the user passwords."
*   **Resultado:** El modelo `User` final es más simple y depende completamente del mixin para toda la funcionalidad de autenticación (verificación y hasheo al guardar).

---

## Depuración de Rutas Modulares y Middleware

Durante la refactorización de rutas para hacerlas más escalables, surgieron varios problemas de concepto y de implementación.

### Error 1: Error de Linter ambiguo: `Insert ..`

*   **Síntoma:** El linter de TypeScript/ESLint mostraba un error críptico "Insert .." en el editor de código.
*   **Causa:** El error no era de lógica de código, sino de **formato**. El linter, configurado con Prettier, exige una tabulación o indentación específica que no se estaba cumpliendo en el código escrito.
*   **Solución (descubierta por el usuario):** Corregir manualmente la indentación del código para que coincida con las reglas de formato del proyecto.

### Error 2: Rutas importadas no respetan el `.prefix()` del grupo padre

*   **Síntoma:** Una ruta definida en un archivo modular (ej. `start/routes/dashboard.ts`) e importada en `start/routes.ts` dentro de un grupo con `.prefix('/dashboard')`, no era accesible en `/dashboard`, sino en `/`. Además, los métodos de redirección por nombre (`toRoute('dashboard')`) fallaban, indicando que la ruta no se registraba correctamente.
*   **Causa:** Un conflicto de **sincronía**. Los modificadores de grupo como `.prefix()` son síncronos, pero la sentencia `import('./routes/dashboard.js')` es **asíncrona**. El prefijo se aplica a un grupo vacío antes de que el contenido del archivo importado tuviera la oportunidad de registrar sus rutas.
*   **Solución (Patrón Canónico Descubierto):**
    1.  **En el archivo modular (`dashboard.ts`):** Envolver las definiciones de rutas en una función y exportarla por defecto. Ejemplo: `export default function dashboardRoutes() { router.get('/', ...).as('dashboard') }`.
    2.  **En el archivo principal (`routes.ts`):** Importar la función de forma síncrona al principio del archivo: `import dashboardRoutes from './routes/dashboard.js'`.
    3.  **Ejecutar la función** como callback dentro del grupo: `router.group(dashboardRoutes).prefix('/dashboard')`.
*   **Resultado:** Este patrón asegura que las rutas se registren de forma síncrona dentro del contexto del grupo, permitiendo que los modificadores como `.prefix()` y `.use()` se apliquen de manera predecible y correcta. Es la arquitectura recomendada para enrutamiento modular en AdonisJS v6.

---

## Depuración de Pruebas Funcionales (Japa)

Durante la implementación del logout, la suite de pruebas de autenticación falló, revelando varios matices sobre el testing en AdonisJS.

### Error 1: Test de login falla al verificar la página de destino (Redirección a /login)

*   **Síntoma:** Un test que hace POST a `/login` y luego GET a `/dashboard` termina en la página de `/login`.
*   **Causa:** El cliente de API de Japa es sin estado por defecto. La cookie de sesión obtenida en la respuesta del `POST` no se envía en la petición `GET` subsecuente.
*   **Solución:** Reestructurar los tests para que sean más atómicos y no dependan del estado entre peticiones. Usar el helper `.loginAs(user)` para probar rutas protegidas de forma aislada.

### Error 2: Linter reporta que la propiedad `loginAs` no existe en `ApiRequest`

*   **Síntoma:** Error de TypeScript al intentar usar `client.get('/dashboard').loginAs(user)`.
*   **Causa:** El helper `.loginAs()` no es parte del `apiClient` base. Es una funcionalidad extendida que provee el paquete de autenticación.
*   **Solución:** Registrar el plugin `authApiClient` en `tests/bootstrap.ts`.
*   **Código Correcto:** `import { authApiClient } from '@adonisjs/auth/plugins/api_client'` y añadir `authApiClient(app)` al array de plugins de Japa.

### Error 3: Test de ruta protegida devuelve 500 Internal Server Error

*   **Síntoma:** Una petición a una ruta protegida con un usuario logueado (`.loginAs(user)`) resulta en un error 500.
*   **Causa:** La protección CSRF está deshabilitada en el entorno de `test` (lo cual es correcto). Esto causa que el helper `csrfField()` no esté disponible en las vistas Edge. Al intentar llamarlo en la plantilla del dashboard, el motor de vistas Edge lanza un error de renderizado que resulta en un 500.
*   **Solución:** Envolver la llamada al helper en una comprobación de existencia dentro de la plantilla Edge.
*   **Código Correcto:** `@if(typeof csrfField === 'function') {{ csrfField() }} @endif`

### Error 4: `assertStatus(302)` falla, recibiendo `200` en su lugar

*   **Síntoma:** Un test que espera una redirección falla porque el status final es 200.
*   **Causa (descubierta por el usuario):** El cliente de API de Japa sigue las redirecciones por defecto. La aserción se realiza sobre la respuesta de la página *final*, no sobre la respuesta de redirección intermedia.
*   **Solución:** Usar el método `.redirects(0)` para instruir al cliente que no siga las redirecciones. Esto permite probar la respuesta `302` directamente. Consecuentemente, en lugar de `assertRedirectsTo()`, se debe usar una aserción de más bajo nivel para verificar la cabecera `Location`.
*   **Código Correcto:** `response.assertStatus(302)` y `response.assertHeader('location', '/login')`.

---

## Depuración de Pruebas de Registro

### Error: Test de registro falla con redirección inesperada y sin logs

*   **Síntoma:** Un test para `POST /register` fallaba, esperando una redirección a `/dashboard` pero recibiendo una a `/`. Adicionalmente, los `console.log` colocados dentro del método del controlador no aparecían en la salida del test.
*   **Análisis:** La ausencia de los logs fue la pista clave. Indicaba que la ejecución nunca llegaba al cuerpo del método del controlador. Esto apuntó a una falla en la barrera previa: la llamada a `request.validateUsing(validator)`.
*   **Causa Raíz:** Una falla "silenciosa" en el validador. Un error de datos muy sutil en el test (un espacio en blanco en `password_confirmation`) causaba que la regla de validación `.confirmed()` fallara, lanzando una `ValidationException` que en el entorno de test resultaba en una redirección a `/`.
*   **Solución y Lección Aprendida:**
    1.  La solución inmediata fue corregir el typo en los datos del test.
    2.  La lección de depuración más importante fue aprender a diagnosticar fallos de validación en los tests. En lugar de solo verificar la redirección, se debe inspeccionar la respuesta en busca de errores de sesión: `console.log(response.flashMessages())` o usar aserciones específicas como `response.assertSessionHasErrors()`.
