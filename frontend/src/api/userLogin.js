import { axiosInstance } from "../axios";

export const userLogin = async (data) => {
    try {
        const res = await axiosInstance.post("/user/login", data);
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