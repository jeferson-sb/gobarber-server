import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { errors } from 'celebrate';
import morgan from 'morgan';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import routes from '@shared/infra/http/routes';
import '@shared/infra/typeorm';
import '@shared/container';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import apiDocs from '../../../../APIdocs.json';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(
  cors({
    origin: process.env.APP_WEB_URL,
  }),
);
app.use(rateLimiter);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan('dev'));
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use('/api', routes);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(apiDocs, {
    explorer: true,
  }),
);
app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res
    .status(500)
    .json({ message: 'Internal Server Error', status: 'error' });
});

app.listen(3333, () => console.log('⬆️ Server is up and running on port 3333'));
