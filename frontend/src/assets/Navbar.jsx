import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import { axiosInstance } from "../axios";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loggedIn === "true");
    }, []);

    return (
        <>
            <div className="">
                <div className="flex justify-center max-w-screen p-4 mx-auto">
                    <nav className="flex justify-between items-center w-full md:w-full px-[16px]">
                        <div className="flex items-center gap-2">
                            <Logo />
                        </div>

                        <div className="hidden md:flex gap-16 text-[18px]">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    isActive
                                        ? "border-b-2 border-primaryO text-primaryO font-semibold pb-1"
                                        : "hover:text-primaryO hover:border-b-2 hover:border-primaryO pb-1"
                                }
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/pets"
                                className={({ isActive }) =>
                                    isActive
                                        ? "border-b-2 border-primaryO text-primaryO font-semibold pb-1"
                                        : "hover:text-primaryO hover:border-b-2 hover:border-primaryO pb-1"
                                }
                            >
                                Pets
                            </NavLink>

                            <NavLink
                                to="/donation"
                                className={({ isActive }) =>
                                    isActive
                                        ? "border-b-2 border-primaryO text-primaryO font-semibold pb-1"
                                        : "hover:text-primaryO hover:border-b-2 hover:border-primaryO pb-1"
                                }
                            >
                                Donation
                            </NavLink>

                            <NavLink
                                to="/aboutus"
                                className={({ isActive }) =>
                                    isActive
                                        ? "border-b-2 border-primaryO text-primaryO font-semibold pb-1"
                                        : "hover:text-primaryO hover:border-b-2 hover:border-primaryO pb-1"
                                }
                            >
                                About Us
                            </NavLink>
                        </div>

                        {/* Sign Up Button (Desktop) */}
                        <div className="hidden md:block relative">
                            {isLoggedIn ? (
                                <>
                                    <button
                                        className="flex items-center gap-2 px-2 py-2
                    text-white rounded-full border-1 border-primaryO"
                                        onClick={() => setIsProfileOpen((prev) => !prev)}
                                    >
                                        <img
                                            src="public\images\ProfileIcon.png"
                                            alt=""
                                            className="w-[25px] h-[25px]"
                                        />
                                    </button>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md z-50">
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 hover:bg-gray-100"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                Your Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    localStorage.removeItem("isLoggedIn");
                                                    setIsLoggedIn(false);
                                                    setIsProfileOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <button
                                    className="px-6 py-1 h-[32px] min-w-[110px] bg-primaryO text-white rounded-[8px]
        hover:bg-white hover:text-primaryO hover:border hover:border-primaryO"
                                    onClick={async(e) => {
                                        e.preventDefault();
                                        // const res = await axiosInstance.get("/user/get?id=3");
                                        // console.log(res.data);
                                    }}
                                >
                                    <Link to="/signup">Sign Up</Link>
                                    {/* Sign Up */}
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Icon */}
                        <div className="md:hidden flex items-center gap-4">
                            <button onClick={() => setIsOpen(!isOpen)}>
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                            <div className="relative">
                                <button
                                    className="flex items-center gap-2 px-1 py-1
                    text-white rounded-full border-1 border-primaryO"
                                    onClick={() => setIsProfileOpen((prev) => !prev)}
                                >
                                    <img
                                        src="public\images\ProfileIcon.png"
                                        alt=""
                                        className="w-[20px] h-[20x]"
                                    />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md z-50">
                                        {!isLoggedIn ? (
                                            <Link
                                                to="/signup"
                                                className="block px-4 py-2 hover:bg-gray-100"
                                                onClick={() => {
                                                    setIsProfileOpen(false);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                Sign Up
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    to="/profile"
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                    onClick={() => {
                                                        setIsProfileOpen(false);
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    Your Profile
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        localStorage.removeItem("isLoggedIn");
                                                        setIsLoggedIn(false);
                                                        setIsProfileOpen(false);
                                                        setIsOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div
                        className="md:hidden absolute top-[70px] right-4 left-4 bg-white
          shadow-lg rounded-xl px-6 py-6 z-50 transition-all duration-300
          space-y-4 text-[18px] flex flex-col items-start"
                    >
                        <NavLink
                            to="/"
                            end
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-primaryO font-semibold w-full"
                                    : "hover:text-primaryO w-full"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/pets"
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-primaryO font-semibold w-full"
                                    : "hover:text-primaryO w-full"
                            }
                        >
                            Pets
                        </NavLink>
                        <NavLink
                            to="/donation"
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-primaryO font-semibold w-full"
                                    : "hover:text-primaryO w-full"
                            }
                        >
                            Donation
                        </NavLink>
                        <NavLink
                            to="/aboutus"
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-primaryO font-semibold w-full"
                                    : "hover:text-primaryO w-full"
                            }
                        >
                            About Us
                        </NavLink>
                    </div>
                )}
            </div>

            <Outlet />
        </>
    );
}