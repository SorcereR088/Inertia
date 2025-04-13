import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Module from './module.js'
import AccessLevel from './access_level.js'
import Status from './status.js'
import { WithOrganization } from './mixins/with_organization.js'
import { compose } from '@adonisjs/core/helpers'

export default class Lesson extends compose(BaseModel, WithOrganization) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare accessLevelId: number

  @column()
  declare moduleId: number

  @column()
  declare statusId: number

  @column()
  declare order: number

  @column()
  declare name: string

  @column()
  declare notes: string | null

  @column.dateTime({ columnName: 'publishAt' })
  declare publishAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => AccessLevel)
  declare accessLevel: BelongsTo<typeof AccessLevel>

  @belongsTo(() => Status)
  declare status: BelongsTo<typeof Status>

  @belongsTo(() => Module)
  declare modules: BelongsTo<typeof Module>
}
