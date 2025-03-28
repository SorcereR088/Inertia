import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
    vine.object({
        fullname: vine.string().maxLength(255),
        email: vine.string().email().normalizeEmail().unique(async (db, value) => {
            const exists = await db.from('users').where('email', value).select('id').first()
            return !exists
        }),
        password: vine.string().minLength(8)
    })
)
export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().email().normalizeEmail(),
        password: vine.string(),
        remember:vine.boolean().optional()
    })
)

export const passwordResetSendValidator = vine.compile(
    vine.object({
        email: vine.string().email().normalizeEmail()
    })
)

export const passwordResetValidator = vine.compile(
    vine.object({
        value: vine.string(),
        password: vine.string().minLength(8)
    })
)