import Organization from '#models/organization'
import { statusValdator } from '#validators/status'
import { Infer } from '@vinejs/vine/types'

type Params = {
  organization: Organization
  id: number
  data: Infer<typeof statusValdator>
}

export default class UpdateStatus {
  static async handle({ organization, id, data }: Params) {
    const status = await organization
      .related('statuses')
      .query()
      .where('statuses.id', id)
      .firstOrFail()
    await status.merge(data).save()
    return status
  }
}
