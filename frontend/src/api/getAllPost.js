import { axiosInstance } from "./../axios";

export const getAllPost = async () => {
  try {
    const res = await axiosInstance.get("/post/getAll");
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
