import { URL } from 'url'
import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import { withMessage } from 'io-ts-types'
import { pipe, constTrue, constFalse } from 'fp-ts/lib/function'

type UrlBrand = {
  readonly Url: unique symbol
}

export const urlCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, UrlBrand> => isUrl(value),
    'Url',
  ),
  () => 'Invalid URL',
)

export type Url = t.TypeOf<typeof urlCodec>

function isUrl (input: unknown) {
  return pipe(
    E.tryCatch(
      () => new URL(typeof input === 'string' ? input : ''),
      E.toError,
    ),
    E.fold( // abrir o either
      constFalse,
      constTrue,
    ),
  )

  /* try {
    const url = new URL(typeof input === 'string' ? input : '')
    return !!url
  } catch {
    return false
  } */
}
