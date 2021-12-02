/* eslint-disable jest/expect-expect */
import { CreateUser } from '@/core/types/user'
import { register, OutsideRegister } from './register'
import { pipe } from 'fp-ts/lib/pipeable'
import { unsafe, mapAll } from '@/config/tests/fixtures'

const registerOk: OutsideRegister<string> = async (data) => {
  return `User is registered ${data.email}`
}

const data: CreateUser = {
  username: 'Giovanna',
  email: unsafe('giovanna@mail.com'),
  password: '384738393',
}

it('should register a user succesfully', async () => {
  return pipe(
    data,
    register(registerOk),
    mapAll(result => expect(result).toBe(`User is registered ${data.email}`)),
  )()
})
