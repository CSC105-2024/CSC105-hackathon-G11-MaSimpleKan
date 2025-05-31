import React, { useState } from "react";
import Navbar from "../assets/Navbar.jsx";

function Profile() {
    const posts = [1, 2, 3, 4];

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <Navbar />

            {/* Content Container */}
            <div className="max-w-6xl mx-auto px-6 py-10">
                {/* Search Bar + Filter */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="let’s drop the complex question"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    <select className="bg-[#FAB12F] text-white px-4 py-2 rounded-md">
                        <option>Subject</option>
                        <option>Math</option>
                        <option>Computer</option>
                    </select>
                </div>

                {/* Post Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((_, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl shadow-md p-6 relative hover:bg-[#FFF1DC] hover:shadow-lg transition"
                        >
                            <div className="absolute top-4 right-4 text-xl text-gray-400 cursor-pointer">
                                ⋯
                            </div>
                            <div className="flex items-center gap-2 text-sm mb-2">
                                <span className="text-gray-600">Natalee Chua</span>
                                <span className="bg-[#FA812F] text-white px-2 py-0.5 text-xs rounded">
                  Math
                </span>
                            </div>
                            <h2 className="font-bold text-lg mb-1">what is SQL?</h2>
                            <p className="text-sm text-gray-700">
                                next week I have the exam but I still don’t understand about this topic
                            </p>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-10 flex justify-center items-center gap-3">
                    <button className="bg-[#FAB12F] text-white w-8 h-8 rounded-full font-semibold">
                        1
                    </button>
                    <button className="text-xl text-[#FA812F] hover:text-[#FA4032]">
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
