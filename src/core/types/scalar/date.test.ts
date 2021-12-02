import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/TaskEither'
import { dateCodec } from './date'
import { mapAll } from '@/config/tests/fixtures'

it('should validate date properly', () => {
  const date = new Date().toISOString()
  pipe(
    date,
    dateCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe(date)),
  )
})
