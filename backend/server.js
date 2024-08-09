import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
console.log('haihia')

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
