import express from 'express';
import { postUser } from '../controller/usercontroller.js';
import { getUser } from '../controller/usercontroller.js';



const userRouter = express.Router();

// POST /api/user
userRouter.route("/user").post(postUser);

// GET /api/hello
userRouter.post("/user", (req, res) => {
  res.send("this is just a start");
});

userRouter.get("/hello", (req, res) => {
  res.send("this is just a start");
});


userRouter.get("/user", getUser);

export default userRouter;
