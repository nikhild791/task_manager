import { Router } from "express";
import { userAuth } from "../middlewares/user.middleware.js";
import { signin,userProfile,changeUserPassword,allTask,updateTask } from "../controllers/user.controller.js";
const userRouter = Router();

//* userProfile password change task update see all of his assigned task finished task pending task

userRouter.route('/signin').post(signin)
userRouter.route('/').get(userAuth,userProfile)
userRouter.route('/change-password').put(userAuth,changeUserPassword)
userRouter.route('/task').get(userAuth,allTask)
userRouter.route('/task').put(userAuth,updateTask)


export default userRouter