import { slugCodec } from './slug'
import { pipe } from 'fp-ts/function'
import { mapAllE } from '@/config/tests/fixtures'

it('should validate slug properly', () => {
  pipe(
    'slug',
    slugCodec.decode,
    mapAllE(result => expect(result).toBe('slug')),
  )
})

it('should not accept numbers at the beginning of the slug', () => {
  pipe(
    '3slug',
    slugCodec.decode,
    mapAllE(errors => {
      const errorMessage = Array.isArray(errors) ? errors[0].message : ''
      expect(errorMessage).toBe('Invalid slug. Please use alphanumeric characters, dash and/or numbers.')
    }),
  )
})

it('should not accept dashes at the end of the slug', () => {
  pipe(
    'slug-',
    slugCodec.decode,
    mapAllE(errors => {
      const errorMessage = Array.isArray(errors) ? errors[0].message : ''
      expect(errorMessage).toBe('Invalid slug. Please use alphanumeric characters, dash and/or numbers.')
    }),
  )
})
