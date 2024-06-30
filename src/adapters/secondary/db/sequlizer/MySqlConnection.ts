/* eslint-disable no-console */
import { Sequelize } from 'sequelize'
import { databasesConfig } from '../../../../config/config'

const sequelize = new Sequelize(
  databasesConfig.MYSQL_DB,
  databasesConfig.MYSQL_USER,
  databasesConfig.MYSQL_PASSWORD,
  {
    host: databasesConfig.MYSQL_HOST,
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
