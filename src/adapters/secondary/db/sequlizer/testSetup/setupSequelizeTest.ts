import { Sequelize } from 'sequelize'

let sequelize: Sequelize

export const setupSequelizeTestDB = async () => {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:', // In-memory SQLite for tests
    logging: false,
  })

  await sequelize
    .sync()
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Sequelize Database connected successfully')
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('Sequelize Database connection failed', error)
    })
}

export const teardownTestDB = async () => {
  await sequelize.close()
}
