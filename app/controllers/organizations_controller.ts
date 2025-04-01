import StoreOrganization from '../actions/organizations/store_organization.js'
import { organizationValidator } from '#validators/organization'
import type { HttpContext } from '@adonisjs/core/http'
import SetActiveOrganization from '../actions/organization/http/set_active_organization.js'
import { inject } from '@adonisjs/core'
import UpdateOrgnization from '../actions/organizations/update_orgnization.js'

@inject()
export default class OrganizationsController {
  constructor(protected setActiveOrganization: SetActiveOrganization) {}
  async create({ inertia }: HttpContext) {
    return inertia.render('organizations/create')
  }

  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(organizationValidator)
    const organization = await StoreOrganization.handle({
      user: auth.use('web').user!,
      data,
    })

    this.setActiveOrganization.handle({ id: organization.id })

    return response.redirect().toPath('/')
  }

  async active({ response, params }: HttpContext) {
    this.setActiveOrganization.handle({ id: params.id })

    return response.redirect().toPath('/')
  }

  async update({ response, request, params, auth }: HttpContext) {
    const data = await request.validateUsing(organizationValidator)

    await UpdateOrgnization.handle({
      user: auth.user!,
      id: params.id,
      data,
    })

    return response.redirect().back()
  }
}
