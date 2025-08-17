/*
| -> Las rutas públicas no requieren autenticación
| -> Las rutas privadas solo son accesibles para usuarios autenticados
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

import dashboardRoutes from '#start/routes/dashboard'

/*
|--------------------------------------------------------------------------
| Rutas públicas
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    router.get('/', '#controllers/auth_controller.showLoginForm')
    router.post('/', '#controllers/auth_controller.login')
  })
  .prefix('/login')

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
    router.group(dashboardRoutes).prefix('/dashboard')
  })
  .use(middleware.auth())
