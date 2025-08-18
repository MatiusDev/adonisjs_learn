/*
| -> Las rutas públicas no requieren autenticación
| -> Las rutas privadas solo son accesibles para usuarios autenticados
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
// Routes
import dashboardRoutes from '#start/routes/dashboard'

const AuthController = () => import('#controllers/auth_controller')

/*
|--------------------------------------------------------------------------
| Rutas públicas
|--------------------------------------------------------------------------
*/
router.get('/login', [AuthController, 'showLogin']).as('login')
router.post('/login', [AuthController, 'login'])

router.get('/register', [AuthController, 'showRegister']).as('register')
router.post('/register', [AuthController, 'register'])

router.on('/').redirectToPath('/dashboard')

/*
|--------------------------------------------------------------------------
| Rutas privadas
|--------------------------------------------------------------------------
*/
// En group se deben agregar todas las rutas que se desean proteger, por ejemplo 'users.ts'
// La función group recibe como parámetro un callback por lo que es posible desacoplarlo en otro archivo creando la función e importandola acá
router
  .group(() => {
    router.post('/logout', [AuthController, 'logout'])
    router.group(dashboardRoutes).prefix('/dashboard')
  })
  .use(middleware.auth())
