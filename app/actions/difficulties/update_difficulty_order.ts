import Difficulty from "#models/difficulty"
import Organization from "#models/organization"

type Params = {
  organization: Organization
  ids: number[]
}

export default class UpdateDifficultyOrder {
  static async handle({organization, ids}: Params) {
    const difficulties = await  organization.getDifficulties()

    return this.#updateOrder(difficulties, ids)
  }

  static async #updateOrder(difficulties: Difficulty[], ids: number[]){
    const promises = ids.map((id, order) => {
      const difficulty  = difficulties.find((record) => record.id === id)
      const is_default = order === 0

      difficulty?.merge({
        order,
        is_default
      })

      return difficulty?.save() 
    })

    return Promise.all(promises)
  }
}