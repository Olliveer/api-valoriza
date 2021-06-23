/* eslint-disable no-unused-vars */
import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';

import './database';
import { router } from './routes';
import { AppError } from './errors/AppError';

const app = express();
app.use(express.json());

app.use(router);

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  console.log(error);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => console.log('SERVER IS RUNNING 😎'));
