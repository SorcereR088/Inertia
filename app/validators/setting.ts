import vine from '@vinejs/vine'
import { newEmailRule } from './auth.js'

export const updateProfileValidator = vine.compile(
    vine.object({
        fullname: vine.string().maxLength(255)
    })
)

export const updateEmailValidator = vine.compile(
    vine.object({
        email: newEmailRule.clone(),
        password: vine.string()
    })
)