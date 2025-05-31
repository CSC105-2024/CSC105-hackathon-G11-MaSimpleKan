import { axiosInstance } from "./../axios";

export const getAllCommentFromPost = async (postId) => {
  try {
    const res = await axiosInstance.get(`/post/comments?postId=${postId}`);
    console.log(res)
    // console.log(res);
    return {
      success: true,
      data: res.data,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      data: null,
    };
  }
};
