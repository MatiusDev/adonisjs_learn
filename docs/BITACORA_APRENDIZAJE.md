# Bitácora de Aprendizaje del Proyecto

Este documento sirve como la bitácora central de este proyecto de aprendizaje de AdonisJS v6. Contiene el perfil del desarrollador, la metodología de aprendizaje seguida, el estado del proyecto y la hoja de ruta.

---

## 1. Perfil y Metodología

### 1.1. Perfil del Desarrollador

*   **Nivel de Habilidad:** Programador con experiencia, pero nuevo en el framework AdonisJS.

### 1.2. Metodología de Aprendizaje

El aprendizaje se basa en una colaboración entre el desarrollador y un asistente de IA (Gemini), siguiendo una metáfora de "Arquitecto y Desarrollador".

*   **Resumen del Flujo:** El aprendizaje es eminentemente práctico. El desarrollador ejecuta todo el código por sí mismo, mientras que el asistente de IA se encarga de explicar la teoría, dar instrucciones claras, verificar el trabajo realizado y profundizar en los conceptos para consolidar el aprendizaje.

*   **Flujo de Interacción Detallado:**
    1.  **Explicación Teórica:** El asistente de IA explica el concepto y el objetivo práctico del paso actual.
    2.  **Instrucción Práctica:** El asistente proporciona el comando o el código a implementar.
    3.  **Implementación por el Desarrollador:** El desarrollador aplica el cambio en su entorno local.
    4.  **Verificación:** El asistente lee los archivos modificados para asegurar que la implementación es correcta.
    5.  **Profundización Conceptual:** Una vez verificado, el asistente explica a fondo qué hace el código, por qué funciona así y los conceptos clave de AdonisJS implicados.
    6.  **Definición del Siguiente Paso:** Se propone y acuerda el siguiente objetivo en la hoja de ruta.

---

## 2. Contexto del Proyecto

### 2.1. Ficha Técnica

*   **Framework:** AdonisJS v6
*   **Lenguaje:** TypeScript
*   **Validador:** VineJS
*   **Assets:** Vite
*   **Plantillas:** Edge
*   **ORM:** Lucid
*   **Seguridad:** Adonis Shield

### 2.2. Objetivo Principal

*   **Meta:** Construir una aplicación web completa para la **gestión de una clínica**, incluyendo CRUDs para Pacientes, Doctores y Citas.

---

## 3. Hoja de Ruta del Aprendizaje

### 3.1. Estado Actual de la Sesión

*   **Estado:** **PAUSADO**.
*   **Última Actividad:** Finalización del **Capítulo 13: Construyendo los Cimientos: Modelos y Migraciones para la Clínica**.
*   **Próximo Objetivo:** Iniciar el **Capítulo 14: CRUD de Doctores - Listado y Creación**.

### 3.2. Próxima Hoja de Ruta

1.  **Capítulo 14: CRUD de Doctores - Listado y Creación**.

### 3.3. Capítulos Completados (Con Descripción Detallada)

*   **Capítulo 13: Construyendo los Cimientos: Modelos y Migraciones para la Clínica**
    *   Se cambió el objetivo del proyecto a una aplicación de gestión de clínica.
    *   Se crearon los modelos (`Doctor`, `Patient`, `Appointment`) y sus correspondientes migraciones con el comando `node ace make:model <nombre> -m`.
    *   Se aprendió a definir la estructura de las tablas usando el Schema Builder de Lucid dentro del método `up()` de las migraciones.
    *   Se corrigió y aprendió la sintaxis canónica para definir claves foráneas en Lucid v6, incluyendo `.unsigned()`, `.references()`, `.inTable()` y `.onDelete('CASCADE')`.
    *   Se definieron las relaciones `belongsTo` y `hasMany` en los modelos de Lucid para reflejar la lógica del negocio y facilitar las consultas a la base de datos.

*   **Capítulo 12.5: Refactorización del Sidebar a Componente Modular**
    *   Se desacopló el HTML del sidebar del dashboard a su propio archivo de componente en `components/shared/sidebar.edge`.
    *   Se aprendió a pasar datos (el objeto `user`) desde una vista padre a un componente hijo a través de `props`.
    *   Se exploró y aplicó el concepto de **Stacks** de Edge.js para permitir que un componente hijo inyecte sus dependencias de CSS (`@pushOnceTo('styles')`) en el `<head>` del layout principal (`@stack('styles')`), logrando una componentización verdaderamente modular.


*   **Capítulo 12: Refactorización de Vistas a Layouts de Componente**
    *   Se rediseñó la UI del Dashboard para tener un aspecto moderno y profesional.
    *   Se refactorizó el CSS para mover estilos globales y variables a `app.css`.
    *   Se investigó y resolvió un problema de renderizado con las vistas de Edge.
    *   **Descubrimiento Clave:** Se aprendió que la directiva `@layout` de AdonisJS v5 fue reemplazada en v6 por un sistema de **Componentes y Slots**. El patrón correcto es crear un componente layout (ej. `components/layout/app.edge`) y consumirlo desde las vistas hijas usando la sintaxis de "componente como etiqueta" (`@layout.app()`) y rellenando los `slots` (`@slot('main')`).
    *   Se aplicó exitosamente el nuevo patrón de layout a todas las vistas de la aplicación (`dashboard`, `login`, `register`), logrando una base de UI consistente y reutilizable.

*   **Capítulo 11: Registro de Usuarios (Signup)**
    *   Creación de la UI para las vistas de autenticación (login y registro) usando CSS puro.
    *   Refactorización de CSS a un modelo modular con un layout base (`auth-layout.css`) y archivos específicos por vista.
    *   Implementación del flujo de registro: ruta, método en controlador y validador con reglas `unique` y `confirmed`.
    *   Implementación de auto-login después del registro para mejorar la experiencia de usuario.
    *   **Profundización en Vite:** Análisis del helper `@vite()` de Edge, su comportamiento dual (desarrollo/producción) y el uso del atributo `defer` para carga no bloqueante de scripts.
    *   **Depuración Avanzada de Pruebas:** Se resolvió un bug complejo en el test de registro. La lección clave fue que cuando los `console.log` no aparecen en un controlador, es una señal de que la petición está siendo detenida antes (por ejemplo, por una falla en la validación). Se aprendió a usar `response.flashMessages()` y `response.assertSessionHasErrors()` para diagnosticar estos problemas.

*   **Capítulo 10: Implementación del Logout y Refactorización de Pruebas**
    *   Implementación de la ruta y controlador para el logout de usuario usando el método `POST` como mejor práctica de seguridad.
    *   Añadido de botón de logout en la vista del dashboard.
    *   Depuración intensiva de la suite de pruebas funcionales, descubriendo y solucionando problemas relacionados con el manejo de estado (cookies), redirecciones y configuración del entorno de pruebas en Japa.
    *   Introducción y configuración del plugin `authApiClient` para usar el helper `.loginAs()`.
    *   Refactorización de los tests de autenticación para ser más atómicos y robustos, diferenciando entre pruebas de comportamiento (redirección) y estado (sesión).

*   **Capítulo 9: Protección de Rutas con Middleware**
    *   Aplicación del `auth` middleware a rutas.
    *   Refactorización de rutas a un patrón modular escalable, usando funciones exportadas para resolver problemas de sincronía.
    *   Análisis del `auth` middleware y el método `ctx.auth.authenticateUsing()`.

*   **Capítulo 1-8:** Introducción, MVC, CSRF, Validación, Flash Messages, Autenticación y Pruebas Automatizadas.