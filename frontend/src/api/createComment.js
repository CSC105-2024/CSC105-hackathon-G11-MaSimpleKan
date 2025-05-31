import { axiosInstance } from "../axios";

export const createComment = async (data) => {
    try {
        const res = await axiosInstance.post("/comment/create", data);
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