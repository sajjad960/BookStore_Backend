import { Request, Response } from 'express';
import { CreateUser } from '../../../../core/use-cases/user/CreateUser';
import { GetAllUsers } from '../../../../core/use-cases/user/GetAllUsers';

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    const createUser = new CreateUser();
    const user = await createUser.execute({ name, email });
    res.status(201).json({
      status: "success",
      user,
    });
  }
  static async getAllUsers(req: Request, res: Response){
    const getAllUser = new GetAllUsers();
    const users = await getAllUser.execute();

    res.status(200).json({
      status: "success",
      users,
    });
  }
}
