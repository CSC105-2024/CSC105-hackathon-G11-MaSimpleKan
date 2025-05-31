import { Hono } from "hono";
import * as commentController from "../controllers/comment.controller.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const commentRouter = new Hono();

commentRouter.post("/create", commentController.createComment);
commentRouter.get("/get", commentController.getComment);
commentRouter.patch("/inCorrect", commentController.increaseCorrect);
commentRouter.delete("/deCorrect",  commentController.decreaseCorrect);
commentRouter.patch("/inSimple", commentController.increaseSimple);
commentRouter.delete("/deSimple",  commentController.decreaseSimple);

//Integration
//commentRouter.post("/create", authMiddleware, commentController.createComment);


export { commentRouter };