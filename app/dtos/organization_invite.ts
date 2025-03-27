import { BaseModelDto } from '@adocasts.com/dto/base'
import OrganizationInvite from '#models/organization_invite'
import OrganizationDto from '#dtos/organization'
import UsersDto from '#dtos/user'
import RoleDto from '#dtos/role'

export default class OrganizationInviteDto extends BaseModelDto {
  declare id: number
  declare organizationId: number
  declare invitedByUserId: number
  declare canceledByUserId: number | null
  declare email: string
  declare roleId: number
  declare acceptedAt: string | null
  declare canceledAt: string | null
  declare createdAt: string
  declare updatedAt: string
  declare organization: OrganizationDto | null
  declare invitedByUser: UsersDto | null
  declare canceledByUser: UsersDto | null
  declare role: RoleDto | null

  constructor(organizationInvite?: OrganizationInvite) {
    super()

    if (!organizationInvite) return
    this.id = organizationInvite.id
    this.organizationId = organizationInvite.organizationId
    this.invitedByUserId = organizationInvite.invitedByUserId
    this.canceledByUserId = organizationInvite.canceledByUserId
    this.email = organizationInvite.email
    this.roleId = organizationInvite.roleId
    this.acceptedAt = organizationInvite.acceptedAt?.toISO()!
    this.canceledAt = organizationInvite.canceledAt?.toISO()!
    this.createdAt = organizationInvite.createdAt.toISO()!
    this.updatedAt = organizationInvite.updatedAt.toISO()!
    this.organization = organizationInvite.organization && new OrganizationDto(organizationInvite.organization)
    this.invitedByUser = organizationInvite.invitedByUser && new UsersDto(organizationInvite.invitedByUser)
    this.canceledByUser = organizationInvite.canceledByUser && new UsersDto(organizationInvite.canceledByUser)
    this.role = organizationInvite.role && new RoleDto(organizationInvite.role)
  }
}