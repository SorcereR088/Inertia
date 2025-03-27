import { registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import WebRegister from '../../actions/auth/http/web_register.js'

export default class RegisterController {
  
  async show({inertia}: HttpContext) {  
    return inertia.render('auth/Register')
  }

  @inject()
  async store({request, response, session}: HttpContext, WebRegister: WebRegister) {
    const data = await request.validateUsing(registerValidator)

    await WebRegister.handle({data})
    session.flash('success', 'welcome')
    return response.redirect().toRoute('organization.create')
  }
  
}