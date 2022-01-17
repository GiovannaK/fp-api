import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { CreateComment, createCommentCodec } from '@/core/types/comment'
import { pipe } from 'fp-ts/function'
import { failure } from 'io-ts/PathReporter'

export type OutsideCreateComment<A> = (data: CreateComment) => Promise<A>

export type AddCommentToAnArticle = <A>(o: OutsideCreateComment<A>) => (data: CreateComment) =>
  TE.TaskEither<Error, A>

export const addComentToAnArticle: AddCommentToAnArticle = (outsideCreateComment) => (data: CreateComment) => {
  return pipe(
    data,
    validateComment,
    TE.fromEither,
    TE.chain((data) => TE.tryCatch(
      () => outsideCreateComment(data),
      E.toError,
    )),
  )
}

type ValidateComment = (data: CreateComment) => E.Either<Error, CreateComment>
const validateComment: ValidateComment = (data) => {
  return pipe(
    createCommentCodec.decode(data),
    E.mapLeft(errors => new Error(failure(errors).join(':::'))),
  )
}
