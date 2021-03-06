import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type PositiveBrand = {
  readonly Positive: unique symbol
}

export const positiveCodec = withMessage(
  t.brand(
    t.number,
    (value): value is t.Branded<number, PositiveBrand> => value > 0,
    'Positive',
  ),
  () => 'Invalid positive number',
)

export type Positive = t.TypeOf<typeof positiveCodec>
