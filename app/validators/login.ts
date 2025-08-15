import vine from '@vinejs/vine'

// Compilamos un esquema de validación (Rapidez en tiempo de ejecución)
export const loginValidator = vine.compile(
  // Especificar que los datos de entrada sean un objeto
  // Reglas encadenadas para validar cada campo
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(8),
  })
)
