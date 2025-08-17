import { BaseSchema } from '@adonisjs/lucid/schema'

// Una vez configurado el archivo se debe ejecutar el comando node ace migration:run
// Este a su vez crea la tabla users, y los esquemas adonis_schema y adonis_schema_versions, sirven para llegar un registro interno de qué miraciones ya se han ejecutado y evitar que se vuelvan a crear. Es un sistema de control
// Cuando ya está lista la migración se proceden a crear nuestro modelo, que son los que permiten manipular la data entre endpoints desde un ORM
// Comando para crear un modelo: node ace make:model <model_name>
export default class extends BaseSchema {
  protected tableName = 'users'

  // Este método sirve para aplicar cambios (crear o modificar tablas)
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Añadir columnas en la tabla
      table.string('full_name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  // Este método sirve para revertir cambios (rollback)
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
