/* eslint-disable no-console */
import { Sequelize } from 'sequelize'
import { databasesConfig, isTest } from '../../../../config/config'

let sequelize: Sequelize
if (isTest) {
  sequelize = sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:', // In-memory SQLite for tests
    logging: false,
  })
} else {
  sequelize = new Sequelize(
    databasesConfig.MYSQL_DB,
    databasesConfig.MYSQL_USER,
    databasesConfig.MYSQL_PASSWORD,
    {
      host: databasesConfig.MYSQL_HOST,
      dialect: 'mysql',
      logging: false,
    }
  )
}

const connectToSequelize = async () => {
  try {
    if (isTest) {
      await sequelize.sync({ force: true })
      console.log('Test Sqlite DB connected.')
    } else {
      await sequelize.authenticate()
      console.log('MySQL connected.')
    }
  } catch (error) {
    console.error('Unable to connect to MySQL:', error)
    process.exit(1)
  }
}
const teardownSequelizeTestDB = async () => {
  await sequelize.close()
}

export { sequelize, connectToSequelize, teardownSequelizeTestDB }
