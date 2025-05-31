import { axiosInstance } from "../axios";

export const decreaseCorrect = async (id) => {
    try {
        const res = await axiosInstance.delete(`/comment/deCorrect?id=${id}` );
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