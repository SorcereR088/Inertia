import type { HttpContext } from '@adonisjs/core/http'
import GetCourses from '../actions/courses/get_courses.js'
import CourseDto from '#dtos/course'

export default class CoursesController {
  async index({ inertia, organization }: HttpContext) {
    const courses = await GetCourses.handle({ organization })

    return inertia.render('courses/index', {
      courses: CourseDto.fromArray(courses),
    })
  }
}
