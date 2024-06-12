/* eslint-disable no-console */
import { Command } from 'commander'
import dotenv from 'dotenv'
import { connectToSequelize, sequelize } from '../MySqlConnection'
import syncSequelizeModels from '../synchronizeModels'
import { CreateUserWithRole } from '../../../../../core/use-cases/user/CreateUserWithRole'
import { Roles } from '../../../../../core/ports/UserRepositoryPort'

dotenv.config()

const program = new Command()

program
  .option('-n, --name <name>', 'Admin name')
  .option('-e, --email <email>', 'Admin email')
  .option('-p, --password <password>', 'Admin password')

program.parse(process.argv)

const options = program.opts()

if (!options.name || !options.email || !options.password) {
  console.error('Please provide name, email, and password for the admin user.')
  process.exit(1)
}

async function createAdminUser() {
  try {
    await connectToSequelize()
    await syncSequelizeModels()

    const { name, email, password } = options
    const createRoleUser = new CreateUserWithRole()

    const user = await createRoleUser.execute({
      name,
      email,
      password,
      role: Roles.ADMIN,
    })
    console.log(`Admin user created with email: ${user.email}`)
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    sequelize.close()
  }
}

createAdminUser()
// command for creating admin user
// npx ts-node src/adapters/secondary/db/sequlizer/scripts/createAdminUser.ts -n 'Admin Name' -e 'admin@localhost' -p 'admin123'
