import dotenv from 'dotenv-safe'
dotenv.config()

interface Config {
  port: string | number
}
interface ConfigDatabases {
  MONGODB_URI: string
  MYSQL_DB: string
  MYSQL_USER: string
  MYSQL_PASSWORD: string
  MYSQL_HOST: string
}

export const config: Config = {
  port: process.env.PORT || 3000,
}
export const configDatabases: ConfigDatabases = {
  MONGODB_URI: process.env.MONGODB_URI!,
  MYSQL_DB: process.env.MYSQL_DB!,
  MYSQL_USER: process.env.MYSQL_USER!,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD!,
  MYSQL_HOST: process.env.MYSQL_HOST!,
}
