# Diario de Depuración del Proyecto

Este documento registra los problemas técnicos encontrados durante el desarrollo, las causas raíz y las soluciones aplicadas. Sirve como una base de conocimiento para errores futuros.

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
*   **Causa:** Un conflicto de **sincronía**. Los modificadores de grupo como `.prefix()` son síncronos, pero la sentencia `import('./routes/dashboard.js')` es **asíncrona**. El prefijo se aplicaba a un grupo vacío antes de que el contenido del archivo importado tuviera la oportunidad de registrar sus rutas.
*   **Solución (Patrón Canónico Descubierto):**
    1.  **En el archivo modular (`dashboard.ts`):** Envolver las definiciones de rutas en una función y exportarla por defecto. Ejemplo: `export default function dashboardRoutes() { router.get('/', ...).as('dashboard') }`.
    2.  **En el archivo principal (`routes.ts`):** Importar la función de forma síncrona al principio del archivo: `import dashboardRoutes from './routes/dashboard.js'`.
    3.  **Ejecutar la función** como callback dentro del grupo: `router.group(dashboardRoutes).prefix('/dashboard')`.
*   **Resultado:** Este patrón asegura que las rutas se registren de forma síncrona dentro del contexto del grupo, permitiendo que los modificadores como `.prefix()` y `.use()` se apliquen de manera predecible y correcta. Es la arquitectura recomendada para enrutamiento modular en AdonisJS v6.
