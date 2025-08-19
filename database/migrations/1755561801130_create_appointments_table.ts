import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'appointments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('patient_id')
        .unsigned()
        .references('id')
        .inTable('patients')
        .onDelete('CASCADE')
      table.integer('doctor_id').unsigned().references('id').inTable('doctors').onDelete('CASCADE')
      table.date('appointment_date').notNullable()
      table.time('appointment_time').notNullable()
      table.string('reason', 150).notNullable()
      table.text('description').nullable()
      table.string('status', 50).notNullable()
      table.string('payment_method', 50).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
