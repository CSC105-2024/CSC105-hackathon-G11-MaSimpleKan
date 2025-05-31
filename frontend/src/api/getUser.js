import { axiosInstance } from "./../axios";

export const getUser = async (userId) => {
  try {
    const res = await axiosInstance.get(`/user/get?userId=${userId}`);
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
