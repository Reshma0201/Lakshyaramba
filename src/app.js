import express from "express";
import User from "./models/usermodel.js"; // Use capital for model

const app = express();

// To parse JSON bodies
app.use(express.json());

app.post("/user", async (req, res) => {
    try {
        const newUser = await User.create({
            name: "Reshma",
            email: "reshmaxth@gmail.com",
            password: "pass"
        });

        res.status(200).send(user);
        // res.send("Welcome to backend")
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Export express app
export default app;
