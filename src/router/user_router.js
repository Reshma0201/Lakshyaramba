import express from 'express';
import { postUser } from '../controller/usercontroller.js';

const userRouter = express.Router();

// POST /api/user
userRouter.route("/user").post(postUser);

// GET /api/hello
userRouter.get("/hello", (req, res) => {
  res.send("this is just a start");
});

export default userRouter;
