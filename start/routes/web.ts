const OrganizationsController = () => import('#controllers/organizations_controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home')

router.group(() => {
    router.get('/organizations/create', [OrganizationsController, 'create']).as('organization.create')
    router.post('/organizations', [OrganizationsController, 'store']).as('organization.store')
  }).use(middleware.auth())
