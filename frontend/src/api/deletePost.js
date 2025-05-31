import { axiosInstance } from "../axios";

export const deletePost = async (id) => {
    try {
        const res = await axiosInstance.delete(`/post/delete?id=${id}`);
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