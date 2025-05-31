import React, { useState, useEffect, useRef } from "react";
import Navbar from "../assets/Navbar.jsx";
import EditPopup from "../popup/EditPopup";
import DeletePopup from "../popup/DeletePopup";
import "../index.css";

function Profile() {
    const [postsData, setPostsData] = useState([
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
        {
            id: 5,
            author: "Natalee Chua",
            subject: "Biology",
            title: "What is DNA replication?",
            description: "I want a simplified explanation, please!",
        },
        {
            id: 6,
            author: "Natalee Chua",
            subject: "Physics",
            title: "What is Newton's 3rd Law?",
            description: "I always forget this one... help!",
        },
        {
            id: 7,
            author: "Natalee Chua",
            subject: "Chemistry",
            title: "What is an ionic bond?",
            description: "Need examples that are easy to remember.",
        },
        {
            id: 8,
            author: "Natalee Chua",
            subject: "Math",
            title: "How do I factor equations?",
            description: "Help me understand factoring with tricks.",
        },
        {
            id: 9,
            author: "Natalee Chua",
            subject: "Computer",
            title: "What's a closure in JS?",
            description: "I hear about closures but don’t know what they are.",
        },
    ]);

    const subjectEnum = ["Math", "Biology", "Physics", "Chemistry", "Computer"];
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const cardRefs = useRef([]);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [indexToDelete, setIndexToDelete] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

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

    const filteredPosts = selectedSubject
        ? postsData.filter((post) => post.subject === selectedSubject)
        : postsData;

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const currentPosts = filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

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
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown((prev) => !prev)}
                            className="bg-[#FFAD00] text-white px-4 py-2 rounded-md hover:bg-orange-500 transition whitespace-nowrap"
                        >
                            {selectedSubject || "Subject"} {showDropdown ? "▲" : "▼"}
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-1 bg-[#FFAD00] text-white rounded-md shadow-md min-w-[120px] z-10">
                                <div
                                    className="px-4 py-2 hover:bg-white hover:text-[#FFAD00] cursor-pointer transition rounded-md"
                                    onClick={() => {
                                        setSelectedSubject(null);
                                        setShowDropdown(false);
                                    }}
                                >
                                    All
                                </div>
                                {subjectEnum.map((subject) => (
                                    <div
                                        key={subject}
                                        className="px-4 py-2 hover:bg-white hover:text-[#FFAD00] cursor-pointer transition rounded-md"
                                        onClick={() => {
                                            setSelectedSubject(subject);
                                            setShowDropdown(false);
                                        }}
                                    >
                                        {subject}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentPosts.map((post, i) => (
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
                        {currentPage}
                    </button>
                    {currentPage < totalPages && (
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="text-xl text-[#FA812F] hover:text-[#FA4032]"
                        >
                            &gt;
                        </button>
                    )}
                </div>

                <EditPopup
                    trigger={showEdit}
                    item={selectedItem}
                    onCancel={() => setShowEdit(false)}
                    onSave={(updatedItem) => {
                        setPostsData((prev) => {
                            const newData = [...prev];
                            newData[updatedItem.index] = updatedItem;
                            return newData;
                        });
                        setShowEdit(false);
                    }}
                />

                <DeletePopup
                    trigger={showConfirm}
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={() => {
                        setPostsData((prev) => {
                            const newData = [...prev];
                            newData.splice(indexToDelete, 1);
                            return newData;
                        });
                        setShowConfirm(false);
                    }}
                />
            </div>
        </div>
    );
}

export default Profile;