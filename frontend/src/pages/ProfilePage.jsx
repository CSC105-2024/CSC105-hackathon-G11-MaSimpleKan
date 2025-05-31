import React, { useState, useEffect, useRef } from "react";
import Navbar from "../assets/Navbar.jsx";
import EditPopup from "../popup/EditPopup";
import DeletePopup from "../popup/DeletePopup";
import "../index.css";

function Profile() {
    const posts = [
        {
            id: 1,
            author: "Natalee Chua",
            subject: "Math",
            title: "what is SQL?",
            description:
                "next week I have the exam but I still don’t understand about this topic. Can anyone help me? if you have any resources or tips, please share! I would really appreciate it.",
        },
        {
            id: 2,
            author: "Natalee Chua",
            subject: "Computer",
            title: "what is a hook in React?",
            description:
                "I keep hearing about useEffect and useState but don’t get it.",
        },
        {
            id: 3,
            author: "Natalee Chua",
            subject: "Math",
            title: "why is integration so hard?",
            description:
                "Trying to understand how to set limits for double integrals.",
        },
        {
            id: 4,
            author: "Natalee Chua",
            subject: "Computer",
            title: "What’s the difference between let and const?",
            description: "Still confused even after reading docs many times!",
        },
    ];
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const cardRefs = useRef([]);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [indexToDelete, setIndexToDelete] = useState(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                openMenuIndex !== null &&
                cardRefs.current[openMenuIndex] &&
                !cardRefs.current[openMenuIndex].contains(event.target)
            ) {
                setOpenMenuIndex(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openMenuIndex]);

    return (

        <div className="min-h-screen bg-[#F5F5F5]">
            <Navbar />
            <div className="max-w-6xl mx-auto px-6 py-10">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post, i) => (
                        <div
                            key={post.id}
                            ref={(el) => (cardRefs.current[i] = el)}
                            className="bg-white rounded-xl shadow-md p-6 py-10 relative hover:bg-[#FFF1DC] hover:shadow-lg transition min-h-[200px]"
                        >
                            <div
                                className="absolute top-4 right-4 text-xl text-gray-500 cursor-pointer"
                                onClick={() => setOpenMenuIndex(openMenuIndex === i ? null : i)}
                            >
                                ⋯
                            </div>

                            {openMenuIndex === i && (
                                <div className="absolute top-10 right-1 bg-[#FAB12F] text-white rounded-md shadow-md flex flex-col items-center text-sm z-10 overflow-hidden">
                                    <button
                                        className="px-4 py-2 w-full text-center hover:bg-white hover:text-[#FA812F] transition"
                                        onClick={() => {
                                            setSelectedItem({ ...post, index: i });
                                            setShowEdit(true);
                                            setOpenMenuIndex(null);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-4 py-2 w-full text-center hover:bg-white hover:text-[#FA812F] transition"
                                        onClick={() => {
                                            setIndexToDelete(i);
                                            setShowConfirm(true);
                                            setOpenMenuIndex(null);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}

                            <div className="flex items-center gap-2 text-sm mb-2">
                                <span className="text-gray-600">{post.author}</span>
                                <span className="bg-[#FA812F] text-white px-2 py-0.5 text-xs rounded">
                                    {post.subject}
                                </span>
                            </div>
                            <h2 className="font-bold text-lg mb-1">{post.title}</h2>
                            <p className="text-sm text-gray-700 truncate-2-lines">
                                {post.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex justify-center items-center gap-3">
                    <button className="bg-[#FAB12F] text-white w-8 h-8 rounded-full font-semibold">
                        1
                    </button>
                    <button className="text-xl text-[#FA812F] hover:text-[#FA4032]">
                        &gt;
                    </button>
                </div>

                <EditPopup
                    trigger={showEdit}
                    item={selectedItem}
                    onCancel={() => setShowEdit(false)}
                    onSave={(updatedItem) => {
                        // update logic here
                        setShowEdit(false);
                    }}
                />

                <DeletePopup
                    trigger={showConfirm}
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={() => {
                        // delete logic here
                        setShowConfirm(false);
                    }}
                />
            </div>
        </div>
    );
}

export default Profile;
