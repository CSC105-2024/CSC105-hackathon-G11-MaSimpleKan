import {React, useState} from "react";
import Navbar from "./../assets/Navbar.jsx";
import CreatePostPopup from "./../popup/CreatePostPopup";
import PostInformationPopup from "./../popup/PostInformation";

const subjectEnum = ["Math", "Biology", "Physics", "Chemistry", "Computer"];

const allQuestions = [
    {
        id: 1,
        name: "Thomas Shen",
        subject: "Computer",
        question: "what is Hackathon?",
        description:
            "I'm so excited for my hackathon tomorrow what should I do for preparation??",
    },
    {
        id: 2,
        name: "Natalee Chua",
        subject: "Math",
        question: "what is SQL?",
        description:
            "next week I have the exam but i still don't understand about this topic",
    },
    {
        id: 3,
        name: "Thomas Shen",
        subject: "Physics",
        question: "what is velocity?",
        description: "Can someone help me understand velocity in simple terms?",
    },
];

const HomePage = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null); // ✅ filter state

    const questions = selectedSubject
        ? allQuestions.filter((q) => q.subject === selectedSubject)
        : allQuestions;

    return (
        <>
            <Navbar/>
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mb-6">
                    <div
                        onClick={() => setShowCreatePopup(true)}
                        className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-md focus:outline-none cursor-text bg-white text-gray-500"
                    >
                        let’s drop the complex question
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown((prev) => !prev)}
                            className="bg-[#FFAD00] text-white px-4 py-2 rounded-md hover:bg-orange-500 transition whitespace-nowrap"
                        >
                            {selectedSubject || "Subject"} {showDropdown ? "▲" : "▼"}
                        </button>

                        {showDropdown && (
                            <div
                                className="absolute right-0 mt-1 bg-[#FFAD00] text-white rounded-md shadow-md min-w-[120px] z-10">
                                <div
                                    className="px-4 py-2 hover:bg-white hover:text-[#FFAD00] cursor-pointer transition rounded-md"
                                    onClick={() => {
                                        setSelectedSubject(null); // clear filter
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
                    {questions.length === 0 ? (
                        <p className="text-center text-gray-500 col-span-2">No posts found.</p>
                    ) : (
                        questions.map((q) => (
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
                                    <div
                                        className="absolute top-[36px] right-4 bg-[#FFAD00] text-white rounded-md shadow-md w-28 z-10 text-sm">
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
                                    <span>{q.name}</span>
                                    <span className="bg-[#FA812F] text-white px-2 py-0.5 text-xs rounded">
                    {q.subject}
                  </span>
                                </div>
                                <h2 className="text-lg font-semibold">{q.question}</h2>
                                <p className="text-sm text-gray-600">{q.description}</p>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-10 flex justify-center items-center gap-3">
                    <button className="bg-[#FAB12F] text-white w-8 h-8 rounded-full font-semibold">
                        1
                    </button>
                    <button className="text-xl text-[#FA812F] hover:text-[#FA4032]">
                        &gt;
                    </button>
                </div>
            </div>

            {showCreatePopup && (
                <CreatePostPopup onClose={() => setShowCreatePopup(false)}/>
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