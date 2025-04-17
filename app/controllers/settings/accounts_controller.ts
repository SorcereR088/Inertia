import { updateEmailValidator } from '#validators/setting'
import type { HttpContext } from '@adonisjs/core/http'
import UpdateUserEmail from '../../actions/settings/update_user_email.js'
import vine from '@vinejs/vine'
import DestroyUserAccount from '../../actions/settings/destroy_user_account.js'
import { inject } from '@adonisjs/core'
import WebLogout from '../../actions/auth/http/web_logout.js'

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
  
  @inject()
  async destroy({request, response, session, auth}: HttpContext, webLogout: WebLogout) {
    const user = auth.use('web').user!
    const validator = vine.compile(
      vine.object({
        email: vine.string().in([user.email])
      })
    )

    await request.validateUsing(validator)
    await DestroyUserAccount.handle({user})

    await webLogout.handle()
    session.flash('success', 'Your account have been deleted')

    return response.redirect().toRoute('register.show')


  }
  
}