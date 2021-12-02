import { emailCodec, slugCodec, urlCodec, passwordCodec } from '@/core/types/scalar'
import * as t from 'io-ts'

export const userCodec = t.type({
  email: emailCodec,
  token: t.string,
  username: slugCodec,
  bio: t.string,
  image: urlCodec,
})

export type User = t.TypeOf<typeof userCodec>

export const createUserCodec = t.type({
  username: slugCodec,
  password: passwordCodec,
  email: emailCodec,
})

export type CreateUser = t.TypeOf<typeof createUserCodec>
