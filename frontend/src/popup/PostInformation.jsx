import React, { useState, useEffect } from "react";
import { getUser } from "../api/getUser";
import { getAllCommentFromPost } from "../api/getAllCommentFromPost";
import { z } from "zod";
import { createComment } from "../api/createComment";
import { increaseCorrect } from "../api/increaseCorrect";
import { decreaseCorrect } from "../api/decreaseCorrect";
import { increaseSimple } from './../api/increaseSimple';
import { decreaseSimple } from './../api/decreaseSimple';

const commentSchema = z.object({
  text: z.string().trim().min(1, { message: "Comment cannot be empty." }),
});

const PostInformationPopup = ({ post, onClose }) => {
  const [text, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userVotes, setUserVotes] = useState({
    // commentId: { correct: boolean, simple: boolean }
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      if (!post?.userId) return;
      const data = await getUser(post.userId);
      setUser(data.data);
    };
    getUserData();
  }, [post?.userId]);

  useEffect(() => {
    const getComments = async () => {
      if (!post?.id) {
        setLoading(false);
        return;
      }
      const data = await getAllCommentFromPost(post.id);
      setComments(data.data);
      setLoading(false);
    };
    getComments();
  }, [post?.id]);

  const handleSubmit = async () => {
    const result = commentSchema.safeParse({ text });
    if (!result.success) {
      setError(result.error.format().text?._errors[0] || "Invalid text");
      setSuccess(false);
      return;
    }

    const realFormData = new FormData();
    realFormData.append(
      "json",
      JSON.stringify({
        text: result.data.text,
        postId: post.id,
      })
    );

    console.log(result.data.text);

    const res = await createComment(realFormData);
    if (res.success) {
      location.reload();
    } else {
      alert("Error creating a pet! Try Again!");
    }
  };

  // const handleCorrectToggle = async (commentId) => {
  //   try {
  //     if (
  //       comment.Votes.filter((vote) => vote.userId === user.id && vote.type === "Correct").length === 0

  //       // comments?.filter((commentItem) => commentItem.id === commentId)[0]?.Votes.filter((vote) => vote.userId === user.id).length === 0
  //     ) {
  //       await increaseCorrect(commentId);
  //       console.log("Increment");
  //     } else {
  //       await decreaseCorrect(commentId);
  //       console.log("Decrement")
  //     }
  //     location.reload();

  //     // const isCurrentlyClicked = userVotes[commentId]?.correct || false;

  //     // setUserVotes((prev) => ({
  //     //   ...prev,
  //     //   [commentId]: {
  //     //     ...prev[commentId],
  //     //     correct: !isCurrentlyClicked,
  //     //   },
  //     // }));

  //     // setComments((prev) =>
  //     //   prev.map((c) =>
  //     //     c.id === commentId
  //     //       ? {
  //     //           ...c,
  //     //           correctCount: isCurrentlyClicked
  //     //             ? Math.max(0, c.correctCount - 1)
  //     //             : c.correctCount + 1,
  //     //         }
  //     //       : c
  //     //   )
  //     // );
  //   } catch (error) {
  //     console.error("Error toggling correct:", error);
  //   }
  // };

  // const handleSimpleToggle = async (commentId) => {
  //   try {
  //     if (
  //       comments?.filter((commentItem) => commentItem.id === commentId)[0]?.Votes.filter((vote) => vote.userId === user.id).length === 0
  //     ) {
  //       await increaseSimple(commentId);
  //       console.log("Increment");
  //     } else {
  //       await decreaseSimple(commentId);
  //       console.log("Decrement")
  //     }
  //     location.reload();
  //     // await new Promise((resolve) => setTimeout(resolve, 100));

  //     // const isCurrentlyClicked = userVotes[commentId]?.simple || false;

  //     // setUserVotes((prev) => ({
  //     //   ...prev,
  //     //   [commentId]: {
  //     //     ...prev[commentId],
  //     //     simple: !isCurrentlyClicked,
  //     //   },
  //     // }));

  //     // setComments((prev) =>
  //     //   prev.map((c) =>
  //     //     c.id === commentId
  //     //       ? {
  //     //           ...c,
  //     //           simpleCount: isCurrentlyClicked
  //     //             ? Math.max(0, c.simpleCount - 1)
  //     //             : c.simpleCount + 1,
  //     //         }
  //     //       : c
  //     //   )
  //     // );
  //   } catch (error) {
  //     console.error("Error toggling simple:", error);
  //   }
  // };
const handleCorrectToggle = async (commentId) => {
  try {
    const updatedComments = comments.map((comment) => {
      if (comment.id !== commentId) return comment;

      const existingVote = comment.Votes.find(
        (vote) => vote.userId === user.id && vote.type === "Correct"
      );

      if (!existingVote) {
        // User hasn't voted "Correct" yet → Increase
        increaseCorrect(commentId);
        return {
          ...comment,
          correctCount: comment.correctCount + 1,
          Votes: [...comment.Votes, { userId: user.id, type: "Correct" }],
        };
      } else {
        // User already voted "Correct" → Decrease
        decreaseCorrect(commentId);
        return {
          ...comment,
          correctCount: Math.max(0, comment.correctCount - 1),
          Votes: comment.Votes.filter(
            (vote) => !(vote.userId === user.id && vote.type === "Correct")
          ),
        };
      }
    });

    setComments(updatedComments);
  } catch (error) {
    console.error("Error toggling correct:", error);
  }
};

const handleSimpleToggle = async (commentId) => {
  try {
    const updatedComments = comments.map((comment) => {
      if (comment.id !== commentId) return comment;

      const existingVote = comment.Votes.find(
        (vote) => vote.userId === user.id && vote.type === "Simple"
      );

      if (!existingVote) {
        // User hasn't voted "Simple" yet → Increase
        increaseSimple(commentId);
        return {
          ...comment,
          simpleCount: comment.simpleCount + 1,
          Votes: [...comment.Votes, { userId: user.id, type: "Simple" }],
        };
      } else {
        // User already voted "Simple" → Decrease
        decreaseSimple(commentId);
        return {
          ...comment,
          simpleCount: Math.max(0, comment.simpleCount - 1),
          Votes: comment.Votes.filter(
            (vote) => !(vote.userId === user.id && vote.type === "Simple")
          ),
        };
      }
    });

    setComments(updatedComments);
  } catch (error) {
    console.error("Error toggling simple:", error);
  }
};

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 z-50 flex items-center justify-center overflow-auto">
      <div className="bg-[#FFF1DC] rounded-xl w-full max-w-3xl p-6 relative shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-black hover:text-[#FA812F]"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="text-sm font-semibold">
            {user?.fName} {user?.sName}
          </div>
          <span className="bg-[#FA812F] text-white text-xs px-2 py-0.5 rounded font-medium">
            {post.subject}
          </span>
        </div>

        <h2 className="text-lg font-bold mb-1">Title</h2>
        <h3 className="text-[#FFAD00] font-medium text-lg mb-4">
          {post.title || "No title provided"}
        </h3>

        <h3 className="font-semibold">Description</h3>
        <p className="text-sm mb-4 text-[#FFAD00]">{post.description}</p>

        <hr className="my-4" />

        <div className="mb-6">
          <label className="block font-semibold mb-1">Comment</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setComment(e.target.value)}
              placeholder="let's help them on your simple ways!"
              className="flex-1 px-4 py-2 rounded-md shadow bg-white"
            />
            <button
              onClick={handleSubmit}
              className="bg-[#FFAD00] text-white px-4 py-2 rounded-md hover:bg-orange-500 transition"
            >
              Submit
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          {success && (
            <div className="mt-2 flex items-center gap-2 bg-green-100 border border-green-500 text-green-700 text-sm px-4 py-2 rounded-md">
              ✅ Comment succeed
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-4">Loading comments...</div>
        ) : (
          <>
            {comments.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No comments yet
              </div>
            ) : (
              comments.map((commentItem) => (
                <div
                  key={commentItem.id}
                  className="mb-6 bg-[#fdf8f1] p-4 rounded"
                >
                  <p className="font-semibold mb-1">
                    User {commentItem.userId}
                  </p>
                  <p className="text-sm text-gray-800 mb-3">
                    {commentItem.text}
                  </p>
                  <div className="flex gap-2 items-center">
                    {commentItem?.Votes?.filter(
                      (vote) => user.id === vote.userId
                    ).length !== 0 ? (
                      <button
                        onClick={() =>
                          handleCorrectToggle(
                            commentItem.id,
                            commentItem.correctCount,
                            false
                          )
                        }
                        className="px-3 py-1 text-sm font-semibold rounded-md border bg-green-500 text-white border-black hover:bg-green-700 transition-all"
                      >
                        Correct ({commentItem.correctCount || 0})
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleCorrectToggle(
                            commentItem.id,
                            commentItem.correctCount,
                            false
                          )
                        }
                        className="px-3 py-1 text-sm font-semibold rounded-md border bg-[#FFF1DC] text-black border-black hover:bg-green-500 hover:text-white transition-all"
                      >
                        Correct ({commentItem.correctCount || 0})
                      </button>
                    )}


                    {commentItem?.Votes?.filter(
                      (vote) => user.id === vote.userId
                    ).length !== 0 ? (
                      <button
                        onClick={() =>
                          handleSimpleToggle(
                            commentItem.id,
                            commentItem.simpleCount,
                            false
                          )
                        }
                        className="px-3 py-1 text-sm font-semibold rounded-md border bg-orange-500 text-white border-black hover:bg-orange-700 transition-all"
                      >
                        Simple ({commentItem.simpleCount || 0})
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleSimpleToggle(
                            commentItem.id,
                            commentItem.simpleCount,
                            false
                          )
                        }
                        className="px-3 py-1 text-sm font-semibold rounded-md border bg-[#FFF1DC] text-black border-black hover:bg-orange-500 hover:text-white transition-all"
                      >
                        Simple ({commentItem.simpleCount || 0})
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostInformationPopup;
