import { UserRole } from '../../../adapters/secondary/db/sequlizer/models/UserModel'

export type CreateUserWithRoleRequest = {
  name: string
  email: string
  password: string
  role: UserRole
}
