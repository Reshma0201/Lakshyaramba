import User from "../models/usermodel.js";

export const postUser = async (req, res) => { 
    try { 
        const { name, email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email or password not provided"
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
        });

        // Send response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user
        });

    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const getUser =async (req, res) =>{
    const (email) = req.query;

    try {
const users =await User.find({
    email
});

    }
} 