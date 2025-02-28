import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'; 
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes); // Add this line for products
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
