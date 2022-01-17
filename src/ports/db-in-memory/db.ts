import { OutsideRegisterType } from '@/adapters/user/register-adapter'
import { OutsideRegisterType as OutsideRegisterArticleType } from '@/adapters/use-cases/article/register-article-adapter'
import slugify from 'slugify'
import { OutsideCreateCommentType } from '@/adapters/use-cases/article/add-comment-to-an-article-adapter'

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

export const outsideCreateComment: OutsideCreateCommentType = async (data) => {
  return {
    comment: {
      id: 1,
      createdAt: '2016-02-18T03:22:56.637Z',
      updatedAt: '2016-02-18T03:22:56.637Z',
      body: 'sjdhjd',
    },
  }
}
