import { Router } from 'express'
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
  .post(userValidationRules(), validate, AuthController.register)
userRouter
  .route('/login')
  .post(userLoginValidationRules(), validate, AuthController.login)
// user routes
userRouter
  .route('/')
  .post(userValidationRules(), validate, UserController.createUser)
  .get(UserController.getAllUsers)

export default userRouter
