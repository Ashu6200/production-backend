import { createLogger, format, transports } from 'winston'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import util from 'util'
import { config } from '../config/config'
import { EApplicationEnvironment } from '../constant/application'
import path from 'path'
import * as sourceMapSupport from 'source-map-support'

sourceMapSupport.install()
const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ]
    }
    return []
}
const FileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat)
        })
    ]
}
const consoleLogFormat = format.printf((info) => {
    const {
        level,
        message,
        timestamp,
        meta = {}
    } = info as {
        level: string
        message: string
        timestamp: string
        meta: Record<string, unknown>
    }

    const customLevel = level.toUpperCase()
    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null
    })

    return `${customLevel} [${timestamp}] ${message}\nMETA: ${customMeta}\n`
})
const fileLogFormat = format.printf((info) => {
    const {
        level,
        message,
        timestamp,
        meta = {}
    } = info as {
        level: string
        message: string
        timestamp: string
        meta: Record<string, unknown>
    }

    const logmeta: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logmeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || ''
            }
        } else {
            logmeta[key] = meta
        }
    }
    const logdata = {
        level: level.toUpperCase(),
        message: message,
        timestamp: timestamp,
        meta: logmeta
    }
    return JSON.stringify(logdata, null, 4)
})

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...FileTransport(), ...consoleTransport()]
})
