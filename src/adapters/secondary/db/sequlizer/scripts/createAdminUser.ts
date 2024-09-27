/* eslint-disable no-console */
import { AdminConfig } from '../../../../../config/config'
import { CreateUserWithRole } from '../../../../../core/use-cases/user/CreateUserWithRole'
import { VerifyUser } from '../../../../../core/use-cases/user/VerifyUser'
import { UserRole } from '../models/UserModel'

async function createAdminUser() {
  try {
    const createRoleUser = new CreateUserWithRole()
    const verifyUser = new VerifyUser()
    const admin = await verifyUser.execute(AdminConfig.email)
    if (admin) return
    const user = await createRoleUser.execute({
      name: AdminConfig.name,
      email: AdminConfig.email,
      password: AdminConfig.password,
      role: UserRole.ADMIN,
    })
    console.log(`Admin user created with email: ${user.email}`)
  } catch (error) {
    console.error('Error: Admin not created', error)
  }
}

export default createAdminUser
