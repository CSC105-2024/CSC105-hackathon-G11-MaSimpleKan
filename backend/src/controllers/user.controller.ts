import type { Context } from "hono";
import * as userModel from "../models/user.model.ts";
import * as postModel from "../models/post.model.ts";
import jwt from "jsonwebtoken";

type createUserBody = {
  email: string;
  password: string;
  fName: string;
  sName: string;
  tel: string;
};

type loginUserBody = {
  email: string;
  password: string;
};

export const createUser = async (c: Context) => {
  try {
    const body = await c.req.json<createUserBody>();
    if (
      !body.email ||
      !body.password ||
      !body.fName ||
      !body.sName ||
      !body.tel
    )
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields",
        },
        400
      );
    const newUser = await userModel.createUser(
      body.email,
      body.password,
      body.fName,
      body.sName,
      body.tel
    );
    return c.json({
      success: true,
      data: newUser,
      msg: "Created new User!",
    });
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

export const getUser = async (c: Context) => {
  try {
    //const userId = c.get("userId");
    const userId = c.req.query("userId");
    if (userId !== undefined && userId !== null) {
      const data = await userModel.getUser(parseInt(userId));
      return c.json(data, 200);
    }
    return c.json(
      {
        success: false,
        data: null,
        msg: "Missing required fields",
      },
      400
    );
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

export const getAllUser = async (c: Context) => {
  try {
    const allUser = await userModel.getAllUser();
    return c.json(allUser, 200);
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

export const loginUser = async (c: Context) => {
  try {
    const body = await c.req.json<loginUserBody>();
    if (!body.email || !body.password) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields",
        },
        400
      );
    }

    const user = await userModel.getLoginUser(body.email, body.password);

    if (!user) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "User not found",
        },
        404
      );
    }

    // Create the JWT token
    const cookieKeyName = "MaAdoptKan-Cookie";
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_TOKEN as string
    );

    // Store the token inside the cookie
    c.header(
      "Set-Cookie",
      `${cookieKeyName}=${token}; Path=/; HttpOnly; Secure`
    );

    return c.json(
      {
        success: true,
        data: null,
        msg: "Login Successful",
      },
      200
    );
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

export const getAllPostFromUser = async (c: Context) => {   
  try {
    const userId = c.get("userId");
    // const userId = c.req.query("userId");
    if (userId) {
      const data = await postModel.getAllPostFromUser(parseInt(userId));
      return c.json(data, 200);
    }
    return c.json(
      {
        success: false,
        data: null,
        msg: "UserId undefined!",
      },
      400
    );
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

export const getUserLoggedIn = async (c: Context) => {
  
  try {
    const userId = c.get("userId");
    //const userId = c.req.query("userId")
    if (userId !== undefined && userId !== null) {
      const data = await userModel.getUserLoggedIn(parseInt(userId));
      return c.json(data, 200);
    }
    return c.json(
      {
        success: false,
        data: null,
        msg: "Missing required fields",
      },
      400
    );
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
