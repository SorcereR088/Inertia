import { passwordResetSendValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class ForgotPasswordsController {
  
  async index({}: HttpContext) {}
  
  async send({request, response, session}: HttpContext) {
    const {email} = await request.validateUsing(passwordResetSendValidator)
  }
  
  async reset({}: HttpContext) {}
  
  async update({}: HttpContext) {}
  
}