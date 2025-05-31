import { axiosInstance } from "../axios";

export const increaseCorrect = async (id) => {
    try {
        const res = await axiosInstance.patch(`/comment/inCorrect?id=${id}` );
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