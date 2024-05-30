import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

router.route("/").post(UserController.createUser).get(UserController.getAllUsers);

export default router;
