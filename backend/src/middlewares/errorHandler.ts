import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  error: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Внутренняя ошибка сервера';

  res.status(statusCode).json({
    message,
  });
};

export default errorHandler;
