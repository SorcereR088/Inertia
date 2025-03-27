import StoreOrganization from '../actions/organizations/store_organization.js'
import { organizationValidator } from '#validators/organization'
import type { HttpContext } from '@adonisjs/core/http'

export default class OrganizationsController {
  async create({ inertia }: HttpContext) {
    return inertia.render('organizations/create')
  }

  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(organizationValidator)
    const organization = await StoreOrganization.handle({
      user: auth.use('web').user!,
      data,
    })

    return response.redirect().toPath('/')
  }
}
