import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import 'server-only'
import { Merge } from 'type-fest'
import { Enums } from '@/utils/supabase/database.types'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export type PayloadType =
  | Merge<JWTPayload, { role?: Enums<'role'> }>
  | undefined

export async function encrypt<T>(payload: T) {
  return new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch {
    return undefined
  }
}
