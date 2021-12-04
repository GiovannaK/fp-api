import { User } from '@/core/types/user'
import { OutsideRegisterUser, registerUser as registerCore, RegisterUser } from '@/core/use-cases/user/register'

export type OutsideRegisterType = OutsideRegisterUser<User>

export const register: RegisterUser = (outsideRegisterUser) => (data) =>
  registerCore(outsideRegisterUser)(data)
