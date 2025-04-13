import { BaseModelDto } from '@adocasts.com/dto/base'
import Lesson from '#models/lesson'
import OrganizationDto from '#dtos/organization'
import AccessLevelDto from '#dtos/access_level'
import StatusDto from '#dtos/status'
import ModuleDto from '#dtos/module'

export default class LessonDto extends BaseModelDto {
  declare id: number
  declare moduleId: number
  declare organizationId: number
  declare accessLevelId: number
  declare statusId: number
  declare name: string
  declare notes: string | null
  declare order: number
  declare publishAt: string | null
  declare createdAt: string
  declare updatedAt: string
  declare organization: OrganizationDto | null
  declare accessLevel: AccessLevelDto | null
  declare status: StatusDto | null
  declare modules: ModuleDto | null

  constructor(lesson?: Lesson) {
    super()

    if (!lesson) return
    this.id = lesson.id
    this.moduleId = lesson.moduleId
    this.organizationId = lesson.organizationId
    this.accessLevelId = lesson.accessLevelId
    this.statusId = lesson.statusId
    this.name = lesson.name
    this.notes = lesson.notes
    this.order = lesson.order
    this.publishAt = lesson.publishedAt?.toISO()!
    this.createdAt = lesson.createdAt.toISO()!
    this.updatedAt = lesson.updatedAt.toISO()!
    this.organization = lesson.organization && new OrganizationDto(lesson.organization)
    this.accessLevel = lesson.accessLevel && new AccessLevelDto(lesson.accessLevel)
    this.status = lesson.status && new StatusDto(lesson.status)
    this.modules = lesson.modules && new ModuleDto(lesson.modules)
  }
}