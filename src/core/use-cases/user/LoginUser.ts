import AppError from '../../../utils/AppError'
import { VerifyUser } from './VerifyUser'
import createSendToken from './sharedFunctions/createJwtToken'
import { User } from '../../domain/entities/User'
import httpStatus from 'http-status'
import genarateUserOnlyView from './sharedFunctions/sanitizeUserForView'

interface LoginRequest {
  email: string
  password: string
}
interface ReturnData {
  user: User
  token: string
}
export class LoginUser {
  constructor() {}

  async execute(request: LoginRequest): Promise<ReturnData> {
    const { email, password } = request
    if (!email || !password) {
      throw new AppError('Please provide email and password', 400)
    }
    const verifyUser = new VerifyUser()
    const user = await verifyUser.execute(email)
    if (!user) {
      throw new AppError('User not found', httpStatus.NOT_FOUND)
    }
    // check password
    let token
    if (user?.comparePassword) {
      const isMatch = await user.comparePassword(password)
      if (!isMatch) {
        throw new AppError('Incorrect password', httpStatus.UNAUTHORIZED)
      }
      token = createSendToken(user)
    } else {
      throw new AppError('User is not valid', httpStatus.UNAUTHORIZED)
    }
    const stringUser = JSON.stringify(user)
    const parsedUser = JSON.parse(stringUser)

    const userView = genarateUserOnlyView(parsedUser)
    return { user: userView, token }
  }
}
