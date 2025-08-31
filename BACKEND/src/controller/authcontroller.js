import User from "../models/usermodel.js";
import CustomError from "../utils/custom-error.js";
import jwt from "jsonwebtoken";

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Helper function to validate password requirements
const isValidPassword = (password) => {
    return password && password.length >= 6;
};

const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// Register new user
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            throw new CustomError(400, "Email and password are required");
        }

        if (!name || name.trim().length === 0) {
            throw new CustomError(400, "Name is required");
        }

        // Validate email format
        if (!isValidEmail(email)) {
            throw new CustomError(400, "Please provide a valid email address");
        }

        // Validate password requirements
        if (!isValidPassword(password)) {
            throw new CustomError(400, "Password must be at least 6 characters long");
        }

        // Check if user already exists (duplicate email validation)
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            throw new CustomError(400, "User with this email already exists");
        }

        // Create user (password will be hashed by the pre-save middleware)
        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase(),
            password
        });

        // Generate JWT token
        const token = generateToken(user._id);

        // Respond with user data (excluding password) and token
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
                token
            },
        });

    } catch (error) {
        next(error);
    }
};

// Login user
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            throw new CustomError(400, "Email and password are required");
        }

        // Validate email format
        if (!isValidEmail(email)) {
            throw new CustomError(400, "Please provide a valid email address");
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            throw new CustomError(401, "Invalid email or password");
        }

        // Compare password using the instance method
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new CustomError(401, "Invalid email or password");
        }

        // Generate JWT token
        const token = generateToken(user._id);

        // Respond with user data (excluding password) and token
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
                token
            },
        });

    } catch (error) {
        next(error);
    }
};

// Logout user
export const logout = async (req, res, next) => {
    try {
        // Since we're using JWT tokens, logout is handled on the client side
        // by removing the token from storage. We just send a success response.
        res.status(200).json({
            success: true,
            message: "Logout successful"
        });

    } catch (error) {
        next(error);
    }
};

// Get current authenticated user profile
export const getCurrentUser = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "User profile retrieved successfully",
            data: {
                user: req.user
            }
        });

    } catch (error) {
        next(error);
    }
};