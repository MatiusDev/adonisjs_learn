import vine from '@vinejs/vine'
import db from '@adonisjs/lucid/services/db'

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (_, field) => {
        // Comprueba en la tabla 'users' si el email (field) ya existe
        const user = await db.from('users').where('email', field).first()
        return !user
      }),
    password: vine.string().minLength(8).confirmed(),
  })
)
