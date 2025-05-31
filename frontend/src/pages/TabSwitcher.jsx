import { useLocation, useNavigate } from "react-router-dom";
import React from "react";

const TabSwitcher = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSignUp = location.pathname === "/signup";

    return (
        <div className="flex justify-between items-center mb-6 text-lg font-medium">
            <button
                className={`w-1/2 py-2 rounded-md ${
                    isSignUp ? "bg-[#FFAD00] text-white" : "text-black hover:text-[#FFAD00]"
                }`}
                onClick={() => navigate("/signup")}
            >
                Sign Up
            </button>
            <button
                className={`w-1/2 py-2 rounded-md ${
                    !isSignUp ? "bg-[#FFAD00] text-white" : "text-black hover:text-[#FFAD00]"
                }`}
                onClick={() => navigate("/login")}
            >
                Sign In
            </button>
        </div>
    );
};

export default TabSwitcher;