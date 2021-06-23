import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

class UsersController {
  async create(req: Request, res: Response) {
    const { name, email, admin } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      admin,
    });

    res.status(201).json(user);
  }
}

export { UsersController };
