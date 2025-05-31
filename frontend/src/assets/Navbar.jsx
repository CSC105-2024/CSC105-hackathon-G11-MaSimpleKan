import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setIsLoggingOut(false);
            navigate("/login");
        }, 1500);
    };

    return (
        <>
            {isLoggingOut && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 px-6 py-3 rounded-md shadow text-center font-semibold z-50">
                    🔒 Logging out...
                </div>
            )}

            <header className="bg-[#FFFFFF] text-[#FFAD00] px-6 py-4 flex justify-between items-center">
                <div className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                    <img src="../../public/BookLogo.png" alt="BookLogo" className="w-6 h-6 sm:w-8 sm:h-8" />
                    Ma Simple Kan
                </div>

                {isLoggedIn && (
                    <nav className="hidden md:flex gap-8 text-lg font-medium">
                        <Link to="/home" className="hover:underline">Home</Link>
                        <Link to="/profile" className="hover:underline">Profile</Link>
                    </nav>
                )}

                <div className="flex">
                    {isLoggedIn && (
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="text-2xl focus:outline-none mr-4"
                            >
                                ☰
                            </button>
                        </div>
                    )}
                    <div>
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="bg-[#FFAD00] text-white px-4 text-sm sm:text-base py-2 rounded-md hover:bg-orange-500 transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <button className="bg-[#FFAD00] text-white text-sm sm:text-base font-medium px-4 py-2 rounded-md hover:bg-orange-600 transition">
                                <Link to="/signup">Sign Up</Link>
                            </button>
                        )}
                    </div>
                </div>

                {menuOpen && isLoggedIn && (
                    <div className="absolute top-16 left-4 right-4 bg-white shadow-md rounded-md flex flex-col items-start p-4 md:hidden z-50">
                        <Link to="/home" onClick={() => setMenuOpen(false)} className="py-2 text-[#FFAD00] w-full hover:underline">Home</Link>
                        <Link to="/profile" onClick={() => setMenuOpen(false)} className="py-2 text-[#FFAD00] w-full hover:underline">Profile</Link>
                    </div>
                )}
            </header>
        </>
    );
}

export default Navbar;