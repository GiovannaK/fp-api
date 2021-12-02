import { profileCodec } from '@/core/types/profile'
import { tagCodec } from '@/core/types/tag'
import * as t from 'io-ts'
import { slugCodec, dateCodec, positiveCodec } from './scalar'

export const articleCodec = t.type({
  slug: slugCodec,
  title: t.string,
  description: t.string,
  body: t.string,
  tagList: t.array(tagCodec),
  createdAt: dateCodec,
  updateAt: dateCodec,
  favorited: t.boolean,
  favoritesCount: positiveCodec,
  author: profileCodec,
})

export type Article = t.TypeOf<typeof articleCodec>

export const articlesCodec = t.type({
  articles: t.array(articleCodec),
  articlesCodec: t.number,
})

export type Articles = t.TypeOf<typeof articlesCodec>
