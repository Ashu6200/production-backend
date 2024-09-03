import { Router } from 'express'
import { self } from '../controllers/apiController'

const apiRouter = Router()

apiRouter.get('/self', self)

export default apiRouter
