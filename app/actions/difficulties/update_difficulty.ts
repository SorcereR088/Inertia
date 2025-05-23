import Organization from "#models/organization"
import { difficultyValdator } from "#validators/difficulty"
import { Infer } from "@vinejs/vine/types"

type Params = {
  organization: Organization
  id: number
  data: Infer<typeof difficultyValdator>
}

export default class UpdateDifficulty {
  static async handle({organization, id, data}: Params) {
    const difficulty = await organization.related('difficulties').query().where({id}).firstOrFail()

    await difficulty.merge(data).save()
    return difficulty
  }
}