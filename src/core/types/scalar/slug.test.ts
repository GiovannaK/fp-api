import { slugCodec } from './slug'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'
import { mapAll, getErrorMessage } from '@/config/tests/fixtures'

it('Should validate slug properly', async () => {
  return pipe(
    'valid-slug',
    slugCodec.decode,
    TE.fromEither,
    mapAll(result => expect(result).toBe('valid-slug')),
  )()
})

it('should not accept numbers at the beginning of the slug', () => {
  pipe(
    '3slug',
    slugCodec.decode,
    TE.fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe('Invalid slug. Please use alphanumeric characters, dash and/or numbers.')),
  )
})

it('Should not accept dashes at the end of the slug', async () => {
  return pipe(
    'invalid-slug-',
    slugCodec.decode,
    TE.fromEither,
    mapAll(errors => expect(getErrorMessage(errors)).toBe('Invalid slug. Please use alphanumeric characters, dash and/or numbers.')),
  )()
})
