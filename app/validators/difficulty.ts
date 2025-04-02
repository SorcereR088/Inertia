import vine from '@vinejs/vine'

export const difficultyValdator = vine.compile(
    vine.object({
        name: vine.string().maxLength(50),
        color: vine.string().maxLength(20).hexCode()
    })
)