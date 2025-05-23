import { BaseModelDto } from '@adocasts.com/dto/base'
import AccessLevel from '#models/access_level'
import OrganizationDto from '#dtos/organization'
import CourseDto from '#dtos/course'
import LessonDto from '#dtos/lesson'

export default class AccessLevelDto extends BaseModelDto {
  declare id: number
  declare organizationId: number
  declare name: string
  declare color: string
  declare order: number
  declare is_default: boolean
  declare createdAt: string
  declare updatedAt: string
  declare organization: OrganizationDto | null
  declare courses: CourseDto[]
  declare lesson: LessonDto[]
  declare meta: Record<string, any>
  constructor(accessLevel?: AccessLevel) {
    super()

    if (!accessLevel) return
    this.id = accessLevel.id
    this.organizationId = accessLevel.organizationId
    this.name = accessLevel.name
    this.color = accessLevel.color
    this.order = accessLevel.order
    this.is_default = accessLevel.isDefault
    this.createdAt = accessLevel.createdAt.toISO()!
    this.updatedAt = accessLevel.updatedAt.toISO()!
    this.organization = accessLevel.organization && new OrganizationDto(accessLevel.organization)
    this.courses = CourseDto.fromArray(accessLevel.courses)
    this.lesson = LessonDto.fromArray(accessLevel.lessons)

    this.meta = accessLevel.$extras
  }
}