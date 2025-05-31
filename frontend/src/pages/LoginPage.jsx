import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TabSwitcher from "../pages/TabSwitcher";
import BookLogo from "../../public/BookLogo.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { userLogin } from './../api/userLogin';

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
    useEffect(() => {
        document.title = "Login";
    }, []);

    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        const res = await userLogin(data);
        if (res.success) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userId", (res.data.data));
            console.log(localStorage.getItem("userId"))
            setLoginSuccess(true);
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } else {
            alert("Error loggin in. Try again!");
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-gray-200 px-4 sm:px-6">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 md:p-10">
                <div className="flex items-center justify-center space-x-2 mb-6">
                    <img src={BookLogo} alt="Book Logo" className="w-8 h-8" />
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#FFAD00]">
                        Ma Simple Kan
                    </h1>
                </div>

                <TabSwitcher />

                {loginSuccess && (
                    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 px-6 py-3 rounded-md shadow text-center font-semibold z-50">
                        🎉 Login success!
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <div>
                        <label className="text-sm font-semibold text-black">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="masimplekan@gmail.com"
                            className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 text-[#FFAD00] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.email && (
                            <p className="text-[#FFAD00] text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-black">Password</label>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="***********"
                            className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 text-[#FFAD00] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        {errors.password && (
                            <p className="text-[#FFAD00] text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-[#FFAD00] hover:bg-orange-600 transition text-white font-semibold py-3 rounded-md text-lg shadow-sm"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;