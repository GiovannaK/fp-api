import express, { Request, Response } from 'express'
import { register, OutsideRegisterType } from '@/adapters/user/register-adapter'
import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/TaskEither'
const app = express()
const PORT = 3333

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const outsideRegister: OutsideRegisterType = async (data) => {
  return {
    success: true,
    data,
  }
}

app.post('/api/users', (req: Request, res: Response) => {
  return pipe(
    req.body.user,
    register(outsideRegister),
    TE.map(result => res.json(result)),
    TE.mapLeft(error => res.status(400).json({ error: error.message })),
  )()
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
