import express from "express";
import userRouter from "./router/user_router.js";
import User from "./models/usermodel.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
 console.log("Hello, are you okyayyyy");
 next();
});

// routes...mounts all routes from userRouter under /api
app.use("/api", userRouter);

export default app;
