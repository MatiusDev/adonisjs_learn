import { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  public async show({ view }: HttpContext) {
    return view.render('pages/dashboard')
  }
}
