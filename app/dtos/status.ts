import { BaseModelDto } from '@adocasts.com/dto/base'
import Status from '#models/status'
import OrganizationDto from '#dtos/organization'
import CourseDto from '#dtos/course'
import LessonDto from '#dtos/lesson'

export default class StatusDto extends BaseModelDto {
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

  constructor(status?: Status) {
    super()

    if (!status) return
    this.id = status.id
    this.organizationId = status.organizationId
    this.name = status.name
    this.color = status.color
    this.order = status.order
    this.is_default = status.isDefault
    this.createdAt = status.createdAt.toISO()!
    this.updatedAt = status.updatedAt.toISO()!
    this.organization = status.organization && new OrganizationDto(status.organization)
    this.courses = CourseDto.fromArray(status.courses)
    this.lesson = LessonDto.fromArray(status.lessons)

    this.meta = status.$extras
  }
}