import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient } from "./generated/prisma/index.js";
import { mainRouter } from "./routes/index.route.ts";
import { cors } from "hono/cors";

const app = new Hono();
export const db = new PrismaClient();

app.use(
  cors({
    origin: ["http://localhost:5173"], // Your frontend application
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("", mainRouter);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

db.$connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error: any) => {
    console.error("Error connecting to the database:", error);
  });
process.on("beforeExit", async () => {
  await db.$disconnect();
});
