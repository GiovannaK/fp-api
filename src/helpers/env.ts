/* eslint-disable no-unreachable */
import * as t from 'io-ts'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { withMessage } from 'io-ts-types'

export const env = (value: string) => {
  const envCodec = withMessage(t.string, () => `You must set the env var ${value}`)
  return pipe(
    envCodec.decode(value),
    E.fold(
      (error) => {
        throw error
      },
      (value) => process.env[value],
    ),
  )

  /* if (typeof process.env[value] !== 'string') {
    throw new Error(`You must set an env var ${value}`)
  }
  return value */
}
