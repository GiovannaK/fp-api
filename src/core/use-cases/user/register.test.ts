import { pipe } from 'fp-ts/function'
import { registerUser, OutsideRegisterUser } from './register'
import { mapAll, unsafe } from '@/config/tests/fixtures'
import { CreateUser } from '@/core/types/user'

const registerOk: OutsideRegisterUser<string> = async (data) => {
  return `Usuário ${data.username} cadastrado com sucesso!`
}

const registerFail: OutsideRegisterUser<never> = async () => {
  throw new Error('External error!')
}

const data: CreateUser = {
  username: unsafe('john'),
  email: unsafe('john@doe.com'),
  password: unsafe('jhon123!'),
}

const dataWithWrongUsername: CreateUser = {
  username: unsafe('a'),
  email: unsafe('john@doe.com'),
  password: unsafe('jhon123!'),
}

const dataWithWrongEmailAndPassword: CreateUser = {
  username: unsafe('john-doe'),
  email: unsafe('john'),
  password: unsafe('j'),
}

it('Should register a user properly', async () => {
  return pipe(
    data,
    registerUser(registerOk),
    mapAll(result => expect(result).toBe(`Usuário ${data.username} cadastrado com sucesso!`)),
  )()
})

it('Should not accept a register from a user with invalid username', async () => {
  return pipe(
    dataWithWrongUsername,
    registerUser(registerOk),
    mapAll(error => expect(error).toEqual(new Error('Invalid slug. Please use alphanumeric characters, dash and/or numbers.'))),
  )()
})

it('Should not accept a register from a user with invalid email and/or password', async () => {
  return pipe(
    dataWithWrongEmailAndPassword,
    registerUser(registerOk),
    mapAll(error => expect(error).toEqual(new Error('Password should be at least 8 characters long.:::Invalid email'))),
  )()
})

it('Should return a Left if register function throws an error', async () => {
  return pipe(
    data,
    registerUser(registerFail),
    mapAll(error => expect(error).toEqual(new Error('External error!'))),
  )()
})
