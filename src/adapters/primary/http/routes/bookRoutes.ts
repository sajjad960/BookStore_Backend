import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { userValidationRules } from '../validators/userValidators'
import validate from '../middleware/validateRequest'

const router = Router()

router
  .route('/')
  .post(userValidationRules(), validate, UserController.createUser)
  .get(UserController.getAllUsers)

export default router
