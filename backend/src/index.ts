import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/auth';
import softwareRoutes from './routes/software';
import requestRoutes from './routes/requests';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true
}));

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
AppDataSource.initialize()
    .then(() => console.log('Database connected'))
    .catch(error => console.log('Database connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/requests', requestRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});