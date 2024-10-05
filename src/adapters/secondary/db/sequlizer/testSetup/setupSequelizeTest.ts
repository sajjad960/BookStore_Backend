import { Sequelize } from 'sequelize'

let sequelize: Sequelize

export const setupTestDB = async () => {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:', // In-memory SQLite for tests
  })
  await sequelize.sync() // Sync all models to the in-memory database
}

export const teardownTestDB = async () => {
  await sequelize.close()
}
