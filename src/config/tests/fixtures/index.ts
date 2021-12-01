import * as t from 'io-ts'
import * as TE from 'fp-ts/TaskEither'
import { emailCodec } from '@/core/types/scalar'
import { pipe } from 'fp-ts/function'

export function unsafeEmail (value: string): t.TypeOf<typeof emailCodec> {
  return value as any
}

type Callback = (a: unknown) => unknown

type MapAll = (fn: Callback) => (data: TE.TaskEither<unknown, unknown>) =>
  TE.TaskEither<unknown, unknown>

export const mapAll: MapAll = (fn) => (data) => {
  return pipe(
    data,
    TE.map(fn),
    TE.mapLeft(fn),
  )
}
