import User from "../models/usermodel.js";
import CustomError from "../utils/custom-error.js";

// Helper function to validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Get current user profile
export const getProfile = async (req, res, next) => {
    try {
        // User data is already attached to req.user by the auth middleware
        res.status(200).json({
            success: true,
            message: "Profile retrieved successfully",
            data: {
                user: req.user
            }
        });

    } catch (error) {
        next(error);
    }
};

// Update user profile
export const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const userId = req.user._id;

        // Build update object with only provided fields
        const updateData = {};
        
        if (name !== undefined) {
            if (!name || name.trim().length === 0) {
                throw new CustomError(400, "Name cannot be empty");
            }
            updateData.name = name.trim();
        }

        if (email !== undefined) {
            if (!isValidEmail(email)) {
                throw new CustomError(400, "Please provide a valid email address");
            }
            
            // Check if email is already taken by another user
            const existingUser = await User.findOne({ 
                email: email.toLowerCase(), 
                _id: { $ne: userId } 
            });
            
            if (existingUser) {
                throw new CustomError(400, "Email is already taken by another user");
            }
            
            updateData.email = email.toLowerCase();
        }

        // If no valid fields to update
        if (Object.keys(updateData).length === 0) {
            throw new CustomError(400, "No valid fields provided for update");
        }

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { 
                new: true, 
                runValidators: true 
            }
        ).select("-password");

        if (!updatedUser) {
            throw new CustomError(404, "User not found");
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                user: updatedUser
            }
        });

    } catch (error) {
        next(error);
    }
};