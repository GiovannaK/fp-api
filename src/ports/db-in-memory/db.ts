import { OutsideRegisterType } from '@/adapters/user/register-adapter'
import { OutsideRegisterType as OutsideRegisterArticleType } from '@/adapters/use-cases/article/register-article-adapter'
import slugify from 'slugify'

export const outsideRegister: OutsideRegisterType = async (data) => {
  return {
    user: {
      email: data.email,
      token: '',
      username: data.username,
      bio: '',
      image: undefined,
    },
  }
}

export const outsideRegisterArticle: OutsideRegisterArticleType = async (data) => {
  const date = new Date().toISOString()
  return {
    article: {
      slug: slugify(data.title, { lower: true }),
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tagList ?? [],
      createdAt: date,
      updatedAt: date,
      favorited: false,
      favoritesCount: 0,
    },
  }
}
