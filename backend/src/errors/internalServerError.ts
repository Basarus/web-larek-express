export default class InternalServerError extends Error {
  statusCode: number;

  constructor(message: string = 'Внутренняя ошибка сервера') {
    super(message);
    this.statusCode = 500;
  }
}
