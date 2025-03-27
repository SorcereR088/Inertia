import { loginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import WebLogin from '../../actions/auth/http/web_login.js'
import { inject } from '@adonisjs/core'

export default class LoginController {
  async show({ inertia }: HttpContext) {
    return inertia.render('auth/Login')
  }

  @inject()
  async store({ request, response }: HttpContext, WebLogin: WebLogin) {
    const data = await request.validateUsing(loginValidator)
    await WebLogin.handle({ data })
    return response.redirect().toRoute('/')
  }
}
