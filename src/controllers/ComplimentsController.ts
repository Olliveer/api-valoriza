import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { CreateComplimentService } from '../services/CreateComplimentService';
import { ListUserReceiveCompliments } from '../services/ListUserReceiveCompliments';
import { ListUserSendComplimentsService } from '../services/ListUserSendComplimentsService';

class ComplimentsController {
  async listComplimentsByUser(req: Request, res: Response) {
    const { user_id } = req;

    const lisComplimentsService = new ListUserSendComplimentsService();

    const compliments = await lisComplimentsService.execute(user_id);

    res.status(200).json(classToClass(compliments));
  }

  async listReceiveComplimentsByUser(req: Request, res: Response) {
    const { user_id } = req;

    const lisReceiveComplimentsService = new ListUserReceiveCompliments();

    const compliments = await lisReceiveComplimentsService.execute(user_id);

    res.status(200).json(classToClass(compliments));
  }

  async create(req: Request, res:Response) {
    const {
      tag_id, user_receiver, message,
    } = req.body;
    const { user_id } = req;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_sender: user_id,
      user_receiver,
      message,
    });

    res.status(201).json(compliment);
  }
}

export { ComplimentsController };
