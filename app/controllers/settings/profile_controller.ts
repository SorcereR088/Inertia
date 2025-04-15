import { updateProfileValidator } from '#validators/setting'
import type { HttpContext } from '@adonisjs/core/http'
import UpdateUserProfile from '../../actions/settings/update_user_profile.js'

export default class ProfileController {
  
  async index({inertia}: HttpContext) {
    return inertia.render('settings/Profile')
  }
  
  async update({request, response, auth, session}: HttpContext) {
    const data = await request.validateUsing(updateProfileValidator)
    await UpdateUserProfile.handle({
      user: auth.use('web').user!,
      data
    })
    session.flash('success', 'Your profile has been updates')
    return response.redirect().back()
  }
  
}