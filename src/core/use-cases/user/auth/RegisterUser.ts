import { CreateUser } from '../CreateUser'
import createSendToken from '../sharedFunctions/createJwtToken'
import genarateUserOnlyView from '../sharedFunctions/sanitizeUserForView'

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
    const userView = genarateUserOnlyView(user)

    return { user: userView, token }
  }
}
