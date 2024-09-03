import app from './app'
import { config } from './config/config'
import logger from './utils/logger'

const server = app.listen(config.PORT, () => {
    logger.info('App listening on port', {
        meta: {
            PORT: config.PORT,
            SERVER_URL: config.SERVER_URL
        }
    })
})

server.on('error', (error) => {
    logger.error('App listening Error', { meta: error })

    server.close((err) => {
        if (err) {
            logger.error('Server close Error', { meta: err })
        }
        process.exit(1)
    })
})
