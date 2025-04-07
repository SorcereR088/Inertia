import Organization from "#models/organization"
import { accessLevelValdator } from "#validators/access_levels"
import { Infer } from "@vinejs/vine/types"

type Params = {
  data: Infer<typeof accessLevelValdator>
  organization: Organization
}

export default class StoreAccessLevel {
  static async handle({organization, data}: Params) {
    
    const lastAccessLevel = await organization.related('difficulties').query().orderBy('order', 'desc').first()
    return organization.related('accessLevels').create({
      ...data,
      order: lastAccessLevel ? lastAccessLevel.order + 1  : 0 
    })
  }
}