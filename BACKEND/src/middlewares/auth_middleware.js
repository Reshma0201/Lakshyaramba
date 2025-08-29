import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';
import CustomError from '../utils/custom-error.js';

// JWT authentication middleware
const authMiddleware = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            throw new CustomError(401, 'Access denied. No token provided.');
        }

        // Check if the header starts with 'Bearer '
        if (!authHeader.startsWith('Bearer ')) {
            throw new CustomError(401, 'Access denied. Invalid token format.');
        }

        // Extract token from 'Bearer <token>'
        const token = authHeader.substring(7);

        if (!token) {
            throw new CustomError(401, 'Access denied. No token provided.');
        }

        // Verify the token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new CustomError(401, 'Access denied. Token has expired.');
            } else if (error.name === 'JsonWebTokenError') {
                throw new CustomError(401, 'Access denied. Invalid token.');
            } else {
                throw new CustomError(401, 'Access denied. Token verification failed.');
            }
        }

        // Find the user by ID from the token payload
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            throw new CustomError(401, 'Access denied. User not found.');
        }

        // Add user data to request object for use in protected routes
        req.user = user;
        
        // Continue to the next middleware/route handler
        next();

    } catch (error) {
        next(error);
    }
};

export default authMiddleware;