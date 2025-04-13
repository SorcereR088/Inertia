import { withOrganizationMetaData } from '#validators/helpers/organizations'
import { lessonValidator } from '#validators/lesson'
import type { HttpContext } from '@adonisjs/core/http'
import StoreLesson from '../actions/lessons/store_lesson.js'

export default class LessonsController {

    async store ({request, response, organization}: HttpContext){
        const data = await request.validateUsing(lessonValidator, withOrganizationMetaData(organization.id)) 

        await  StoreLesson.handle({
            organization,
            data,
        })

        return response.redirect().back()
    }
}