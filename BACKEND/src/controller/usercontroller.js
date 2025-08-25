import User from "../models/usermodel.js";

// POST - Create a user
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

// GET - Fetch user(s) by email (or all if no email)
export const getUser = async (req, res) => {
    try {
        const { email } = req.query; //  FIXED destructuring

        let users;
        if (email) {
            // If email is provided, find by email
            users = await User.find({ email });
        } else {
            // Otherwise return all users
            users = await User.find();
        }

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// PATCH - Update a user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // <-- this gets the id from /user/:id
        const updates = req.body;

        const user = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE - Remove a user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // <-- again, get id from route

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
