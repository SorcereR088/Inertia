import { BaseModelDto } from '@adocasts.com/dto/base'
import PasswordResetToken from '#models/password_reset_token'

export default class PasswordResetTokenDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare createdAt: string
  declare updatedAt: string

  constructor(passwordResetToken?: PasswordResetToken) {
    super()

    if (!passwordResetToken) return
    this.id = passwordResetToken.id
    this.name = passwordResetToken.name
    this.createdAt = passwordResetToken.createdAt.toISO()!
    this.updatedAt = passwordResetToken.updatedAt.toISO()!
  }
}