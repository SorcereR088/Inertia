const OrganizationsController = () => import('#controllers/organizations_controller')
const DifficultiesController = () => import( '#controllers/difficulties_controller')
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
    router.get('/difficulties', [DifficultiesController, 'index']).as('difficulties.index')
    router.post('/difficulties', [DifficultiesController, 'store']).as('difficulties.store')
    router.put('/difficulties/order', [DifficultiesController, 'order']).as('difficulties.order')
    router.put('/difficulties/:id', [DifficultiesController, 'update']).as('difficulties.update')
    router.delete('/difficulties/:id', [DifficultiesController, 'destroy']).as('difficulties.destroy')
  }).use([middleware.auth(), middleware.organization()]) 
  