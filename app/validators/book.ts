import vine from '@vinejs/vine'



export const BookStoreValidation = vine.compile(
  vine.object({
    title: vine.string(),
    author: vine.string(),
    resume: vine.string(),
    cover: vine.file({
      extnames: ['jpg', 'png', 'jpeg'],
      size: '5mb'
    }),
    categories : vine.array(vine.number()).minLength(1)
  })
)

export const BookUpdateValidation = vine.compile(
  vine.object({
    title: vine.string(),
    author: vine.string(),
    resume: vine.string(),
    cover: vine.file({
      extnames: ['jpg', 'png', 'jpeg'],
      size: '5mb'
    }).optional(),
    categories : vine.array(vine.number()).minLength(1)
  })
)
