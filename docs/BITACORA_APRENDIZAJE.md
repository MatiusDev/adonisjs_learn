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

*   **Meta:** Construir una aplicación web completa y funcional, comenzando por un sistema robusto de login y autenticación de usuarios.

---

## 3. Hoja de Ruta del Aprendizaje

### 3.1. Estado Actual de la Sesión

*   **Estado:** **PAUSADO**.
*   **Última Actividad:** Finalización del **Capítulo 11: Registro de Usuarios (Signup)**, incluyendo la implementación completa del flujo y una depuración avanzada de la suite de pruebas.
*   **Próximo Objetivo:** Iniciar el **Capítulo 12: Personalización del Dashboard**.

### 3.2. Próxima Hoja de Ruta

1.  **Capítulo 12: Personalización del Dashboard.**

### 3.3. Capítulos Completados (Con Descripción Detallada)

*   **Capítulo 11: Registro de Usuarios (Signup)**
    *   Creación de la UI para las vistas de autenticación (login y registro) usando CSS puro.
    *   Refactorización de CSS a un modelo modular con un layout base (`auth-layout.css`) y archivos específicos por vista.
    *   Implementación del flujo de registro: ruta, método en controlador y validador con reglas `unique` y `confirmed`.
    *   Implementación de auto-login después del registro para mejorar la experiencia de usuario.
    *   **Profundización en Vite:** Análisis del helper `@vite()` de Edge, su comportamiento dual (desarrollo/producción) y el uso del atributo `defer` para carga no bloqueante de scripts.
    *   **Depuración Avanzada de Pruebas:** Se resolvió un bug complejo en el test de registro. La lección clave fue que cuando los `console.log` no aparecen en un controlador, es una señal de que la petición está siendo detenida antes (por ejemplo, por una falla en la validación). Se aprendió a usar `response.flashMessages()` y `response.assertSessionHasErrors()` para diagnosticar estos problemas.

*   **Capítulo 1-8:** Introducción, MVC, CSRF, Validación, Flash Messages, Autenticación y Pruebas Automatizadas.
*   **Capítulo 9: Protección de Rutas con Middleware**
    *   Aplicación del `auth` middleware a rutas.
    *   Refactorización de rutas a un patrón modular escalable, usando funciones exportadas para resolver problemas de sincronía.
    *   Análisis del `auth` middleware y el método `ctx.auth.authenticateUsing()`.
*   **Capítulo 10: Implementación del Logout y Refactorización de Pruebas**
    *   Implementación de la ruta y controlador para el logout de usuario usando el método `POST` como mejor práctica de seguridad.
    *   Añadido de botón de logout en la vista del dashboard.
    *   Depuración intensiva de la suite de pruebas funcionales, descubriendo y solucionando problemas relacionados con el manejo de estado (cookies), redirecciones y configuración del entorno de pruebas en Japa.
    *   Introducción y configuración del plugin `authApiClient` para usar el helper `.loginAs()`.
    *   Refactorización de los tests de autenticación para ser más atómicos y robustos, diferenciando entre pruebas de comportamiento (redirección) y estado (sesión).
*   **Capítulo 11: Registro de Usuarios (Signup)**
    *   Creación de la UI para las vistas de autenticación (login y registro) usando CSS puro.
    *   Refactorización de CSS a un modelo modular con un layout base (`auth-layout.css`) y archivos específicos por vista.
    *   Implementación del flujo de registro: ruta, método en controlador y validador con reglas `unique` y `confirmed`.
    *   Implementación de auto-login después del registro para mejorar la experiencia de usuario.
    *   **Profundización en Vite:** Análisis del helper `@vite()` de Edge, su comportamiento dual (desarrollo/producción) y el uso del atributo `defer` para carga no bloqueante de scripts.
    *   **Depuración Avanzada de Pruebas:** Se resolvió un bug complejo en el test de registro. La lección clave fue que cuando los `console.log` no aparecen en un controlador, es una señal de que la petición está siendo detenida antes (por ejemplo, por una falla en la validación). Se aprendió a usar `response.flashMessages()` y `response.assertSessionHasErrors()` para diagnosticar estos problemas.