import { Hono } from "hono";
import * as userController from "../controllers/user.controller.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const userRouter = new Hono();

userRouter.post("/create", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/getAll", userController.getAllUser);

//Integration
userRouter.get("/get", authMiddleware, userController.getUser);
userRouter.get("/posts", authMiddleware, userController.getAllPostFromUser);
userRouter.get("/getLoggedIn", authMiddleware, userController.getUserLoggedIn);



export { userRouter };