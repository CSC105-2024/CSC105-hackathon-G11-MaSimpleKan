import { Hono } from "hono";
import * as userController from "../controllers/user.controller.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const userRouter = new Hono();

userRouter.post("/create", userController.createUser);
userRouter.post("/login", userController.loginUser);
// userRouter.get("/get",  userController.getUser);
userRouter.get("/getAll", userController.getAllUser);
// userRouter.get("/posts",  userController.getAllPostFromUser);

//Integration
userRouter.get("/get", authMiddleware, userController.getUser);
userRouter.get("/posts", authMiddleware, userController.getAllPostFromUser);


export { userRouter };