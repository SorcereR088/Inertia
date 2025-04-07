import DestroyAccessLevel from '../actions/access_levels/destroy_access_level.js'
import StoreAccessLevel from '../actions/access_levels/store_difficulty.js'
import UpdateAccessLevelOrder from '../actions/access_levels/update_access_level_order.js'
import UpdateaccessLevel from '../actions/access_levels/update_access_level.js'
import AccessLevelDto from '#dtos/access_level'
import { accessLevelDestroyVaildator, accessLevelOrderValidator, accessLevelValdator } from '#validators/access_levels'
import type { HttpContext } from '@adonisjs/core/http'
import { withOrganizationMetaData } from '#validators/helpers/organizations'

export default class accessLevelsController {
  async index({ inertia, organization }: HttpContext) {
    const accessLevels = await organization.getAccessLevels().withCount('courses').withCount('lessons')
    return inertia.render('access_levels/index', {
      accessLevels: AccessLevelDto.fromArray(accessLevels),
    })
  }

  async store({ request, response, organization }: HttpContext) {
    const data = await request.validateUsing(accessLevelValdator)
    await StoreAccessLevel.handle({ data, organization })
    return response.redirect().back()
  }

  async update({params, request, response, organization}:HttpContext){
    const data = await request.validateUsing(accessLevelValdator)
    await UpdateaccessLevel.handle({
      id: params.id,
      organization,
      data
    })
    return response.redirect().back()
  }

  async order({request, response, organization}: HttpContext){
    const {ids} = await request.validateUsing(accessLevelOrderValidator)
    await UpdateAccessLevelOrder.handle({
      organization, ids
    })

    return response.redirect().back()
  }

  async destroy({params, request, response, organization}:HttpContext){
    const data = await request.validateUsing(accessLevelDestroyVaildator, withOrganizationMetaData(organization.id))
    await DestroyAccessLevel.handle({
      id: params.id,
      organization,
      data,
    })
    return response.redirect().back()
  }
}
