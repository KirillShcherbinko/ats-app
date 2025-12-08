import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { authController } from './controllers/auth-controller';
import { userController } from './controllers/user-controller';
import { authMiddleware } from './middleware/auth-middleware';
import { adminMiddleware } from './middleware/role-middleware';
import { errorMiddleware } from './middleware/error-middleware';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'api-gateway' });
});

// Auth routes
app.post('/login', authController.login);
app.post('/register', authController.register);
app.post('/logout', authController.logout);
app.get('/refresh', authController.refresh);
app.get('/me', authMiddleware, authController.me);

// User routes (protected)
app.get('/users', authMiddleware, adminMiddleware, userController.getUsers);
app.get('/users/:id', authMiddleware, adminMiddleware, userController.getUser);
app.post('/users', authMiddleware, adminMiddleware, userController.createUser);
app.patch('/users/:id', authMiddleware, adminMiddleware, userController.updateUser);
app.delete('/users/:id', authMiddleware, adminMiddleware, userController.deleteUser);

// Error handling
app.use(errorMiddleware);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});