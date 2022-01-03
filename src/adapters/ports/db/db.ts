import { OutsideRegisterType } from '@/adapters/user/register-adapter'
import { OutsideRegisterType as OutsideRegisterArticleType } from '@/adapters/use-cases/article/register-article-adapter'
import { outsideRegister, outsideRegisterArticle } from '@/ports/db-in-memory/db'

export const userRegister: OutsideRegisterType = (data) => {
  return outsideRegister(data)
}

export const articleRegister: OutsideRegisterArticleType = (data) => {
  return outsideRegisterArticle(data)
}
