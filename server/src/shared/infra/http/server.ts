import 'reflect-metadata';

import cors from 'cors';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import routes from './routes';

import '../typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(uploadConfig.uploadFolder));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error.'
  });
});

app.listen(3333, () => {
  console.log('😉️ Acesse http://localhost:3333');
});
