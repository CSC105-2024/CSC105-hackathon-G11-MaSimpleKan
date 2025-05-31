import type { $Enums } from "../generated/prisma/index.js";
import { db } from "../index.ts";

export const modifyVote = async (
  id: String | undefined | null,
  commentId: number,
  userId: number,
  voteType: $Enums.VoteType
) => {
  if (!id) {
    await db.votes.create({
      data: {
        commentId,
        userId,
        voteType,
      },
    });
  } else if (typeof id === "string") {
    await db.votes.delete({
      where: {
        id,
      },
    });
  }
  return null;
};
