import DestroyStatus from '../actions/statuses/destroy_status.js'
import UpdateStatus from '../actions/statuses/update_status.js'
import UpdateStatusOrder from '../actions/statuses/update_status_order.js'
import StoreStatus from '../actions/statuses/store_status.js'
import StatusDto from '#dtos/access_level'
import { statusDestroyVaildator, statusOrderValidator, statusValdator } from '#validators/status'
import type { HttpContext } from '@adonisjs/core/http'
import { withOrganizationMetaData } from '#validators/helpers/organizations'

export default class StatusesController {
  async index({ inertia, organization }: HttpContext) {
    const statuses = await organization
      .getStatuses()
      .withCount('courses')
      .withCount('modules')
      .withCount('lessons')
    return inertia.render('statuses/index', {
      statuses: StatusDto.fromArray(statuses),
    })
  }

  async store({ request, response, organization }: HttpContext) {
    const data = await request.validateUsing(statusValdator)
    await StoreStatus.handle({ organization, data })
    return response.redirect().back()
  }

  async update({ request, response, organization, params }: HttpContext) {
    const data = await request.validateUsing(statusValdator)
    await UpdateStatus.handle({ id: params.id, organization, data })
    return response.redirect().back()
  }

  async order({ request, response, organization }: HttpContext) {
    const { ids } = await request.validateUsing(statusOrderValidator)
    await UpdateStatusOrder.handle({
      organization,
      ids,
    })
    return response.redirect().back()
  }

  async destroy({ params, request, response, organization }: HttpContext) {
    const data = await request.validateUsing(
      statusDestroyVaildator,
      withOrganizationMetaData(organization.id)
    )
    await DestroyStatus.handle({
      id: params.id,
      organization,
      data,
    })
    return response.redirect().back()
  }
}
