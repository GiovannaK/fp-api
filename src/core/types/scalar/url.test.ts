/* eslint-disable jest/expect-expect */
import { urlCodec } from './url'
import { pipe } from 'fp-ts/function'
import { mapAllE } from '@/config/tests/fixtures'

it('Should validate url correctly', () => {
  pipe(
    'https://url.com',
    urlCodec.decode,
    mapAllE(result => expect(result).toBe('https://url.com')),
  )
})

it('Should return error when url is invalid', () => {
  pipe(
    'Invalid-url',
    urlCodec.decode,
    mapAllE(error => {
      const errorMessage = Array.isArray(error) ? error[0]?.message : ''
      expect(errorMessage).toBe('Invalid URL')
    }),
  )
})
