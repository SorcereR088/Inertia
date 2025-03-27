import Users from '#models/user'
import { registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'

type Params = {
  data: Infer<typeof registerValidator>
}

@inject()
export default class WebRegister {
  constructor(protected ctx: HttpContext) {}

  async handle({data}: Params) {
    console.log("receidef:", data)
    const user = await Users.create(data)

    await this.ctx.auth.use('web').login(user)
    return {user}
  }
}