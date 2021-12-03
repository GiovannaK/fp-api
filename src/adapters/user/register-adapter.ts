import { CreateUser } from '@/core/types/user'
import { OutsideRegisterUser, registerUser as registerCore, RegisterUser } from '@/core/use-cases/user/register'

export type OutsideRegisterType = OutsideRegisterUser<{success: boolean, data: CreateUser}>

export const register: RegisterUser = (outsideRegisterUser) => (data) =>
  registerCore(outsideRegisterUser)(data)
