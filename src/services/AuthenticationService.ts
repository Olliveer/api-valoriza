import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';

type ISessionRequest = {
email: string;
password: string;
}

class AuthenticationService {
  async execute({ email, password }: ISessionRequest): Promise<string> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordVerify = await bcrypt.compare(password, user.password);

    if (!passwordVerify) {
      throw new AppError('Email or password incorrect');
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1d',
    });

    return token;
  }
}

export { AuthenticationService };
