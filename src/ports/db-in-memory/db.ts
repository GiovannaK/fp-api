import { OutsideRegisterType } from '@/adapters/user/register-adapter'

export const outsideRegister: OutsideRegisterType = async (data) => {
  return {
    user: {
      username: data.username,
      token: '',
      email: data.email,
      bio: '',
      image: null,
    },
  }
}
