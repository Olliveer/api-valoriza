import { getCustomRepository } from 'typeorm';
import { User } from '../entities/User';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';

type IUserRequest = {
  name: string;
  email: string;
  admin: boolean;
}

class CreateUserService {
  async execute({ name, email, admin }: IUserRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findOne({ email });

    if (userExists) {
      throw new AppError('User already exists');
    }

    const user = usersRepository.create({
      name,
      email,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
