import { emailCodec, slugCodec, urlCodec, passwordCodec } from '@/core/types/scalar'
import * as t from 'io-ts'

const userCodecRequired = t.type({
  email: emailCodec,
  username: slugCodec,
})

const userCodecPartial = t.partial({
  token: t.string,
  bio: t.string,
  image: urlCodec,
})

export const userCodec = t.intersection([userCodecRequired, userCodecPartial])

/* export const userCodec = t.type({
  email: emailCodec,
  username: slugCodec,
  token: t.string,
  bio: t.string,
  image: urlCodec,
}) */

export type User = t.TypeOf<typeof userCodec>

export const createUserCodec = t.type({
  username: slugCodec,
  password: passwordCodec,
  email: emailCodec,
})

export type CreateUser = t.TypeOf<typeof createUserCodec>
