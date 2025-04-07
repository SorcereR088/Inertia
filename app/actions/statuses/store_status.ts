import Organization from '#models/organization'
import { statusValdator } from '#validators/status'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  data: Infer<typeof statusValdator>
}

export default class StoreStatus {
  static async handle({ organization, data }: Params) {
    const lastStatus = await organization
      .related('statuses')
      .query()
      .orderBy('order', 'desc')
      .first()
    return organization.related('statuses').create({
      ...data,
      order: lastStatus ? lastStatus.order + 1 : 0,
    })
  }
}
