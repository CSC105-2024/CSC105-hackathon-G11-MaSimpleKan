import { Hono } from "hono";
import * as commentController from "../controllers/comment.controller.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const commentRouter = new Hono();

// commentRouter.post("/create", commentController.createComment);
commentRouter.get("/get", commentController.getComment);
commentRouter.patch("/inCorrect", authMiddleware, commentController.increaseCorrect);
commentRouter.delete("/deCorrect", authMiddleware, commentController.decreaseCorrect);
commentRouter.patch("/inSimple", authMiddleware,commentController.increaseSimple);
commentRouter.delete("/deSimple",  authMiddleware,commentController.decreaseSimple);
commentRouter.get("/post/:postId", commentController.getAllCommentFromPost);

// integration
commentRouter.post("/create", authMiddleware, commentController.createComment);


export { commentRouter };