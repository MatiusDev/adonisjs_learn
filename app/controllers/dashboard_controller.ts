import { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  public async show({ view, auth }: HttpContext) {
    const { user } = auth

    return view.render('pages/dashboard', { user })
  }
}
