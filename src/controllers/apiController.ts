import { NextFunction, Request, Response } from 'express'
import { httpResponse } from '../utils/httpResponse'
import responseMessage from '../constant/responseMessage'
import { httpError } from '../utils/httpError'

export const self = (req: Request, res: Response, next: NextFunction) => {
    try {
        httpResponse(req, res, 200, responseMessage.SUCCESS)
    } catch (error) {
        httpError(next, error, req, 500)
    }
}
