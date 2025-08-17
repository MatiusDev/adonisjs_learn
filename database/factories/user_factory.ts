import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  // Usamos el modelo que creamos anteriormente para crear instancia de usuario, en este caso un fake user
  // Faker por defecto es un objeto que contiene mucha información fake dentro que puede ser usada
  .define(User, async ({ faker }) => {
    return {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'Password123', //Usando una clave por defecto para todas las pruebas
    }
  })
  .build()
