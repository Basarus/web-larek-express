import { Router } from 'express';
import { getAllProducts, createProduct, getProductById } from '../controllers/product';
import { validateProductCreation, validateProductId } from '../middlewares/validations';

const router = Router();

router.get('/product', getAllProducts);
router.post('/product', validateProductCreation, createProduct);
router.get('/product/:id', validateProductId, getProductById);

export default router;
