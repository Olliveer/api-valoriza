import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { classToClass } from 'class-transformer';
import { CreateUserService } from '../services/CreateUserService';
import { AuthenticationService } from '../services/AuthenticationService';

class UsersController {
  async create(req: Request, res: Response) {
    const {
      name, email, password, admin,
    } = req.body;

    const createUserService = new CreateUserService();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUserService.execute({
      name,
      email,
      password: hashedPassword,
      admin,
    });

    res.status(201).json(classToClass(user));
  }

  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateService = new AuthenticationService();

    const user = await authenticateService.execute({ email, password });

    res.status(200).json(classToClass(user));
  }
}

export { UsersController };
