import express from 'express';
import { getProfile, updateProfile } from '../controller/profilecontroller.js';
import authMiddleware from '../middlewares/auth_middleware.js';

// Create a router instance
const profileRouter = express.Router();

// All profile routes require authentication
profileRouter.use(authMiddleware);

// Define profile routes
profileRouter.get('/profile', getProfile);
profileRouter.patch('/profile', updateProfile);

// Export the router
export default profileRouter;