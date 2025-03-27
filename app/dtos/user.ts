import { BaseModelDto } from '@adocasts.com/dto/base'
import User from '#models/user'
import EmailHistoryDto from '#dtos/email_history'
import PasswordResetTokenDto from '#dtos/password_reset_token'
import OrganizationDto from '#dtos/organization'

export default class UserDto extends BaseModelDto {
  declare id: number
  declare fullname: string
  declare email: string
  declare password: string
  declare createdAt: string
  declare updatedAt: string
  declare emailHistories: EmailHistoryDto[]
  declare passwordResetTokens: PasswordResetTokenDto[]
  declare organization: OrganizationDto[]

  constructor(user?: User) {
    super()

    if (!user) return
    this.id = user.id
    this.fullname = user.fullname
    this.email = user.email
    this.password = user.password
    this.createdAt = user.createdAt.toISO()!
    this.updatedAt = user.updatedAt.toISO()!
    this.emailHistories = EmailHistoryDto.fromArray(user.emailHistories)
    this.passwordResetTokens = PasswordResetTokenDto.fromArray(user.passwordResetTokens)
    this.organization = OrganizationDto.fromArray(user.organization)
  }
}