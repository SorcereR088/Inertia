import { updateEmailValidator } from '#validators/setting'
import type { HttpContext } from '@adonisjs/core/http'
import UpdateUserEmail from '../../actions/settings/update_user_email.js'

export default class AccountsController {
  
  async index({inertia}: HttpContext) {
    return inertia.render('settings/Account')
  }
  
  async updateEmail({request, response, session, auth}: HttpContext) {
    const data = await request.validateUsing(updateEmailValidator)
    const user = await auth.use('web').user!

    if(data.email === user.email){
      session.flash('success', 'You are aleady using the submitted email')
      return response.redirect().back()
    }
    await UpdateUserEmail.handle({ user, data})
    session.flash('success', "Your email have been uupdated")
    return response.redirect().back()
  }
  
  async destroy({}: HttpContext) {}
  
}