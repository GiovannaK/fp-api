import { profileCodec } from '@/core/types/profile'
import { tagCodec } from '@/core/types/tag'
import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'
import { slugCodec, dateCodec, positiveCodec } from './scalar'

export const articleCodecRequired = t.type({
  slug: slugCodec,
  title: t.string,
  description: t.string,
  body: t.string,
  tagList: t.array(tagCodec),
  createdAt: dateCodec,
  updateAt: dateCodec,
  favorited: t.boolean,
  favoritesCount: positiveCodec,
})

const articleCodecOptional = t.partial({
  author: profileCodec,
})

export const articleCodec = t.intersection([
  articleCodecRequired,
  articleCodecOptional,
])

export type ArticleOutput = t.OutputOf<typeof articleCodec>

export type Article = t.TypeOf<typeof articleCodec>

export const articlesCodec = t.type({
  articles: t.array(articleCodec),
  articlesCodec: t.number,
})

export type Articles = t.TypeOf<typeof articlesCodec>

export const createArticleRequired = t.type({
  title: withMessage(t.string, () => 'Invalid title'),
  description: withMessage(t.string, () => 'Invalid Description'),
  body: withMessage(t.string, () => 'Invalid Body'),
})

const createArticleOptional = t.partial({
  tagList: t.array(tagCodec),
})

export const createArticleCodec = t.intersection([
  createArticleRequired,
  createArticleOptional,
])

export type CreateArticle = t.TypeOf<typeof createArticleCodec>
