/*import express from "express";
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
app.use("/api/auth", userRouter);

export default app; */

import cors from "cors"
import express from "express"
import userRouter from "./router/user_router.js";
import authRouter from "./router/auth_router.js";
import profileRouter from "./router/profile_router.js";
import errorMiddleware from "./middlewares/error_middleware.js";

const app = express();

// middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routes
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", profileRouter);

// error handling middleware
app.use(errorMiddleware);

// export express app
export default app;