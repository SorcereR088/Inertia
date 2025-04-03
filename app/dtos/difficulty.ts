import { BaseModelDto } from '@adocasts.com/dto/base'
import Difficulty from '#models/difficulty'
import OrganizationDto from '#dtos/organization'
import CourseDto from '#dtos/course'
import LessonDto from '#dtos/lesson'

export default class DifficultyDto extends BaseModelDto {
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


  constructor(difficulty?: Difficulty) {
    super()

    if (!difficulty) return
    this.id = difficulty.id
    this.organizationId = difficulty.organizationId
    this.name = difficulty.name
    this.color = difficulty.color
    this.order = difficulty.order
    this.is_default = difficulty.is_default
    this.createdAt = difficulty.createdAt.toISO()!
    this.updatedAt = difficulty.updatedAt.toISO()!
    this.organization = difficulty.organization && new OrganizationDto(difficulty.organization)
    this.courses = CourseDto.fromArray(difficulty.courses)
    this.lesson = LessonDto.fromArray(difficulty.lesson)

    this.meta = difficulty.$extras
  }
}