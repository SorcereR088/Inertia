import DifficultyDto from '#dtos/difficulty'
import { difficultyDestroyVaildator, difficultyOrderValidator, difficultyValdator } from '#validators/difficulty'
import type { HttpContext } from '@adonisjs/core/http'
import StoreDifficulty from '../actions/difficulties/store_difficulty.js'
import UpdateDifficulty from '../actions/difficulties/update_difficulty.js'
import DestroyDifficulty from '../actions/difficulties/destroy_difficulty.js'
import { withOrganizationMetaData } from '#validators/helpers/organizations'
import UpdateDifficultyOrder from '../actions/difficulties/update_difficulty_order.js'

export default class DifficultiesController {
  async index({ inertia, organization }: HttpContext) {
    const difficulties = await organization.getDifficulties().withCount('courses')
    return inertia.render('difficulties/index', {
      difficulties: DifficultyDto.fromArray(difficulties),
    })
  }

  async store({ request, response, organization }: HttpContext) {
    const data = await request.validateUsing(difficultyValdator)
    await StoreDifficulty.handle({ data, organization })
    return response.redirect().back()
  }

  async update({params, request, response, organization}:HttpContext){
    const data = await request.validateUsing(difficultyValdator)
    await UpdateDifficulty.handle({
      id: params.id,
      organization,
      data
    })
    return response.redirect().back()
  }

  async order({request, response, organization}: HttpContext){
    const {ids} = await request.validateUsing(difficultyOrderValidator)
    await UpdateDifficultyOrder.handle({
      organization, ids
    })

    return response.redirect().back()
  }

  async destroy({params, request, response, organization}:HttpContext){
    const data = await request.validateUsing(difficultyDestroyVaildator, withOrganizationMetaData(organization.id))
    await DestroyDifficulty.handle({
      id: params.id,
      organization,
      data,
    })
    return response.redirect().back()
  }
}
