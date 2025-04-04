import WebLogout from '../../actions/auth/http/web_logout.js'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

export default class LogoutController {
  @inject()
  async handle({ response, session }: HttpContext, webLogout: WebLogout) {
    await webLogout.handle()

    session.flash('success', 'You have been Logged Out')
    return response.redirect().toRoute('/login')
  }
}
