import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import testUtils from '@adonisjs/core/services/test_utils'

/* Antes de correr cualquier prueba recuerda configurar la omisión del CSRF para el entorno de pruebas */

test.group('Auth login', (group) => {
  // Inicia una transacción en la BD y la revierte al final.
  // Esto asegura que cada prueba se ejecute en su estado limpio
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('login a user with valid credentials', async ({ client }) => {
    // Crear un usuario falso y lo guardamos en la BD de pruebas
    const user = await UserFactory.create()

    // Petición POST a login como si llenaramos el formulario
    const response = await client
      .post('/login')
      .form({
        email: user.email,
        // Recordar colocar la clave en texto plano, ya que se usa el AuthFinder para el hash de la clave
        password: 'Password123',
      })
      .redirects(0)

    // Verificamos la respuesta de redirección a dahboard y la sesión del usuario
    response.assertStatus(302)
    response.assertHeader('location', '/dashboard')
    response.assertSession('auth_web', user.id)
  })

  test('dashboard is accessible after login', async ({ client }) => {
    const user = await UserFactory.create()

    // Usamos .loginAs(user) para autenticar al usuario para ESTA petición.
    const response = await client.get('/dashboard').loginAs(user)
    response.assertStatus(200)
    response.assertTextIncludes('Dashboard')
  })

  test('login a user with invalid credentials', async ({ client }) => {
    // Crear un usuario falso y lo guardamos en la BD de pruebas
    const user = await UserFactory.create()

    // Petición POST a login como si llenaramos el formulario
    const response = await client
      .post('/login')
      .form({
        email: user.email,
        // Recordar colocar la clave en texto plano, ya que se usa el AuthFinder para el hash de la clave
        password: '1234567890',
      })
      .redirects(0)

    // Verificamos la respuesta de redirección
    response.assertStatus(302)
    response.assertHeader('location', '/login')
    response.assertFlashMessage('error', 'Las credenciales proporcionadas son incorrectas.')
  })

  test('logout before user is logged', async ({ client }) => {
    const user = await UserFactory.create()
    // Probamos desloguearnos desde el botón estando logueados, nos debe redirecionar al login
    const response = await client.post('/logout').loginAs(user).redirects(0)
    response.assertStatus(302)
    response.assertHeader('location', '/login')

    // Probamos acceder de nuevo a la ruta sin la sesión y nos debe retornar al login
    const dashboardResponse = await client.get('/dashboard').redirects(0)
    dashboardResponse.assertStatus(302)
    response.assertHeader('location', '/login')
  })
})

test.group('Auth register', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('register a new user and log them in', async ({ client, assert }) => {
    const userMock = {
      fullName: 'Test User',
      email: 'test@user.com',
      password: 'testing123',
      password_confirmation: 'testing123',
    }

    const response = await client.post('/register').form(userMock).redirects(0)

    response.assertStatus(302)
    response.assertHeader('location', '/dashboard')
    const user = await db.from('users').where('email', userMock.email).first()
    assert.isNotNull(user)

    response.assertSession('auth_web', user.id)
  })
})
