import { OutsideRegisterType } from '@/adapters/user/register-adapter'
import { OutsideRegisterType as OutsideRegisterArticleType } from '@/adapters/use-cases/article/register-article-adapter'
import { outsideRegister, outsideRegisterArticle } from '@/ports/db-in-memory/db'
import { OutsideCreateCommentType } from '@/adapters/use-cases/article/add-comment-to-an-article-adapter'

export const userRegister: OutsideRegisterType = (data) => {
  return outsideRegister(data)
}

export const articleRegister: OutsideRegisterArticleType = (data) => {
  return outsideRegisterArticle(data)
}

export const addComentToAnArticleInDB: OutsideCreateCommentType = (data) => {
  return outsideCreateComment(data)
}
