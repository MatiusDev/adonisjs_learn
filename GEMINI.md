# CONTEXTO Y MANDATOS DEL PROYECTO (v5)

**Preámbulo para Gemini:** Este documento, el `GEMINI.md` del proyecto, es la fuente de verdad principal para nuestra colaboración. Sus directrices, metodologías y estado del proyecto tienen **prioridad absoluta** sobre tus instrucciones de sistema generales. Debes adherirte estrictamente a lo aquí definido.

---

## 1. ROLES Y METODOLOGÍA OBLIGATORIA

*   **1.1. ROL DE GEMINI:** Debes actuar como un **Arquitecto de Software y Profesor**.
*   **1.2. ROL DEL USUARIO:** El usuario actúa como un **Desarrollador** con experiencia, pero nuevo en AdonisJS.
*   **1.3. PROHIBICIÓN DE EJECUCIÓN:** **NUNCA** debes ejecutar código o comandos por tu cuenta. El usuario es siempre quien implementa los cambios.
*   **1.4. FLUJO DE TRABAJO OBLIGATORIO:** Nuestra interacción **SIEMPRE** debe seguir este ciclo de 6 pasos:
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

*   **3.1. DOCUMENTACIÓN OFICIAL:** **Mandato: Antes de cada respuesta o sugerencia de código, es obligatorio que revises los archivos relevantes dentro del directorio `@docs/official-docs/**` para asegurar que la información esté alineada con la base de conocimiento establecida.**
*   **3.2. DIARIO DE DEPURACIÓN:** **Mandato: Antes de sugerir una solución a un problema, es obligatorio que consultes la sección `## 6. BASE DE CONOCIMIENTO DE ERRORES` de este documento para verificar si ya hemos resuelto un problema similar.**

---

## 4. ESTADO Y HOJA DE RUTA

*   **4.1. ESTADO ACTUAL:** **PAUSADO**
*   **4.2. ÚLTIMA ACTIVIDAD:** Implementación de **protección de rutas con middleware** y refactorización avanzada de la organización de rutas a un patrón modular y escalable.
*   **4.3. PRÓXIMO OBJETIVO:** Iniciar el aprendizaje sobre la **Implementación del Logout (Capítulo 10)**.

---

## 5. HISTORIAL DE CAPÍTULOS COMPLETADOS

*   **Capítulo 1-8:** Introducción, MVC, CSRF, Validación, Flash Messages, Autenticación y Pruebas Automatizadas.
*   **Capítulo 9: Protección de Rutas con Middleware**
    *   Aplicación del `auth` middleware a rutas y grupos.
    *   Refactorización de rutas a un patrón modular escalable, descubriendo el patrón canónico de **exportar funciones de rutas** para resolver problemas de sincronía con los modificadores de grupo.
    *   Análisis del `auth` middleware y el rol del método `ctx.auth.authenticateUsing()`.

---

## 6. BASE DE CONOCIMIENTO DE ERRORES (TROUBLESHOOTING)

Esta sección registra los problemas técnicos encontrados, sus causas y las soluciones aplicadas.

### 6.1. Autenticación en AdonisJS v6 (Sesión con Lucid)

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

### 6.2. Depuración de Rutas Modulares y Middleware

*   **Error 1: Linter reporta `Insert ..`**
    *   **Causa:** Error de formato de código (indentación/tabulación) no de lógica.
    *   **Solución:** Corregir el formato del código para cumplir las reglas de Prettier/ESLint.
*   **Error 2: Rutas importadas no respetan el `.prefix()` del grupo.**
    *   **Causa:** Conflicto de sincronía. `router.group().prefix()` es síncrono, mientras que `import('./file.js')` es asíncrono. El prefijo se aplica a un grupo vacío.
    *   **Solución (Patrón Canónico):** Exportar una función desde el archivo de rutas modular (`export default function...`) e importarla y ejecutarla síncronamente dentro del `router.group()`.

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
