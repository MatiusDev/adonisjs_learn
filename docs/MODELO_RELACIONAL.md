
# Modelo Relacional: Aplicación de Clínica

Este documento describe el esquema de la base de datos para el sistema de gestión de citas médicas.

---

## 1. Resumen General

El propósito de esta base de datos es almacenar y gestionar la información de doctores, pacientes y las citas que los conectan. Es un sistema transaccional diseñado para soportar las operaciones CRUD (Crear, Leer, Actualizar, Borrar) de la aplicación de la clínica.

---

## 2. Desglose de Tablas

### Tabla: `doctors`
- **Descripción:** Almacena información sobre los doctores disponibles en el sistema.

| Columna | Tipo de Dato | Restricciones | Descripción |
|---|---|---|---|
| `id` | `serial` | `PRIMARY KEY` | Identificador único y auto-incremental para cada doctor. |
| `name` | `varchar(100)` | | El nombre completo del doctor. |
| `specialty` | `varchar(100)` | | La especialidad médica del doctor (ej. 'Cardiología'). |

### Tabla: `patients`
- **Descripción:** Almacena información sobre los pacientes registrados en el sistema.

| Columna | Tipo de Dato | Restricciones | Descripción |
|---|---|---|---|
| `id` | `serial` | `PRIMARY KEY` | Identificador único y auto-incremental para cada paciente. |
| `name` | `varchar(100)` | | El nombre completo del paciente. |
| `email` | `varchar(150)` | | El correo electrónico de contacto del paciente. |

### Tabla: `appointments`
- **Descripción:** Tabla central que vincula a doctores y pacientes para gestionar las citas.

| Columna | Tipo de Dato | Restricciones | Descripción |
|---|---|---|---|
| `id` | `serial` | `PRIMARY KEY` | Identificador único y auto-incremental para cada cita. |
| `patient_id` | `integer` | `FOREIGN KEY` | Referencia al `id` del paciente que agenda la cita. |
| `doctor_id` | `integer` | `FOREIGN KEY` | Referencia al `id` del doctor asignado a la cita. |
| `appointment_date` | `timestamp` | | La fecha específica de la cita programada. |
| `appointment_time` | `timestamp` | | La hora específica de la cita programada. |
| `reason` | `varchar(255)` | | Un motivo breve para la visita (ej. 'Chequeo Anual'). |
| `description` | `text` | | Descripción detallada de los síntomas o necesidades del paciente. |
| `status` | `varchar(50)` | | El estado actual de la cita (ej. 'Programada', 'Completada'). |
| `payment_method` | `varchar(50)` | | El método de pago utilizado (ej. 'Tarjeta', 'Seguro'). |

---

## 3. Relaciones

- **`patients` (1) -> (N) `appointments`**
  - **Tipo:** Uno a Muchos.
  - **Descripción:** Un paciente puede tener muchas citas, pero cada cita pertenece a un solo paciente. La relación se establece a través de la clave foránea `appointments.patient_id`.

- **`doctors` (1) -> (N) `appointments`**
  - **Tipo:** Uno a Muchos.
  - **Descripción:** Un doctor puede tener muchas citas, pero cada cita se asigna a un solo doctor. La relación se establece a través de la clave foránea `appointments.doctor_id`.
