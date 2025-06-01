import type { $Enums } from "../generated/prisma/index.js";
import { db } from "../index.ts";

export const createComment = async (
  text: string,
  userId: number,
  postId: number
) => {
  const commentForm = db.comment.create({
    data: {
      text,
      userId,
      postId,
    },
  });
  return commentForm;
};

export const getComment = async (id: number) => {
  const commentForm = db.comment.findUnique({
    where: {
      id,
    },
    include: {
      Votes: true,
    },
  });
  return commentForm;
};

export const getAllCommentFromPost = async (postId: number) => {
  const commentForm = await db.comment.findMany({
    where: {
      postId,
    },
    include: {
      Votes: true,
      User: {
        select: {
          id: true,
          fName: true,
          sName: true,
        },
      },
    },
    orderBy: [
      {
        correctCount: "desc",
      },
      {
        simpleCount: "desc",
      },
    ],
  });

  return commentForm;
};

export const increaseCorrectCount = async (id: number, userId: number) => {
  await Promise.all([
    db.comment.update({
      where: {
        id,
      },
      data: {
        correctCount: {
          increment: 1,
        },
      },
    }),
    db.votes.create({
      data: {
        commentId: id,
        userId,
        voteType: "Correct",
      },
    }),
  ]);
  return null;
};

export const decreaseCorrectCount = async (id: number, userId: number) => {
  await Promise.all([
    db.comment.update({
      where: {
        id,
      },
      data: {
        correctCount: {
          decrement: 1,
        },
      },
    }),
    db.votes.delete({
      where: {
        userId_commentId_voteType: {
          userId,
          commentId: id,
          voteType: "Correct",
        },
      },
    }),
  ]);
  return null;
};

export const increaseSimpleCount = async (id: number, userId: number) => {
  await Promise.all([
    db.comment.update({
      where: {
        id,
      },
      data: {
        simpleCount: {
          increment: 1,
        },
      },
    }),
    db.votes.create({
      data: {
        commentId: id,
        userId,
        voteType: "Simple",
      },
    }),
  ]);
  return null;
};

export const decreaseSimpleCount = async (id: number, userId: number) => {
  await Promise.all([
    db.comment.update({
      where: {
        id,
      },
      data: {
        simpleCount: {
          decrement: 1,
        },
      },
    }),
    db.votes.delete({
      where: {
        userId_commentId_voteType: {
          userId,
          commentId: id,
          voteType: "Simple",
        },
      },
    }),
  ]);
  return null;
};

export const getCommentUser = async (postId: number) => {
  const comments = await db.comment.findMany({
    where: { postId },
    include: {
      Votes: true,
      User: {
        select: {
          id: true,
          fName: true,
          sName: true,
        },
      },
    },
  });
  return comments;
};
