import { mapAll } from '@/config/tests/fixtures'
import { CreateArticle } from '@/core/types/article'
import { pipe } from 'fp-ts/function'
import { OutsideRegister, registerArticle } from './register-article'

const data: CreateArticle = {
  title: 'Article title',
  description: 'Article description',
  body: 'Article body',
}

const registerOk: OutsideRegister<string> = async (data: CreateArticle) => {
  return `Article ${data.title} successfully created`
}

const registerFail: OutsideRegister<never> = async () => {
  throw new Error('External Error')
}

it('should create an article', async () => {
  return pipe(
    data,
    registerArticle(registerOk),
    mapAll(result => expect(result).toBe(`Article ${data.title} successfully created`)),
  )()
})

it('should not register the article if outsideRegister dispatch error', async () => {
  return pipe(
    data,
    registerArticle(registerFail),
    mapAll(result => expect(result).toEqual(new Error('External Error'))),
  )()
})
