const OrganizationsController = () => import('#controllers/organizations_controller')
const DifficultiesController = () => import( '#controllers/difficulties_controller')
const accessLevelsController = ()  =>  import ( '#controllers/access_levels_controller')
const StatusController = () =>  import( '#controllers/statuses_controller')
const CoursesController = () => import ( '#controllers/courses_controller')
const ModulesController = () => import('#controllers/modules_controller')
const LessonsController = () => import ('#controllers/lessons_controller')
const ProfileController = () => import('#controllers/settings/profile_controller')

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.on('/').renderInertia('home').use(middleware.organization())
    router.get('/organizations/create', [OrganizationsController, 'create']).as('organization.create')
    router.post('/organizations', [OrganizationsController, 'store']).as('organization.store')
    router.get('/organizations/:id', [OrganizationsController, 'active']).as('organizations.active')
    router.put('/organizations/:id', [OrganizationsController, 'update']).as('organizations.update')
    router.delete('/organizations/:id', [OrganizationsController, 'destroy']).as('organizations.destroy')
  }).use(middleware.auth())

  router.group(() => {
    //Difficulties
    router.get('/difficulties', [DifficultiesController, 'index']).as('difficulties.index')
    router.post('/difficulties', [DifficultiesController, 'store']).as('difficulties.store')
    router.put('/difficulties/order', [DifficultiesController, 'order']).as('difficulties.order')
    router.put('/difficulties/:id', [DifficultiesController, 'update']).as('difficulties.update')
    router.delete('/difficulties/:id', [DifficultiesController, 'destroy']).as('difficulties.destroy')
  }).use([middleware.auth(), middleware.organization()]) 
  

  router.group(() => {
    //Statues
    router.get('/statuses', [StatusController, 'index']).as('statuses.index')
    router.post('/statuses', [StatusController, 'store']).as('statuses.store')
    router.put('/statuses/order', [StatusController, 'order']).as('statuses.order')
    router.put('/statuses/:id', [StatusController, 'update']).as('statuses.update')
    router.delete('/statuses/:id', [StatusController, 'destroy']).as('statuses.destroy')
  }).use([middleware.auth(), middleware.organization()]) 
  

  router.group(() => {
    //Access Levels
    router.get('/access-levels', [accessLevelsController, 'index']).as('access-levels.index')
    router.post('/access-levels', [accessLevelsController, 'store']).as('access-levels.store')
    router.put('/access-levels/order', [accessLevelsController, 'order']).as('access-levels.order')
    router.put('/access-levels/:id', [accessLevelsController, 'update']).as('access-levels.update')
    router.delete('/access-levels/:id', [accessLevelsController, 'destroy']).as('access-levels.destroy')

    //Courses
    router.get('/courses', [CoursesController, 'index']).as('courses.index')
    router.post('/courses', [CoursesController, 'store']).as('courses.store')
    router.get('/courses/:id', [CoursesController, 'show']).as('courses.show')
    router.put('/courses/:id', [CoursesController, 'update']).as('courses.update')
    router.patch('/courses/:id/tags', [CoursesController, 'tag']).as('courses.tags')
    router.delete('/courses/:id', [CoursesController, 'destroy']).as('courses.destroy')

    //Modules
    router.post('/courses/:courseId/modules', [ModulesController, 'store']).as('modules.store')
    router.put('/courses/:courseId/modules/:id', [ModulesController, 'update']).as('modules.update')
    router.patch('/courses/:courseId/modules/order', [ModulesController, 'order']).as('modules.order')
    router.patch('/courses/:courseId/modules/:id/tags', [ModulesController, 'tag']).as('modules.tags')
    router.delete('courses/:courseId/modules/:id', [ModulesController, 'destroy']).as('modules.delete')

    //Lessons
    router.post('/lessons', [LessonsController, 'store']).as('lessons.store')
    router.put('/lessons/:id', [LessonsController,'update']).as('lessons.update')
    router.patch('/lessons/:id/tags', [LessonsController, 'tag']).as('lessons.tags')
    router.delete('/lessons/:id', [LessonsController, 'destroy']).as('lessons.destroy')
    router.patch('/courses/:courseId/lessons/order', [LessonsController, 'order']).as('lessons.order')

    //Settings
    router.get('/settings/profile', [ProfileController, 'index']).as('settings.profile.index')
    router.put('/settings/profile', [ProfileController, 'update']).as('settings.profile.update')
    
  }).use([middleware.auth(), middleware.organization()]) 




  