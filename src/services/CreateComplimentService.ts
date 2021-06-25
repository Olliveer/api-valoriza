import { getCustomRepository } from 'typeorm';
import { Compliment } from '../entities/Compliment';
import { AppError } from '../errors/AppError';
import { ComplimentsRepository } from '../repositories/ComplimentsRepository';
import { UsersRepository } from '../repositories/UsersRepository';

type IComplimentRequest = {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    tag_id, user_sender, user_receiver, message,
  }: IComplimentRequest): Promise<Compliment> {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    if (user_sender === user_receiver) {
      throw new AppError('Incorrect User receiver');
    }

    const userExists = await usersRepository.findOne(user_receiver);

    if (!userExists) {
      throw new AppError('User receiver do not exists');
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
