import vine from '@vinejs/vine'
import { existsInOrganization } from './helpers/organizations.js'

export const difficultyValdator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
    color: vine.string().maxLength(20).hexCode(),
  })
)

export const difficultyDestroyVaildator = vine.withMetaData<{ organizationId: number }>().compile(
  vine.object({
    replacementId: vine.number().exists(existsInOrganization('difficulties')),
  })
)

export const difficultyOrderValidator = vine.compile(
  vine.object({
    ids: vine.array(vine.number())
  })
)
