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
  });
  return commentForm;
};

export const getAllCommentFromPost = async (postId:number) => {
  const commentForm = db.comment.findMany({
    where: {
        postId
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

export const increaseCorrectCount = async (id:number)=> {
    const commentForm = db.comment.update({
        where:{
            id
        },
        data:{
            correctCount:{
                increment:1
            }
        }
    })
    return commentForm
}

export const decreaseCorrectCount = async (id:number)=> {
    const commentForm = db.comment.update({
        where:{
            id
        },
        data:{
            correctCount:{
                decrement: 1
            }
        }
    })
    return commentForm
}

export const increaseSimpleCount = async (id:number)=> {
    const commentForm = db.comment.update({
        where:{
            id
        },
        data:{
            simpleCount:{
                increment:1
            }
        }
    })
    return commentForm
}

export const decreaseSimpleCount = async (id:number)=> {
    const commentForm = db.comment.update({
        where:{
            id
        },
        data:{
            simpleCount:{
                decrement: 1
            }
        }
    })
    return commentForm
}