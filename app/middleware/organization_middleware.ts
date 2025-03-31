import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { inject } from '@adonisjs/core'
import GetActiveOrganization from '../actions/organization/http/get_active_organization.js'
import { activeCookieName } from '#config/organization'
import Organization from '#models/organization'
import db from '@adonisjs/lucid/services/db'
import OrganizationDto from '#dtos/organization'
import UserDto from '#dtos/user'

@inject()
export default class OrganizationMiddleware {
  constructor(protected getActiveOrganization: GetActiveOrganization) {}

  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.use('web').user!
    try {
      ctx.organizationId = ctx.request.cookie(activeCookieName)
      const organization = await this.getActiveOrganization.handle({})
      const roleId = await db
        .from('organization_users')
        .where('organization_id', organization.id)
        .where('user_id', user.id)
        .select('role_id as roleId')
        .firstOrFail()

      ctx.organization = organization
      ctx.roleId = roleId
    } catch (_) {
      ctx.session.flash('error', 'You must be a member of an organization to access this page')
      ctx.session.reflash()
      return ctx.response.redirect().toRoute('organization.create')
    }
    const organizations = await user.related('organizations').query().orderBy('name')
    ctx.inertia.share({
      organization: new OrganizationDto(ctx.organization),
      user: new UserDto(user),
      organizations: OrganizationDto.fromArray(organizations),
    })
    const output = await next()
    return output
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    organizationId?: number
    organization: Organization
    roleId: number
  }
}


