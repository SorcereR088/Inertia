import Organization from '#models/organization'

type Params = {
  organization: Organization
}

export default class GetCourses {
  static async handle({ organization }: Params) {
    return organization.related('courses').query()
    .preload('status')
    .preload('difficulty')
    .preload('lessons')
    .preload('accessLevel')
    .preload('modules')
    .orderBy('order')
  }
}
