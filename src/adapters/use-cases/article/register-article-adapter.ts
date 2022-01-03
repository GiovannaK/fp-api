import { Article } from '@/core/types/article'
import { registerArticle as registerArticleCore, OutsideRegister, RegisterArticle } from '@/core/use-cases/article/register-article'

export type OutsideRegisterType = OutsideRegister<{
  user: Article
}>

export const registerArticle: RegisterArticle = (outsideRegisterUser) => (data) =>
  registerArticleCore(outsideRegisterUser)(data)
