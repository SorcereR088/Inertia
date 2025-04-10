import type { HttpContext } from '@adonisjs/core/http'
import GetCourses from '../actions/courses/get_courses.js'
import CourseDto from '#dtos/course'
import { coursePatchTagValidator, courseValidator } from '#validators/course'
import { withOrganizationMetaData } from '#validators/helpers/organizations'
import StoreCourses from '../actions/courses/store_courses.js'
import UpdateCourse from '../actions/courses/update_course.js'
import DestroyCourse from '../actions/courses/destroy_course.js'
import GetCourse from '../actions/courses/get_course.js'
import ModuleDto from '#dtos/module'

export default class CoursesController {
  async index({ inertia, organization }: HttpContext) {
    const courses = await GetCourses.handle({ organization })

    return inertia.render('courses/index', {
      courses: CourseDto.fromArray(courses),
    })
  }

  async store ({request, response, organization}: HttpContext){
    const data = await request.validateUsing(courseValidator, withOrganizationMetaData(organization.id))
    const course = await StoreCourses.handle({
      data,
      organization
    })
    return response.redirect().toRoute('courses.show', {id: course.id})
  }

  async tag({params, request, response, organization}: HttpContext){
    const data = await request.validateUsing(coursePatchTagValidator, withOrganizationMetaData(organization.id))

    await UpdateCourse.handle({
       id: params.id,
       organization,
       data
    })

    return response. redirect().back()
  }

  async show({ params, inertia, organization }: HttpContext) {
    const { course, modules } = await GetCourse.handle({
      id: params.id,
      organization,
    })

    return inertia.render('courses/show', {
      course: new CourseDto(course),
      modules: ModuleDto.fromArray(modules),
    })
  }

  async update ({params, request, response, organization}: HttpContext){
    const data = await request.validateUsing(courseValidator, withOrganizationMetaData(organization.id))
    await UpdateCourse.handle({
      id: params.id,
      organization,
      data,
    })
    return response.redirect().back()
  }

  async destroy({params, response, organization}: HttpContext){
    await DestroyCourse.handle({
      id: params.id,
      organization
    })

    return response.redirect().toRoute('courses.index')
  }
}
