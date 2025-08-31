import express from 'express';
import { register, login, logout, getCurrentUser } from '../controller/authcontroller.js';
import authMiddleware from '../middlewares/auth_middleware.js';

// Create a router instance
const authRouter = express.Router();

// Define authentication routes
authRouter.post('/auth/register', register);
authRouter.post('/auth/login', login);
authRouter.post('/auth/logout', logout);

// Protected route - requires authentication
authRouter.get('/auth/me', authMiddleware, getCurrentUser);

// Export the router
export default authRouter;