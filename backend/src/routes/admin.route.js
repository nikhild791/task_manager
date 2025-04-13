import { Router } from "express";
import { signup,signin,adminProfile,createUser,showUser,deleteUser,showTask,createTask,updateTask,deleteTask,assignTask,expelTask } from "../controllers/admin.controller.js";
import { adminAuth } from "../middlewares/admin.middleware.js";
import { messageRetrivel } from "../controllers/webSocket.controller.js";

const adminRouter = Router();

adminRouter.route('/signup').post(signup)
adminRouter.route('/signin').post(signin)
adminRouter.route('/').get(adminAuth,adminProfile)

adminRouter.route('/user').get(adminAuth,showUser)
adminRouter.route('/user').post(adminAuth,createUser)
adminRouter.route('/user/:userId').delete(adminAuth,deleteUser)

adminRouter.route('/task').get(adminAuth,showTask)
adminRouter.route('/task').post(adminAuth,createTask)
adminRouter.route('/task').put(adminAuth,updateTask)
adminRouter.route('/task/:taskId').delete(adminAuth,deleteTask)
adminRouter.route('/task/assign').put(adminAuth,assignTask)
adminRouter.route('/task/expel').put(adminAuth,expelTask)

adminRouter.route('/message/:roomId').get(adminAuth,messageRetrivel)




export default adminRouter