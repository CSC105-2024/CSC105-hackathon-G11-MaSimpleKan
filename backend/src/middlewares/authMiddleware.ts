import { type Context, type Next } from "hono";
import { getCookie } from "hono/cookie";
import jwt from "jsonwebtoken";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const cookie = getCookie(c)["MaAdoptKan-Cookie"];
    if (!cookie) {
      return c.json(
        {
          success: false,
          data: null,
          msg: `Not Authorized`,
        },
        401
      );
    }

    const decoded = jwt.verify(
      cookie,
      process.env.JWT_SECRET_TOKEN as string
    ) as { id: string };

    c.set("userId", decoded.id);
    await next();
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500
    );
  }
};
