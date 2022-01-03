import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { CreateComment } from '@/core/types/comment'
import { pipe } from 'fp-ts/function'

type OutsideCreateComment<A> = (data: CreateComment) => Promise<A>

type AddCommentToAnArticle = <A>(o: OutsideCreateComment<A>) => (data: CreateComment) =>
  TE.TaskEither<Error, A>

export const addComentToAnArticle: AddCommentToAnArticle = (outsideCreateComment) => (data) => {
  return pipe(
    TE.tryCatch(
      () => outsideCreateComment(data),
      E.toError,
    ),
  )
}
