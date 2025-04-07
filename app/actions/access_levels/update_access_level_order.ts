import AccessLevel from "#models/access_level"
import Organization from "#models/organization"

type Params = {
  organization: Organization
  ids: number[]
}

export default class UpdateAccessLevelOrder {
  static async handle({organization, ids}: Params) {
    const accessLevels = await  organization.getAccessLevels()

    return this.#updateOrder(accessLevels, ids)
  }

  static async #updateOrder(difficulties: AccessLevel[], ids: number[]){
    const promises = ids.map((id, order) => {
      const AccessLevel  = difficulties.find((record) => record.id === id)
      const isDefault = order === 0

      AccessLevel?.merge({
        order,
        isDefault
      })

      return AccessLevel?.save() 
    })

    return Promise.all(promises)
  }
}