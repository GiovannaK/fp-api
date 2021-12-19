import { CreateArticle } from '@/core/types/article'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { validateArticle } from './validate-article'

export type OutsideRegister<A> = (data: CreateArticle) => Promise<A>

type RegisterArticle = <A>(outsideRegister: OutsideRegister<A>) => (data: CreateArticle) => TE.TaskEither<Error, A>

export const registerArticle: RegisterArticle = (outsideRegister) => (data) => {
  return pipe(
    data,
    validateArticle,
    TE.fromEither,
    TE.chain((data) => TE.tryCatch(
      () => outsideRegister(data),
      E.toError,
    )),
  )
}
