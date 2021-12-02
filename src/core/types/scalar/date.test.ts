import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/TaskEither'
import { dateCodec } from './date'
import { mapAll, getErrorMessage } from '@/config/tests/fixtures'

it('should validate date properly', () => {
  const date = new Date().toISOString()
  pipe(
    date,
    dateCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe(date)),
  )
})

it('Should not accept a string different from date ISOString', async () => {
  return pipe(
    '10/10/2010',
    dateCodec.decode,
    TE.fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe('Invalid date. Please use date.toISOString().')),
  )()
})
