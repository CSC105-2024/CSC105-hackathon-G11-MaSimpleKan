import { Hono } from "hono";
import { userRouter } from "./user.route.ts";
import { postRouter } from "./post.route.ts";
import { commentRouter } from "./comment.route.ts";


const mainRouter = new Hono();

mainRouter.route("/user", userRouter);
mainRouter.route("/post", postRouter);
mainRouter.route("/comment", commentRouter);


export { mainRouter };