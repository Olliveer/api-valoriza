import { Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { CreateTagService } from '../services/CreateTagService';

class TagsController {
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
