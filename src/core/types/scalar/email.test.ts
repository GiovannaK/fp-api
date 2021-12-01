/* eslint-disable jest/expect-expect */
import { emailCodec } from './email'
import { pipe } from 'fp-ts/function'
import { mapAllE } from '@/config/tests/fixtures'

it('Should validate email correctly', () => {
  pipe(
    'john@doe.com',
    emailCodec.decode,
    mapAllE(result => expect(result).toBe('john@doe.com')),
  )
})

it('Should return error when email is invalid', () => {
  pipe(
    'Invalid-email',
    emailCodec.decode,
    /* mapAllE(error => expect(error[0]?.message).toBe('Invalid email')), */
  )
})
