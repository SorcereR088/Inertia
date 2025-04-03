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
  declare modules: ModuleDto[]
  declare lessons: LessonDto[]
  declare difficulties: DifficultyDto[]
  declare accessLevels: AccessLevelDto[]
  declare statuses: StatusDto[]
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
    this.modules = ModuleDto.fromArray(organization.modules)
    this.lessons = LessonDto.fromArray(organization.lessons)
    this.difficulties = DifficultyDto.fromArray(organization.difficulties)
    this.accessLevels = AccessLevelDto.fromArray(organization.accessLevels)
    this.statuses = StatusDto.fromArray(organization.statuses)
    this.organizationInvite = OrganizationInviteDto.fromArray(organization.invites)
    this.users = UsersDto.fromArray(organization.users)
  }
}