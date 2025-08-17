# Preface: Conocimientos base sobre AdonisJS v6

Este documento se basa en la sección “Preface” de la documentación oficial de AdonisJS v6. Cada subsección hace referencia a una página específica:

***

## 1. Introduction

Referencia: [Introduction (Preface) | AdonisJS Documentation](https://docs.adonisjs.com/guides/preface/introduction)

- **¿Qué es AdonisJS?**
AdonisJS es un framework web orientado a TypeScript para Node.js, apto tanto para aplicaciones full-stack como APIs JSON. Está diseñado para ahorrar tiempo en decisiones triviales y centrarse en entregar características reales para el negocio.
- **Enfoque backend y frontend agnóstico:**
AdonisJS provee herramientas para crear backends sólidos, permitiendo elegir cualquier stack frontend. Es compatible con motores de plantillas tradicionales, API JSON y frameworks modernos vía Inertia.
- **Características modernas:**
Uso de ESModules, aliases de importaciones, SWC para TypeScript, y Vite para bundling.
- **Patrón MVC:**
AdonisJS adopta MVC, gestionando rutas, controladores y modelos e integrando vistas o respuestas JSON.
- **Documentación y comunidad:**
La guía oficial sirve como referencia, cubriendo las APIs de los paquetes y módulos principales. No es un tutorial desde cero; para eso se recomienda Adocasts.
- **Lista de sponsors y lanzamientos recientes:**
Incluye el changelog oficial y menciona sponsors relevantes del proyecto.

***

## 2. FAQs

Referencia: [FAQs (Preface) | AdonisJS Documentation](https://docs.adonisjs.com/guides/preface/faqs)

- **Mantenimiento:**
AdonisJS es un proyecto independiente creado por Harminder Virk, gestionado por un equipo central y colaboradores comunitarios. Es financiado a través de GitHub Sponsors.
- **Licencia:**
El framework y sus paquetes oficiales emplean licencia MIT, accesibles en GitHub.
- **Fiabilidad:**
Empresas como Marie Claire, Renault Group y FIVB usan AdonisJS en producción. Los paquetes oficiales mantienen cero vulnerabilidades de seguridad reportadas por Snyk.
- **Rendimiento:**
El servidor HTTP está a la par de Fastify y las validaciones superan a otras librerías Node.js.
- **Soporte:**
Ofrecen programas de soporte pagado y canales activos para mantenerse actualizado.

***

## 3. Governance

Referencia: [Governance (Preface) | AdonisJS Documentation](https://docs.adonisjs.com/guides/preface/governance)

- **Roles y responsabilidades:**
    - *Autor:* El creador, Harminder Virk, decide qué proyectos están bajo el paraguas de AdonisJS.
    - *Project Leads:* Responsable de gestión y decisiones en cada paquete.
    - *Core Team:* Miembros destacados que contribuyen y ayudan a definir estrategias.
    - *Contributors:* Cualquier miembro puede contribuir y, según participaciones, escalar a Core Team.
    - *Users:* Usuarios finales que pueden evolucionar a contributors.
- **Soporte y donaciones:**
Fomenta asistencia comunitaria y acepta donaciones empresariales.
- **Branding y propiedad:**
El nombre AdonisJS es una marca registrada; su uso en servicios y productos requiere consentimiento.
- **Modelo de gobernanza:**
Inspirado en "Benevolent Dictator Governance Model".

***

## 4. Releases

Referencia: [Releases (Preface) | AdonisJS Documentation](https://docs.adonisjs.com/guides/preface/releases)

- **Lanzamientos notables:**
Registro de versiones y cambios principales en el framework y sus paquetes:


| Paquete | Cambio | Fecha |
| :-- | :-- | :-- |
| @adonisjs/core@v6.14.0 | Añade helpers dd y dump | Sep 21, 2024 |
| @adonisjs/hash@v9.0.5 | Corrige orden de parámetros Argon2 hash | Sep 20, 2024 |
| @adonisjs/core@v6.13.1 | APP_KEY vacío en .env.example | Sep 11, 2024 |
| ... | ... | ... |

*(Ver página oficial para el listado completo y cambios actualizados.)*

***

## 5. Contribution Guide

Referencia: [Contribution Guide (Preface) | AdonisJS Documentation](https://docs.adonisjs.com/guides/preface/contribution-guide)

- **Formas de contribuir:**
    - Corrección de errores, mejora de documentación, creación de blogs/cookbooks, triage de issues y asistencia en comunidad.
    - Requisitos para reportar bugs: reproducir problemas, compartir código y configuraciones, usar formato markdown.
    - Se valora la claridad en los reportes: una buena issue consiste en una reproducción mínima y código relevante.

***