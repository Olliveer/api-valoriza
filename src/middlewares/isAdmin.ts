import { NextFunction, Request, Response } from 'express';

export function isAdmin(req: Request, res: Response, _next: NextFunction) {
  const admin = true;

  if (admin) {
    return _next();
  }

  return res.status(401).json({ error: 'Unauthorized' });
}
