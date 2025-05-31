import type { $Enums } from "../generated/prisma/index.js";
import { db } from "../index.ts";

export const createPost = async (
  title: string,
  description: string,
  subject: $Enums.Subject,
  userId: number
) => {
  console.log("📥 Received:", { title, description, subject, userId });
  const postForm = db.post.create({
    data: {
      title,
      description,
      subject,
      userId: Number(userId),
    },
  });
  return postForm;
};

export const editPost = async (
  id: number,
  title: string,
  description: string,
  subject: $Enums.Subject
) => {
  const postForm = db.post.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      subject,
    },
  });
  return postForm;
};

export const deletePost = async (id: number) => {
  const postForm = db.post.delete({
    where: {
      id,
    },
  });
  return postForm;
};

export const getPost = async (id: number) => {
  const postForm = db.post.findUnique({
    where: {
      id,
    },
  });
  return postForm;
};

export const getAllPost = async () => {
  const postForm = db.post.findMany({
    orderBy: [
      {
        date: "desc",
      },
    ],
  });
  return postForm;
};

export const getAllPostFromUser = async (userId: number) => {
  const postForm = db.post.findMany({
    where: {
      userId,
    },
    orderBy: [
      {
        date: "desc",
      },
    ],
  });
  return postForm;
};
