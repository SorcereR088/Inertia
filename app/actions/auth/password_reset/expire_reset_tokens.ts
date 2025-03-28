import User from '#models/user'
import { DateTime } from 'luxon'

type Params = {
  user: User
}

export default class ExpiredPasswordResetTokens {
  static async handle({ user }: Params) {
    await user
      .related('passwordResetTokens')
      .query()
      .where('expiresAt', '>=', DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
      .update({
        expiresAt: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        updatedAt: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
      })
  }
}
