import React, { useEffect, useState } from "react";
import Navbar from "./../assets/Navbar.jsx";
import CreatePostPopup from "./../popup/CreatePostPopup";
import PostInformationPopup from "./../popup/PostInformation";

const subjectEnum = ["Math", "Biology", "Physics", "Chemistry", "Computer"];

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setPosts([
            {
                id: 1,
                name: "Thomas Shen",
                author: "Thomas Shen",
                subject: "Computer",
                title: "what is Hackathon?",
                description:
                    "I'm so excited for my hackathon tomorrow what should I do for preparation??",
            },
            {
                id: 2,
                name: "Natalee Chua",
                author: "Natalee Chua",
                subject: "Math",
                title: "what is SQL?",
                description:
                    "next week I have the exam but i still don't understand about this topic",
            },
            {
                id: 3,
                name: "Thomas Shen",
                author: "Thomas Shen",
                subject: "Physics",
                title: "what is velocity?",
                description: "Can someone help me understand velocity in simple terms?",
            },
            { id: 4, name: "A", author: "A", subject: "Biology", title: "Q1", description: "D1" },
            { id: 5, name: "B", author: "B", subject: "Math", title: "Q2", description: "D2" },
            { id: 6, name: "C", author: "C", subject: "Physics", title: "Q3", description: "D3" },
            { id: 7, name: "D", author: "D", subject: "Chemistry", title: "Q4", description: "D4" },
            { id: 8, name: "E", author: "E", subject: "Math", title: "Q5", description: "D5" },
            { id: 9, name: "F", author: "F", subject: "Computer", title: "Q6", description: "D6" },
        ]);
    }, []);

    const itemsPerPage = 8;

    const filteredQuestions = selectedSubject
        ? posts.filter((q) => q.subject === selectedSubject)
        : posts;

    const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

    const currentItems = filteredQuestions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mb-6">
                    <div
                        onClick={() => setShowCreatePopup(true)}
                        className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-md focus:outline-none cursor-text bg-white text-gray-500"
                    >
                        let's drop the complex question
                    </div>

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
                                        setCurrentPage(1);
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
                                            setCurrentPage(1);
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
                    {currentItems.length === 0 ? (
                        <p className="text-center text-gray-500 col-span-2">No posts found.</p>
                    ) : (
                        currentItems.map((q) => (
                            <div
                                key={q.id}
                                className="bg-white rounded-xl shadow-md p-6 relative hover:bg-[#FFF1DC] hover:shadow-lg transition cursor-pointer"
                                onClick={() => setSelectedPost(q)}
                            >
                                <div
                                    className="absolute top-4 right-4 text-xl text-gray-400 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenuId(openMenuId === q.id ? null : q.id);
                                    }}
                                >
                                    ⋯
                                </div>

                                {openMenuId === q.id && (
                                    <div className="absolute top-[36px] right-4 bg-[#FFAD00] text-white rounded-md shadow-md w-28 z-10 text-sm">
                                        <div
                                            className="px-4 py-2 hover:bg-white hover:text-[#FFAD00] cursor-pointer transition rounded-md"
                                            onClick={() => {
                                                setOpenMenuId(null);
                                                console.log("Edit", q.id);
                                            }}
                                        >
                                            Edit
                                        </div>
                                        <div
                                            className="px-4 py-2 hover:bg-white hover:text-[#FFAD00] cursor-pointer transition rounded-md"
                                            onClick={() => {
                                                setOpenMenuId(null);
                                                console.log("Delete", q.id);
                                            }}
                                        >
                                            Delete
                                        </div>
                                    </div>
                                )}

                                <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                                    <span>{q.author}</span>
                                    <span className="bg-[#FA812F] text-white px-2 py-0.5 text-xs rounded">
                                        {q.subject}
                                    </span>
                                </div>
                                <h2 className="text-lg font-semibold">{q.title}</h2>
                                <p className="text-sm text-gray-600">{q.description}</p>
                            </div>
                        ))
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="mt-10 flex justify-center items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-8 h-8 rounded-full font-semibold ${
                                    currentPage === i + 1
                                        ? "bg-[#FAB12F] text-white"
                                        : "bg-gray-200 text-[#FA812F] hover:bg-[#FFDD99]"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {showCreatePopup && (
                <CreatePostPopup
                    onClose={() => setShowCreatePopup(false)}
                    onCreate={(newPost) => {
                        setPosts((prev) => [{ ...newPost, id: prev.length + 1 }, ...prev]);
                    }}
                />
            )}

            {selectedPost && (
                <PostInformationPopup
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                />
            )}
        </>
    );
};

export default HomePage;