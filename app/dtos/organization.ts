import { BaseModelDto } from '@adocasts.com/dto/base'
import Organization from '#models/organization'
import CourseDto from '#dtos/course'
import ModuleDto from '#dtos/module'
import LessonDto from '#dtos/lesson'
import DifficultyDto from '#dtos/difficulty'
import AccessLevelDto from '#dtos/access_level'
import StatusDto from '#dtos/status'
import OrganizationInviteDto from '#dtos/organization_invite'
import UsersDto from '#dtos/user'

export default class OrganizationDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare createdAt: string
  declare updatedAt: string
  declare courses: CourseDto[]
  declare moduler: ModuleDto[]
  declare lesson: LessonDto[]
  declare difficulty: DifficultyDto[]
  declare accessLevels: AccessLevelDto[]
  declare status: StatusDto[]
  declare organizationInvite: OrganizationInviteDto[]
  declare users: UsersDto[]

  constructor(organization?: Organization) {
    super()

    if (!organization) return
    this.id = organization.id
    this.name = organization.name
    this.createdAt = organization.createdAt.toISO()!
    this.updatedAt = organization.updatedAt.toISO()!
    this.courses = CourseDto.fromArray(organization.courses)
    this.moduler = ModuleDto.fromArray(organization.moduler)
    this.lesson = LessonDto.fromArray(organization.lesson)
    this.difficulty = DifficultyDto.fromArray(organization.difficulty)
    this.accessLevels = AccessLevelDto.fromArray(organization.accessLevels)
    this.status = StatusDto.fromArray(organization.status)
    this.organizationInvite = OrganizationInviteDto.fromArray(organization.organizationInvite)
    this.users = UsersDto.fromArray(organization.users)
  }
}