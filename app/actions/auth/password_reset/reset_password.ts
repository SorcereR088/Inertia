import { passwordResetValidator } from '#validators/auth'
import { Infer } from '@vinejs/vine/types'
import VerifyPasswordResetToken from './verify_password_reset_token.js'
import { Exception } from '@adonisjs/core/exceptions'
import ExpiredPasswordResetTokens from './expire_reset_tokens.js'

type Params = {
  data: Infer<typeof passwordResetValidator>
}

export default class ResetPassword {
  static async handle({ data }: Params) {
    const { isValid, user } = await VerifyPasswordResetToken.handle({ encryptedValue: data.value })
    if (!isValid) {
      throw new Exception('The Password reset token provided in invalid or expired.', {
        status: 403,
        code: 'E_UNAUTHORISED',
      })
    }

    await user!.merge({ password: data.password }).save()
    await ExpiredPasswordResetTokens.handle({user: user!})

    return user!
  }
}
