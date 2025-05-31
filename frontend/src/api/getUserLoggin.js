import { axiosInstance } from "./../axios";

export const getUserLoggedIn = async () => {
  try {
    const res = await axiosInstance.get(`/user/getLoggedIn`);
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
