import { Hono } from "hono";
import * as postController from "../controllers/post.controller.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const postRouter = new Hono();

// postRouter.post("/create", postController.createPost);
postRouter.patch("/edit", postController.editPost);
postRouter.delete("/delete",  postController.deletePost);
postRouter.get("/get", postController.getPost);
postRouter.get("/getAll", postController.getAllPost);
postRouter.get("/comments", postController.getAllCommentFromPost);

//Integration
postRouter.post("/create", authMiddleware, postController.createPost);


export { postRouter };