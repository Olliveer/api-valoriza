import { Request, Response } from 'express';
import { CreateComplimentService } from '../services/CreateComplimentService';

class ComplimentsController {
  async create(req: Request, res:Response) {
    const {
      tag_id, user_sender, user_receiver, message,
    } = req.body;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id, user_sender, user_receiver, message,
    });

    res.status(201).json(compliment);
  }
}

export { ComplimentsController };
