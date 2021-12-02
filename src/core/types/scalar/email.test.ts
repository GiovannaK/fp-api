/* eslint-disable jest/expect-expect */
import { emailCodec } from './email'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { mapAll } from '@/config/tests/fixtures'

it('Should validate email correctly', () => {
  pipe(
    'john@doe.com',
    emailCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe('john@doe.com')),
  )
})

it('Should return error when email is invalid', () => {
  pipe(
    'Invalid-email',
    emailCodec.decode,
    TE.fromEither,
    mapAll(error => {
      const errorMessage = Array.isArray(error) ? error[0]?.message : ''
      expect(errorMessage).toBe('Invalid email')
    }),
  )
})
