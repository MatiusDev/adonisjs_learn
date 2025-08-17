import router from '@adonisjs/core/services/router'

// Esta es una importación por carga de lazy loading
// Las importaciones anteriores tiene la siguiente estructura:
// router.get('/dashboard', '#controllers/dashboard_controller.show')
const DashboardController = () => import('#controllers/dashboard_controller')

/*
  .as(<string:name>) sirve para darle un nombre único global a la ruta
  Este nombre permite conocer a que ruta se puede redirigir sin necesidad de quemar el nombre en donde se use

  En una vista Edge:
    {{-- Esto generará dinámicamente la URL "/dashboard" --}}
    <a href="{{ route('dashboard') }}">Mi Panel</a>

  En un controlador:
    // Redirigir a la ruta nombrada 'dashboard'
    return response.redirect().toRoute('dashboard')

  De esta manera se genera dinámicamente el nombre de dashboard
*/
export default function dashboardRoutes() {
  router.get('/', [DashboardController, 'show']).as('dashboard')
}
