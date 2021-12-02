import * as t from 'io-ts'
import { slugCodec, urlCodec } from './scalar'

export const profileCodec = t.type({
  username: slugCodec,
  image: urlCodec,
  bio: t.string,
  following: t.boolean,
})

export type Profile = t.TypeOf<typeof profileCodec>
