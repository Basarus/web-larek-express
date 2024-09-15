import { Router } from 'express';
import { check } from 'express-validator';
import createOrder from '../controllers/order';

const router = Router();

router.post('/order', [
  check('payment').isIn(['card', 'online']).withMessage('Способ оплаты должен быть card или online'),
  check('email').isEmail().withMessage('Неверный формат email'),
  check('phone').notEmpty().withMessage('Телефон обязателен'),
  check('address').notEmpty().withMessage('Адрес обязателен'),
  check('total').isNumeric().withMessage('Сумма должна быть числом'),
  check('items').isArray({ min: 1 }).withMessage('Должен быть хотя бы один товар'),
  check('items.*').isMongoId().withMessage('Некорректный ID товара'),
], createOrder);

export default router;
