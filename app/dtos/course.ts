import { BaseModelDto } from '@adocasts.com/dto/base'
import Course from '#models/course'
import OrganizationDto from '#dtos/organization'
import AccessLevelDto from '#dtos/access_level'
import DifficultyDto from '#dtos/difficulty'
import StatusDto from '#dtos/status'
import ModuleDto from '#dtos/module'
import LessonDto from '#dtos/lesson'
import Organization from '#models/organization'

export default class CourseDto extends BaseModelDto {
  declare id: number
  declare organizationId: number
  declare accessLevelId: number
  declare difficultyId: number
  declare statusId: number
  declare name: string
  declare notes: string | null
  declare order: number
  declare createdAt: string
  declare updatedAt: string
  declare organization: OrganizationDto | null
  declare accessLevel: AccessLevelDto | null
  declare difficulty: DifficultyDto | null
  declare status: StatusDto | null
  declare modules: ModuleDto[]

  declare meta: Record<string , any>

  constructor(course?: Course) {
    super()

    if (!course) return
    this.id = course.id
    this.organizationId = course.organizationId
    this.accessLevelId = course.accessLevelId
    this.difficultyId = course.difficultyId
    this.statusId = course.statusId
    this.name = course.name
    this.notes = course.notes
    this.order = course.order
    this.createdAt = course.createdAt.toISO()!
    this.updatedAt = course.updatedAt.toISO()!
    this.organization = course.organization && new OrganizationDto(course.organization)
    this.accessLevel = course.accessLevel && new AccessLevelDto(course.accessLevel)
    this.difficulty = course.difficulty && new DifficultyDto(course.difficulty)
    this.status = course.status && new StatusDto(course.status)
    this.modules = ModuleDto.fromArray(course.modules)
    this.meta = course.$extras
  }
}