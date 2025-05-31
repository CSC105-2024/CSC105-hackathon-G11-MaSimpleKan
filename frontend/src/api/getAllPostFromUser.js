import { axiosInstance } from "./../axios";

export const getAllPostFromUser = async () => {
  try {
    const res = await axiosInstance.get("/user/posts");
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
