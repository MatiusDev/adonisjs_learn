import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

// Models
import Patient from '#models/patient'
import Doctor from '#models/doctor'

export default class Appointment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare doctorId: number

  @column()
  declare patientId: number

  @column()
  declare appointmentDte: DateTime

  @column()
  declare reason: string

  @column()
  declare description: string

  @column()
  declare status: string

  @column()
  declare paymentMethod: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Patient)
  declare patient: BelongsTo<typeof Patient>

  @belongsTo(() => Doctor)
  declare doctor: BelongsTo<typeof Doctor>
}
