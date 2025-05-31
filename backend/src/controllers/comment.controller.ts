import type { Context } from "hono";
import * as commentModel from "../models/comment.model.ts";
import type { $Enums } from "../generated/prisma/index.js";

type createCommentBody = {
  text: string;
  userId: number;
  postId: number;
};

export const createComment = async (c: Context) => {
  try {
    // //Waiting for Integration
    // const userId = c.get("userId");
    // const formData = await c.req.parseBody();
    // const body = JSON.parse(formData.json as string);
    // console.log(body);
    const body = await c.req.json<createCommentBody>();

    if (!body.text)
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields",
        },
        400
      );
    //Integration
    // if (!userId)
    //   return c.json({
    //     success: false,
    //     msg: "userId is Undefinded",
    //   });

    const newComment = await commentModel.createComment(
      body.text,
      body.userId,
      body.postId
      //userId
    );
    return c.json({
      success: true,
      data: newComment,
      msg: "Created new Comment!",
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

export const getComment = async (c: Context) => {
  try {
    const id = c.req.query("id");
    if (!id) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields",
        },
        400
      );
    }
    const comment = await commentModel.getComment(parseInt(id));
    return c.json({
      success: true,
      data: comment,
      msg: "Get Comment!",
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

export const increaseCorrect = async (c: Context) => {
  try {
    const id = c.req.query("id");
    if (!id) {
      return c.json({
        success: false,
        data: null,
        msg: "Missing required",
      });
    }

    const correct = await commentModel.increaseCorrectCount(parseInt(id));
    return c.json({
      success: true,
      data: correct,
      msg: "Increased Correct!",
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

export const decreaseCorrect = async (c: Context) => {
  try {
    const id = c.req.query("id");
    if (!id) {
      return c.json({
        success: false,
        data: null,
        msg: "Missing required",
      });
    }

    const correct = await commentModel.decreaseCorrectCount(parseInt(id));
    return c.json({
      success: true,
      data: correct,
      msg: "decreased Correct!",
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

export const increaseSimple = async (c: Context) => {
  try {
    const id = c.req.query("id");
    if (!id) {
      return c.json({
        success: false,
        data: null,
        msg: "Missing required",
      });
    }

    const correct = await commentModel.increaseSimpleCount(parseInt(id));
    return c.json({
      success: true,
      data: correct,
      msg: "Increased Simple!",
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

export const decreaseSimple = async (c: Context) => {
  try {
    const id = c.req.query("id");
    if (!id) {
      return c.json({
        success: false,
        data: null,
        msg: "Missing required",
      });
    }

    const correct = await commentModel.decreaseSimpleCount(parseInt(id));
    return c.json({
      success: true,
      data: correct,
      msg: "decreased Simple!",
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
