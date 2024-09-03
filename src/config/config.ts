import DotenvFlow from 'dotenv-flow'

DotenvFlow.config()

export const config = {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    DATABASEURL: process.env.DATABASEURL
}
