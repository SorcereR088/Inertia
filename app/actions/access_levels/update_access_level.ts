import Organization from "#models/organization"
import { accessLevelValdator } from "#validators/access_levels"
import { Infer } from "@vinejs/vine/types"

type Params = {
  organization: Organization
  id: number
  data: Infer<typeof accessLevelValdator>
}

export default class UpdateaccessLevel {
  static async handle({organization, id, data}: Params) {
    const accessLevel = await organization.related('accessLevels').query().where({id}).firstOrFail()

    await accessLevel.merge(data).save()
    return accessLevel
  }
}