import { axiosInstance } from "./../axios";

export const getCommentUser = async (postId) => {
  try {
    const res = await axiosInstance.get(`/comment/post/${postId}`);
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
