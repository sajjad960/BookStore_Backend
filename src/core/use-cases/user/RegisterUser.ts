import { CreateUser } from './CreateUser'

interface RegisterUserRequest {
  name: string
  email: string
  password: string
}
export class RegisterUser {
  constructor() {}

  execute(request: RegisterUserRequest) {
    const createUser = new CreateUser()
    const user = createUser.execute(request)
  }
}
