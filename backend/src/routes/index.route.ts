import { Hono } from "hono";
// import { userRouter } from "./user.route.ts";
// import { requestRouter } from "./request.route.ts";

const mainRouter = new Hono();

// mainRouter.route("/user", userRouter);
// mainRouter.route("/request", requestRouter);


export { mainRouter };