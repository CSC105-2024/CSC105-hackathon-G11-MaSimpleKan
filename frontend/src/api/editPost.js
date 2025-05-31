import { axiosInstance } from "../axios";

export const editPost = async (id, formData) => {
    try {
        const res = await axiosInstance.patchForm(`/post/edit?id=${id}`, formData);
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