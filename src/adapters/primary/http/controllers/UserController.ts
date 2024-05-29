import { Request, Response } from 'express';
import { CreateUser } from '../../../../core/use-cases/user/CreateUser';

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    const createUser = new CreateUser();
    const user = await createUser.execute({ name, email });
    res.status(201).json(user);
  }
}
