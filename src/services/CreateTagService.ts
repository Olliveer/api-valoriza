import { getCustomRepository } from 'typeorm';
import { Tag } from '../entities/Tag';
import { AppError } from '../errors/AppError';
import { TagsRepository } from '../repositories/TagsRepository';

type ITagRequest = {
  name: string;
}

class CreateTagService {
  async execute({ name }:ITagRequest): Promise<Tag> {
    const tagsRepository = getCustomRepository(TagsRepository);

    const tagsExists = await tagsRepository.findOne({ name });

    if (tagsExists) {
      throw new AppError('There is already a tag with this name');
    }

    // const usersRepository = getCustomRepository(UsersRepository);

    // const admin = await usersRepository.findOne({})

    const tag = tagsRepository.create({
      name,
    });

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
