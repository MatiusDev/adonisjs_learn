/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/login', '#controllers/auth_controller.showLoginForm')
router.post('/login', '#controllers/auth_controller.login')
