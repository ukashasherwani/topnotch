import express from 'express';
import { getAllOrders, updateOrderStatus, createProduct, updatePaymentStatus } from '../controllers/adminController.js';
import { deleteProduct, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.post('/products', createProduct);
router.put('/orders/:id/pay', updatePaymentStatus);
router.put('/products/:id', updateProduct);       // Update route
router.delete('/products/:id', deleteProduct);    // Soft Delete route

export default router;