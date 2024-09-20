import { RequestHandler, Router } from 'express'
import { UserController } from '../controllers/UserController'
import {
  userLoginValidationRules,
  userValidationRules,
} from '../validators/userValidators'
import validate from '../middleware/validateRequest'
import { AuthController } from '../controllers/AuthController'

const userRouter = Router()

// authentication routes
userRouter
  .route('/register')
  .post(
    userValidationRules(),
    validate as unknown as RequestHandler,
    AuthController.register as unknown as RequestHandler
  )
userRouter
  .route('/login')
  .post(
    userLoginValidationRules(),
    validate as unknown as RequestHandler,
    AuthController.login as unknown as RequestHandler
  )
// user routes
userRouter
  .route('/')
  .post(
    userValidationRules(),
    validate as unknown as RequestHandler,
    UserController.createUser as unknown as RequestHandler
  )
  .get(UserController.getAllUsers as unknown as RequestHandler)

export default userRouter
