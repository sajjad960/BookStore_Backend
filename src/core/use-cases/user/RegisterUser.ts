import { CreateUser } from './CreateUser'
import createSendToken from './sharedFunctions/createSendToken'

interface RegisterUserRequest {
  name: string
  email: string
  password: string
}
export class RegisterUser {
  constructor() {}

  async execute(request: RegisterUserRequest) {
    const createUser = new CreateUser()
    const user = await createUser.execute(request)
    const token = createSendToken(user)
    // remove some fields from the user object
    user.password = undefined
    user.passwordChangedAt = undefined
    user.passwordResetExpires = undefined
    user.createdAt = undefined
    user.updatedAt = undefined
    console.log('user', user)

    return { user, token }
  }
}
