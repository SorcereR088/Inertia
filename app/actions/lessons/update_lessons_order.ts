import Organization from '#models/organization'
import { lessonOrderValidator } from '#validators/lesson'
import db from '@adonisjs/lucid/services/db'
import { Infer } from '@vinejs/vine/types'

type SortData = Infer<typeof lessonOrderValidator>

type Params = {
  organization: Organization
  courseId: number
  data: SortData
}

type LessonFlattenData = {
  id: number
  moduleId: number
  order: number
}

export default class UpdateLessonsOrder {
  static async handle({ organization, data, courseId }: Params) {
    const course = await organization.related('courses').query().where('id', courseId).firstOrFail()
    const lessons = await course.related('lessons').query().select('id', 'moduleId', 'order')
    const lessonsData = this.#flattenData(data)

    return db.transaction(async (trx) => {
      const promises = lessonsData.map(({ id, moduleId, order }) => {
        const lesson = lessons.find((item) => item.id === id)

        const isSame = lesson?.order === order && lesson?.moduleId === moduleId
        if (!lesson || isSame) {
          return
        }

        lesson.useTransaction(trx)

        return lesson.merge({ moduleId, order }).save()
      })

      return Promise.all(promises)
    })
  }

  static #flattenData(data: SortData) {
    return data.modules.reduce<LessonFlattenData[]>((lessons, module) => {
      const moduleLessons = module.lessons.map((id, index) => ({
        id,
        moduleId: module.id,
        order: index,
      }))
      return [...lessons, ...moduleLessons]
    }, [])
  }
}
