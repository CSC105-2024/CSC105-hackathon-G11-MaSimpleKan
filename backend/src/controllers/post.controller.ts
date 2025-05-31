import type { Context } from "hono";
import * as postModel from "../models/post.model.ts";
import * as commentModel from "../models/comment.model.ts";
import type { $Enums } from "../generated/prisma/index.js";

type createPostBody = {
  title: string;
  description: string;
  subject: $Enums.Subject;
  userId: number;
};

type editPostBody = {
  title: string;
  description: string;
  subject: $Enums.Subject;
};

export const createPost = async (c: Context) => {
  try {
    // //Waiting for Integration
    // const userId = c.get("userId");
    // const formData = await c.req.parseBody();
    // const body = JSON.parse(formData.json as string);
    // console.log(body);

    const body = await c.req.json<createPostBody>();

    if (!body.title || !body.description || !body.subject || !body.userId)
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

    const newPost = await postModel.createPost(
      body.title,
      body.description,
      body.subject,
      body.userId
      //userId
    );
    return c.json({
      success: true,
      data: newPost,
      msg: "Created new Post!",
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

export const editPost = async (c: Context) => {
  try {
    // Integration
    // const userId = c.get("userId");
    // const formData = await c.req.parseBody();
    // const body = JSON.parse(formData.json as string);

    const id = c.req.query("id");
    const body = await c.req.json<editPostBody>();

    if (!body.title || !body.description || !body.subject)
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields",
        },
        400
      );

    if (!id)
      return c.json({
        success: false,
        msg: "postId is Undefinded",
      });

    const updatePost = await postModel.editPost(
      parseInt(id),
      body.title,
      body.description,
      body.subject
    );
    return c.json({
      success: true,
      data: updatePost,
      msg: "Updated a Post!",
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

export const deletePost = async (c: Context) => {
  try {
    const id = c.req.query("id");
    if (id !== undefined && id !== null) {
      const data = await postModel.deletePost(parseInt(id));
      return c.json(
        {
          data: data,
          msg: "Delete Success",
        },
        200
      );
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

export const getPost = async (c: Context) => {
  try {
    const id = c.req.query("id");
    if (id !== undefined && id !== null) {
      const data = await postModel.getPost(parseInt(id));
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

export const getAllPost = async (c: Context) => {
  try {
    const allPost = await postModel.getAllPost();
    return c.json(allPost, 200);
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

export const getAllCommentFromPost = async (c: Context) => {
  try {
    const postId = c.req.query("postId");
    if (!postId)
      return c.json({
        success: false,
        data: null,
        msg: "Missing required",
      });
    const allComments = await commentModel.getAllCommentFromPost(
      parseInt(postId)
    );
    return c.json(allComments, 200);
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
