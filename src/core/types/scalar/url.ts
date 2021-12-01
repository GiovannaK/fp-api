import { URL } from 'url'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

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

function isUrl (input: unknown) {
  try {
    const url = new URL(typeof input === 'string' ? input : '')
    return !!url
  } catch {
    return false
  }
}
