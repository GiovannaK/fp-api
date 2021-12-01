import { emailCodec } from './email'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

it('Should validate email correctly', () => {
  pipe(
    'john@doe.com',
    emailCodec.decode,
    E.map(result => expect(result).toBe('john@doe.com')),
    E.mapLeft(result => expect(result).toBe('john@doe.com')),
  )
})

it('Should return error when email is invalid', () => {
  pipe(
    'Invalid-email',
    emailCodec.decode,
    E.mapLeft(error => expect(error[0]?.message).toBe('Invalid email')),
  )
})
