import type { HttpContext } from '@adonisjs/core/http'

// Validators
import { loginValidator } from '#validators/login'
import { registerValidator } from '#validators/register'
// models
import User from '#models/user'

export default class AuthController {
  // Renderizamos una vista gracias al HTTPContext y función render
  public async showLogin({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  public async showRegister({ view }: HttpContext) {
    return view.render('pages/auth/register')
  }

  public async register({ request, response, auth }: HttpContext) {
    console.log('HEREEEEEEEEE')
    const { fullName, email, password } = await request.validateUsing(registerValidator)

    const user = await User.create({ fullName, email, password })
    console.log('DEBUGGING RESPONSE HEADERS:', response.getHeaders())
    await auth.use('web').login(user)
    response.redirect().toRoute('dashboard')
    return response
  }

  // Creamos una función que recibe los datos post del formulario y devolvemos como respuesta un json
  public async login({ request, response, auth, session }: HttpContext) {
    /* Recibir información sin validar campos
    const email = request.input('email')
    const password = request.input('password')

    ---- Validando los campos -----
    Request -> Validate a sí misma (validateUsing) usando el validator de login
    Si la validación falla devuelve una exepción, caso contrario devuelve los datos validados y formateados (En caso de un trim o lowercase)*/
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      // Este metodo verifica las credenciales sin son correctas, inicia sesión
      // auth.verifyCredentials nos reduce los pasos de validar manualmente las credenciales, en su caso busca un usuario por email, hashea la password y la compara con la password hasheada en base de datos
      const user = await User.verifyCredentials(email, password)
      // Iniciar sesión con la instancia del usuario, si coincide inicia la sesión, pero si falla, lanza una excepción que estamos capurando en el catch
      await auth.use('web').login(user)
      // Redirige a la ruta principal después del login (Dashboard)
      return response.redirect().toRoute('dashboard')
    } catch (error) {
      session.flash('error', 'Las credenciales proporcionadas son incorrectas.')
      // console.error(error)
      return response.redirect().toRoute('login')
    }
  }

  public async logout({ response, auth, session }: HttpContext) {
    try {
      await auth.use('web').logout()
    } catch (error) {
      session.flash('error', 'Ocurrió un error al intentar cerrar sesión')
      console.error(error)
    }
    return response.redirect().toRoute('login')
  }
}
