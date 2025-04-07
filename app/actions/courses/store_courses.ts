import Organization from '#models/organization'
import { courseValidator } from '#validators/course'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  data: Infer<typeof courseValidator>
}

export default class StoreCourses {
  static async handle({ organization, data }: Params) {
    return organization.related('courses').create({
      ...data,
      order: await this.#findNextOrder(organization),
    })
  }

  static async #findNextOrder(organization: Organization) {
    const last = await organization
      .related('courses')
      .query()
      .select('id', 'order')
      .orderBy('order', 'desc')
      .first()

    return last ? last.order + 1 : 1
  }
}
