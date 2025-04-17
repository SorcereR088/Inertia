import Organization from "#models/organization"
import User from "#models/user"
import db from "@adonisjs/lucid/services/db"
import { TransactionClientContract } from "@adonisjs/lucid/types/database"

type Params = {
  user: User
}

export default class DestroyUserAccount {
  static async handle({user}: Params) {
    await db.transaction(async (trx) => {
      user.useTransaction(trx) 
      await this.#deleteDanglingOrganization(user, trx)
    })
  }

  static async #deleteDanglingOrganization(user: User, trx: TransactionClientContract){
    return Organization.query({client: trx})
    .whereHas('users', (query) => query.where('users.id', user.id))
    .whereDoesntHave('users',(query) => query.whereNot('users.id', user.id))
    .delete()
  }
}