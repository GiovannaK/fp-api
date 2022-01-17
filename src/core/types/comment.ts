import { profileCodec } from '@/core/types/profile'
import * as t from 'io-ts'
import { NonEmptyString, withMessage } from 'io-ts-types'
import { dateCodec } from './scalar'

export const commentCodecRequired = t.type({
  id: t.number,
  createdAt: dateCodec,
  updatedAt: dateCodec,
  body: t.string,
})

const commentCodecOptional = t.partial({
  author: profileCodec,
})

export const commentCodec = t.intersection([
  commentCodecRequired,
  commentCodecOptional,
])

export type Comment = t.TypeOf<typeof commentCodec>
export type CommentOutput = t.OutputOf<typeof commentCodec>
export const createCommentCodec = t.type({
  body: withMessage(
    NonEmptyString,
    () => 'Body cannot be null',
  ),
})

export type CreateComment = t.TypeOf<typeof createCommentCodec>
