import { db } from "../index.ts";

const createUser = async (
  email: string,
  password: string,
  fName: string,
  sName: string,
  tel: string
) => {
  const user = await db.user.create({
    data: {
      email,
      password,
      fName,
      sName,
      tel,
    },
  });
  return user;
};

const getUser = async (id: number) => {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

const getUserComment = async (postId: number) => {
  const comments = await db.comment.findMany({
    where: { postId },
    include: {
      Votes: true,
      User: true,
    },
  });
  return comments;
};

const getLoginUser = async (email: string, password: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
      password,
    },
  });
  return user;
};

const getUserLoggedIn = async (id: number) => {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
};

export { createUser, getUser, getUserComment, getLoginUser, getUserLoggedIn };
