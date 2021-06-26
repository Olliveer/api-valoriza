import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

export async function isAdmin(req: Request, res: Response, _next: NextFunction) {
  const { user_id } = req;

  const usersRepository = getCustomRepository(UsersRepository);

  const { admin } = await usersRepository.findOne(user_id);

  if (admin) {
    return _next();
  }

  return res.status(401).json({ error: 'Unauthorized' });
}
