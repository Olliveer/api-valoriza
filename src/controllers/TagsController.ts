import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { CreateTagService } from '../services/CreateTagService';
import { ListTagsService } from '../services/ListTagsService';

class TagsController {
  async index(req: Request, res: Response) {
    const listTagsService = new ListTagsService();

    const tags = await listTagsService.execute();

    res.status(200).json(classToPlain(tags));
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      throw new AppError('Name is required');
    }

    const tagCreateService = new CreateTagService();

    const tag = await tagCreateService.execute({ name });

    res.status(201).json(tag);
  }
}

export { TagsController };
