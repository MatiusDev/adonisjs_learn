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
*   **Última Actividad:** Implementación de **protección de rutas con middleware** y refactorización avanzada de la organización de rutas a un patrón modular y escalable.
*   **Próximo Objetivo:** Iniciar el aprendizaje sobre la **Implementación del Logout**.

### 3.2. Próxima Hoja de Ruta

1.  **Capítulo 10: Implementación del Logout.**

### 3.3. Capítulos Completados (Con Descripción Detallada)

*   **Capítulo 1: Introducción y Limpieza**
    *   Análisis de la estructura de carpetas de AdonisJS (app, config, start, resources).
    *   Lectura y modificación del archivo de rutas `start/routes.ts`.
    *   Eliminación de archivos de vista `.edge` innecesarios.

*   **Capítulo 2: Flujo MVC Básico**
    *   Uso de `node ace make:controller` para crear controladores.
    *   Creación de nuevas vistas `.edge` y estructura de carpetas en `resources/views`.
    *   Conexión de una ruta a un método específico de un controlador.
    *   Renderizado de una vista desde un controlador usando `view.render()`.

*   **Capítulo 3: Seguridad del Formulario (CSRF)**
    *   Explicación del ataque Cross-Site Request Forgery y su prevención.
    *   Rol del middleware Shield de AdonisJS.
    *   Uso del helper `{{ csrfField() }}` en las vistas Edge para generar el token.

*   **Capítulo 4: Validación de Datos con VineJS**
    *   Identificación de la versión del validador (VineJS para Adonis v6).
    *   Uso de `node ace make:validator` para crear clases validadoras.
    *   Definición de un esquema de validación con `vine.compile()`.
    *   Encadenamiento de reglas de validación: `string()`, `trim()`, `email()`, `minLength()`.
    *   Uso de `request.validateUsing()` en el controlador para ejecutar la validación.

*   **Capítulo 5: Feedback al Usuario con Flash Messages**
    *   Explicación del comportamiento de redirección automática de AdonisJS ante un fallo de validación.
    *   Concepto de "Flash Messages" (datos de sesión de un solo uso).
    *   Uso del helper global `flashMessages` en vistas Edge para leer errores y datos antiguos.
    *   Renderizado condicional de mensajes de error con la directiva `@if` de Edge.

*   **Capítulo 6 & 7: Autenticación Real (Setup, Lógica y Depuración)**
    *   Definición de un schema de BD con migraciones (`node ace migration:run`).
    *   Creación de un modelo Lucid (`node ace make:model`).
    *   Configuración del paquete de autenticación con `node ace configure adonisjs/auth`.
    *   Uso del **mixin `withAuthFinder`** para añadir capacidades de autenticación al modelo `User`.
    *   Comprensión de que el mixin provee tanto `User.verifyCredentials` como el hasheo automático de contraseñas, eliminando la necesidad de un hook `@beforeSave` manual.
    *   Implementación del flujo de login en el controlador usando `User.verifyCredentials` y `auth.use('web').login(user)`.
    *   Creación de una ruta y controlador para un `dashboard` post-login.

*   **Capítulo 8: Pruebas Automatizadas para Autenticación**
    *   Introducción a **Japa** como framework de pruebas.
    *   Configuración del entorno de pruebas y hooks de base de datos.
    *   Uso de **Model Factories** para generar datos de prueba.
    *   Implementación de pruebas funcionales para el flujo de login.
    *   Depuración profunda de errores comunes en pruebas (CSRF, redirecciones, sesión, etc.).

*   **Capítulo 9: Protección de Rutas con Middleware**
    *   Aplicación del `auth` middleware a rutas.
    *   Refactorización de rutas a un patrón modular escalable, usando funciones exportadas para resolver problemas de sincronía.
    *   Análisis del `auth` middleware y el método `ctx.auth.authenticateUsing()`.
