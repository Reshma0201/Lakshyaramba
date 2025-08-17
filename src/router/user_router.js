import express from 'express';
import {postUser } from '../controller/user_controller';

//created a router instance
const userRouter = express.Router();

//define the routes
userRouter.route("/user").post(postUser)

export default userRouter;