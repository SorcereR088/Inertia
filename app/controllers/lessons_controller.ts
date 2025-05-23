import { withOrganizationMetaData } from '#validators/helpers/organizations'
import { lessonOrderValidator, lessonPatchTagValidator, lessonValidator } from '#validators/lesson'
import type { HttpContext } from '@adonisjs/core/http'
import StoreLesson from '../actions/lessons/store_lesson.js'
import UpdateLesson from '../actions/lessons/update_lesson.js'
import DestroyLesson from '../actions/lessons/destroy_lesson.js'
import UpdateLessonsOrder from '../actions/lessons/update_lessons_order.js'

export default class LessonsController {

    async store ({request, response, organization}: HttpContext){
        const data = await request.validateUsing(lessonValidator, withOrganizationMetaData(organization.id)) 
        await  StoreLesson.handle({
            organization,
            data,
        })
        return response.redirect().back()
    }

    async update({params, request, organization, response}: HttpContext){
        const data = await request.validateUsing(lessonValidator, withOrganizationMetaData(organization.id))

        await UpdateLesson.handle({
            id: params.id,
            organization,
            data
        })

        return response.redirect().back()
    }

    async tag({params, request, response, organization}: HttpContext){
        const data = await request.validateUsing(lessonPatchTagValidator, withOrganizationMetaData(organization.id))
        await UpdateLesson.handle({
                id: params.id,
                organization,
                data
            })
    
            return response.redirect().back()
        }


    async order ({params, request, response, organization}: HttpContext){
        const data = await request.validateUsing(lessonOrderValidator)
        await UpdateLessonsOrder.handle({
            courseId: params.courseId,
            organization,
            data
        })

        return response.redirect().back()
    }
        
    async destroy ({params, response, organization}: HttpContext){
        await DestroyLesson.handle({
            id: params.id,
            organization
        })

        return response.redirect().back()
    }
}