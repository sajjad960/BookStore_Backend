/* eslint-disable no-console */
import { Sequelize } from 'sequelize'
import { configDatabases } from '../../../../config/config'

const sequelize = new Sequelize(
  configDatabases.MYSQL_DB,
  configDatabases.MYSQL_USER,
  configDatabases.MYSQL_PASSWORD,
  {
    host: configDatabases.MYSQL_HOST,
    dialect: 'mysql',
    logging: false,
  }
)

const connectToSequelize = async () => {
  try {
    await sequelize.authenticate()
    console.log('MySQL connected.')
  } catch (error) {
    console.error('Unable to connect to MySQL:', error)
    process.exit(1)
  }
}

export { sequelize, connectToSequelize }
