import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import testUtils from '@adonisjs/core/services/test_utils'

/* Antes de correr cualquier prueba recuerda configurar la omisión del CSRF para el entorno de pruebas */

test.group('Auth login', (group) => {
  // Inicia una transacción en la BD y la revierte al final.
  // Esto asegura que cada prueba se ejecute en su estado limpio
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('login a user with valid credentials', async ({ client, assert }) => {
    // Crear un usuario falso y lo guardamos en la BD de pruebas
    const user = await UserFactory.create()

    // Petición POST a login como si llenaramos el formulario
    const response = await client.post('/login').redirects(0).form({
      email: user.email,
      // Recordar colocar la clave en texto plano, ya que se usa el AuthFinder para el hash de la clave
      password: 'Password123',
    })

    // Verificamos la respuesta de redirección a dahboard
    response.assertStatus(302)
    // response.assertRedirectsTo('/dashboard')
    response.assertHeader('location', '/dashboard')

    const dashboardResponse = await client.get(response.headers().location)
    // Pruebas de redirección y estado exitoso de dashboard
    dashboardResponse.assertStatus(200)
    dashboardResponse.assertTextIncludes('Bienvenido, has iniciado sesión!')
  })

  test('login a user with invalid credentials', async ({ client, assert }) => {
    // Crear un usuario falso y lo guardamos en la BD de pruebas
    const user = await UserFactory.create()

    // Petición POST a login como si llenaramos el formulario
    const response = await client.post('/login').redirects(0).form({
      email: user.email,
      // Recordar colocar la clave en texto plano, ya que se usa el AuthFinder para el hash de la clave
      password: '1234567890',
    })

    // console.log(response)

    // Verificamos la respuesta de redirección
    response.assertStatus(302)
    response.assertHeader('location', '/login')
    response.assertFlashMessage('error', 'Las credenciales proporcionadas son incorrectas.')

    const dashboardResponse = await client.get(response.headers().location)
    dashboardResponse.assertOk() // assertOk es un atajo para assertStatus 200
  })
})
