import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';

import errorHandler from './middlewares/errorHandler';
import { errorLogger, requestLogger } from './middlewares/logger';

import productRouter from './routes/product';
import orderRouter from './routes/order';

import NotFoundError from './errors/notFoundError';

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.use(requestLogger);

app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', productRouter);
app.use('/', orderRouter);

app.use((_req, _res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT);
