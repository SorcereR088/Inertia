import StoreOrganization from '../actions/organizations/store_organization.js'
import { organizationValidator } from '#validators/organization'
import type { HttpContext } from '@adonisjs/core/http'
import SetActiveOrganization from '../actions/organization/http/set_active_organization.js'
import { inject } from '@adonisjs/core'

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

    this.setActiveOrganization.handle({id: organization.id})
    
    return response.redirect().toPath('/')
  }

  async active({response, params}: HttpContext){
    this.setActiveOrganization.handle({id: params.id})

    return response.redirect().toPath('/')
  }
}
