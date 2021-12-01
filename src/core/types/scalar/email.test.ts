import { Email } from './email'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

it('Should validate email correctly', () => {
  pipe(
    'john@doe.com',
    Email.decode,
    E.map(result => expect(result).toBe('john@doe.com')),
  )
})

it('Should return error when email is invalid', () => {
  pipe(
    'Invalid-email',
    Email.decode,
    E.mapLeft(error => expect(error[0]?.message).toBe('Invalid email')),
  )
})
