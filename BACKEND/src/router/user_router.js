/*import express from 'express';
import { postUser } from '../controller/usercontroller.js';
import { getUser } from '../controller/usercontroller.js';
import { updateUser } from '../controller/usercontroller.js';
import { deleteUser } from '../controller/usercontroller.js';



const userRouter = express.Router();

// POST /api/user
userRouter.route("/user").post(postUser);

// GET /api/hello
userRouter.get("/hello", (req, res) => {
  res.send("this is just a start");
});


userRouter.get("/user", getUser);
userRouter.patch("/user/:id", updateUser);
userRouter.delete("/user/:id", deleteUser);
export default userRouter;
*/

import express from 'express';
import { postUser } from '../controller/usercontroller.js';
import { getUser } from '../controller/usercontroller.js';
import { updateUser } from '../controller/usercontroller.js';
import { deleteUser } from '../controller/usercontroller.js';
import authMiddleware from '../middlewares/auth_middleware.js';

// created a router instance
const userRouter = express.Router()

// define the routes - these should be protected as they deal with user data
userRouter.route("/user").post(authMiddleware, postUser)
userRouter.route("/user").patch(authMiddleware, patchUser);
userRouter.route("/user").get(authMiddleware, getUser);
userRouter.route("/user").delete(authMiddleware, deleteUser)

// export the router
export default userRouter;