import { NextFunction, Request, Response } from 'express';
import Product from '../models/product';
import ConflictError from '../errors/conflictError';
import BadRequestError from '../errors/badRequestError';
import InternalServerError from '../errors/internalServerError';

export const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json({
      items: products,
      total: products.length,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка при получении товаров', error: error.message });
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      image,
      category,
      description,
      price,
    } = req.body;

    const newProduct = new Product({
      title,
      image,
      category,
      description,
      price,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError('Товар с таким названием уже существует'));
    }
    if (error.name === 'ValidationError') {
      return next(new BadRequestError('Ошибка валидации данных при создании товара'));
    }

    return next(new InternalServerError());
  }
};

export async function getProductById(req: Request, res: Response) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: 'Товар не найден' });
      return;
    }

    res.status(200).json({
      id: product._id,
      description: product.description,
      image: product.image.fileName,
      title: product.title,
      category: product.category,
      price: product.price,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка при получении товара', error: error.message });
  }
}
