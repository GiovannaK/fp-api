import { profileCodec } from '@/core/types/profile'
import { tagCodec } from '@/core/types/tag'
import * as t from 'io-ts'

export const articleCodec = t.type({
  slug: t.string,
  title: t.string,
  description: t.string,
  body: t.string,
  tagList: t.array(tagCodec),
  createdAt: t.string,
  updateAt: t.string,
  favorited: t.boolean,
  favoritesCount: t.boolean,
  author: profileCodec,
})

export type Article = t.TypeOf<typeof articleCodec>

export const articlesCodec = t.type({
  articles: t.array(articleCodec),
  articlesCodec: t.number,
})

export type Articles = t.TypeOf<typeof articlesCodec>
