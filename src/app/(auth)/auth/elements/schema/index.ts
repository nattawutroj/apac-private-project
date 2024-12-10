import { z } from 'zod'
import { Messages } from '@/constant/messages'

export const LoginSchema = z.object({
  username: z.string().min(1, Messages.validation.usernameReq),
  password: z.string().min(1, Messages.validation.passwordReq),
})

export type LoginTypes = z.infer<typeof LoginSchema>

export const LoginDefaultValues: LoginTypes = { username: '', password: '' }
