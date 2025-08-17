import express from "express";
import userRouter from "./router/user_router.js";
import User from "./models/usermodel.js";

const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded {{extended: true}});


        // send the created user
       // 
app.use("/api", userRouter)
    

export default app;
