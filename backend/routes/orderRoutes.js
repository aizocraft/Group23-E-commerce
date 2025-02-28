import express from 'express';
import { createOrder, getOrderById, updateOrderToPaid, updateOrderToDelivered } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrder);  // Create an order
router.route('/:id').get(protect, getOrderById);  // Get order by ID
router.route('/:id/pay').put(protect, updateOrderToPaid);  // Mark order as paid
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);  // Admin only: Mark order as delivered

export default router;
