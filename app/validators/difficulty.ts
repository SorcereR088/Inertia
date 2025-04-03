import vine from '@vinejs/vine'

export const difficultyValdator = vine.compile(
  vine.object({
    name: vine.string().maxLength(50),
    color: vine.string().maxLength(20).hexCode(),
  })
)

export const difficultyDestroyVaildator = vine.withMetaData<{ organizationId: number }>().compile(
  vine.object({
    replacementId: vine.number().exists(async (db, value, field) => {
      const result = await db
        .from('difficulties')
        .select('id')
        .where('id', value)
        .where('organization_id', field.meta.organizationId)
        .first()

        return !!result
    }),
  })
)
