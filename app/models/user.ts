import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'

// Mixin Authfinder, sirve para añadir el método estático verifyCredentials
// verifyCredentials nos reduce los pasos de validar manualmente las credenciales, en su caso busca un usuario por email, hashea la password y la compara con la password hasheada en base de datos
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column()
  declare email: string

  // Recordemos que la serialización es el proceso de convertir un objeto (Instancia de User) a un formato fácil de transmitir (JSON)
  // Evitamos que este campo se incluya en la serialización, para evitar fugas de seguridad
  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /* Se crea un Hook @beforeSave() que permite validar la entrada de datos antes de almacenarlos en la base de datos
  @beforeSave()
  public static async hashPassword(user: User) {
    // Si la contraseña ha sido modificada la hasheamos
    // Esto solo pasa si se ha creado o modificado la contraseña en un formulario previamente, si es el caso $dirty tiene la contraseña en él
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
  
  Lo anterior funcionaba para una versión anterior de AdonisJS, ahora el mixin AuthFinder se encarga de este funcionamiento e internamente tiene el hook en su clase, por lo que ya no es necesario colocarlo, solo es necesario aprender a implementar el mixin para darle esta funcionalidad.
  */
}
