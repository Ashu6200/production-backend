import { NextFunction, Request } from 'express'
import responseMessage from '../constant/responseMessage'
import { EApplicationEnvironment } from '../constant/application'
import { config } from '../config/config'
import { THttpError } from '../types/types'
import logger from './logger'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export const httpError = (nextFun: NextFunction, err: Error | unknown, req: Request, errorStatusCode: number = 500): void => {
    const errorObj: THttpError = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: err instanceof Error ? err.message || responseMessage.SOMETHINNG_WENT_WRONG : responseMessage.SOMETHINNG_WENT_WRONG,
        data: null,
        trace: err instanceof Error ? { error: err.stack } : null
    }

    logger.log('CONTROLLER_ERROR', { meta: errorObj })

    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete errorObj.request.ip
        delete errorObj.trace
    }

    return nextFun(errorObj)
}
