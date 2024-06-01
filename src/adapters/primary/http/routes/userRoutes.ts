import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { userValidationRules, validate } from '../middleware/Validator'

const router = Router()

router
  .route('/')
  .post(userValidationRules(), validate, UserController.createUser)
  .get(UserController.getAllUsers)

export default router
