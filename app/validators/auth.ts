import vine from '@vinejs/vine'


export const registerValidation = vine.compile(
  vine.object({
    firstname: vine.string()
      .trim()
      .minLength(3)
      .maxLength(255),
    lastname: vine.string()
      .trim()
      .minLength(3)
      .maxLength(255),
    email: vine.string().trim().email().unique(async (db,value)=>{
      const user = await db.from('users').where('email',value).first()
      return !user
    }),
    password: vine.string()
    .minLength(4)
    .maxLength(35),


  })
)

export const loginValidation = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string()
    .minLength(4)
    .maxLength(35),
  })
)
