import { CommentOutput, CreateComment } from '@/core/types/comment'
import { addComentToAnArticle, AddCommentToAnArticle as AddComentToAnArticleCore, OutsideCreateComment } from '@/core/use-cases/article/create-comment'

export type OutsideCreateCommentType = OutsideCreateComment<[
  comment: CommentOutput
]>

export const addCommentToAnArticle: AddComentToAnArticleCore = (outsideCreateComment) => (data: CreateComment) => {
  return addComentToAnArticle(outsideCreateComment)(data)
}
