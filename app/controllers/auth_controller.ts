import type { HttpContext } from '@adonisjs/core/http'

// Validators
import { loginValidator } from '#validators/login'

export default class AuthController {
  // Renderizamos una vista gracias al HTTPContext y función render
  public async showLoginForm({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  // Creamos una función que recibe los datos post del formulario y devolvemos como respuesta un json
  public async login({ request, response }: HttpContext) {
    /* Recibir información sin validar campos
    const email = request.input('email')
    const password = request.input('password')

    ---- Validando los campos -----
    Request -> Validate a sí misma (validateUsing) usando el validator de login
    Si la validación falla devuelve una exepción, caso contrario devuelve los datos validados y formateados (En caso de un trim o lowercase)*/
    const { email, password } = await request.validateUsing(loginValidator)

    return response.json({
      message: 'Datos recibidos',
      email,
      password,
    })
  }
}
