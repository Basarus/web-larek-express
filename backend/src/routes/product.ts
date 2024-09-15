import { Router } from 'express';
import { getAllProducts, createProduct, getProductById } from '../controllers/product';

const router = Router();

router.get('/product', getAllProducts);
router.post('/product', createProduct);
router.get('/product/:id', getProductById);

export default router;
