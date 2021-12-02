import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/TaskEither'
import { positiveCodec } from './positive'
import { mapAll, getErrorMessage } from '@/config/tests/fixtures'

it('should validate positive properly', () => {
  pipe(
    1,
    positiveCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe(1)),
  )
})

it('should accept zero', () => {
  pipe(
    0,
    positiveCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe(0)),
  )
})

it('Should not accept a negative number', async () => {
  return pipe(
    -1,
    positiveCodec.decode,
    TE.fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe('Invalid positive number')),
  )()
})
