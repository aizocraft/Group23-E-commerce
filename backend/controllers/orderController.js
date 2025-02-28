import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        try {
            // Calculate item price, shipping price, and total price dynamically
            const orderItemsWithDetails = [];
            let itemsPrice = 0;

            for (const item of orderItems) {
                const product = await Product.findById(item.product);
                if (!product) {
                    return res.status(400).json({ message: `Product with id ${item.product} not found` });
                }

                const totalItemPrice = product.price * item.qty;
                itemsPrice += totalItemPrice;

                orderItemsWithDetails.push({
                    name: product.name,
                    qty: item.qty,
                    imageUrl: product.imageUrl,
                    price: product.price,
                    product: product._id,
                });
            }

            // Assuming fixed shipping price and tax for now (can be dynamic)
            const shippingPrice = 10.0;
            const taxPrice = 1.5;

            // Calculate the total price
            const totalPrice = itemsPrice + shippingPrice + taxPrice;

            const order = new Order({
                user: req.user._id, // User from token
                orderItems: orderItemsWithDetails,
                shippingAddress,
                paymentMethod: paymentMethod || 'Not Provided', // Default value if not provided
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('orderItems.product', 'name imageUrl price');
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrderToPaid = async (req, res) => {
    const { paymentResult } = req.body;

    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = paymentResult;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
