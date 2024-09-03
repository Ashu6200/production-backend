import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import apiRouter from './router/apiRouter'
import { globalErrorHandler } from './middleware/globalErrorHandler'
import { httpError } from './utils/httpError'
import responseMessage from './constant/responseMessage'

const app: Application = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'))
    } catch (error) {
        httpError(next, error, req, 500)
    }
})
app.use('/api/v1', apiRouter)

app.use(globalErrorHandler)

export default app
