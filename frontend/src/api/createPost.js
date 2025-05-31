import { axiosInstance } from "../axios";

export const createPost = async (data) => {
    try {
        const res = await axiosInstance.post("/post/create", data);
        return {
            success: true,
            data: res.data,
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            data: null,
        }
    }
}