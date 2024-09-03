import { NextFunction, Request, Response } from 'express'
import { THttpError } from '../types/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: THttpError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.statusCode).json(err)
}
