/* eslint-disable no-console */
import { sequelize } from './MySqlConnection'

export default async function syncSequelizeModels() {
  try {
    // Sync the models with the database (create tables if not exists)
    await sequelize.sync()
    console.log('Sequlize models were synchronized successfully.')
  } catch (error) {
    console.error('Error synchronizing models:', error)
  }
}
