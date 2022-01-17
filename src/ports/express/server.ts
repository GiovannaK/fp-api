import express, { Request, Response } from 'express'
import { register } from '@/adapters/user/register-adapter'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/TaskEither'
import { userRegister, articleRegister, addComentToAnArticleInDB } from '@/adapters/ports/db/db'
import { registerArticle } from '@/core/use-cases/article/register-article'
import { addCommentToAnArticle } from '@/adapters/use-cases/article/add-comment-to-an-article-adapter'
import * as jose from 'jose'

async function createJwt () {
  const { privateKey } = await jose.generateKeyPair('ES256')
  const jwt = await new jose.SignJWT({ id: '123' })
    .setProtectedHeader({ alg: 'ES256' })
    .setExpirationTime('10m')
    .sign(privateKey)
}

createJwt()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app
  .disable('x-powered-by')
  .disable('etag')

app.post('/api/users', async (req: Request, res: Response) => {
  return pipe(
    req.body.user,
    register(userRegister),
    TE.map(result => res.json(result)),
    TE.mapLeft(error => res.status(422).json(getError(error.message))),
  )()
})

app.post('/api/articles', async (req: Request, res: Response) => {
  return pipe(
    req.body.article,
    registerArticle(articleRegister),
    TE.map(result => res.json(result)),
    TE.mapLeft(error => res.status(422).json(getError(error.message))),
  )()
})

app.post('/api/articles/:slug/comments', async (req: Request, res: Response) => {
  return pipe(
    req.body.comment,
    addCommentToAnArticle(addComentToAnArticleInDB),
    TE.map(result => res.json(result)),
    TE.mapLeft(error => res.status(422).json(getError(error.message))),
  )()
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

const getError = (errors: string) => {
  return {
    errors: {
      body: errors.split(':::'),
    },
  }
}
