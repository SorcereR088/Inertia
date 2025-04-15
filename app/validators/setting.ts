import vine from '@vinejs/vine'

export const updateProfileValidator = vine.compile(
    vine.object({
        fullname: vine.string().maxLength(255)
    })
)