import { React, useState } from "react";
import Navbar from "./../assets/Navbar.jsx";

const questions = [
    {
        id: 1,
        name: "Thomas Shen",
        subject: "Computer",
        question: "what is Hackathon?",
        description: "I'm so excited for my hackathon tomorrow what should I do for preparation??",
    },
    {
        id: 2,
        name: "Natalee Chua",
        subject: "Math",
        question: "what is SQL?",
        description: "next week I have the exam but i still don't understand about this topic",
    },
    {
        id: 3,
        name: "Natalee Chua",
        subject: "Math",
        question: "what is SQL?",
        description: "next week I have the exam but i still don't understand about this topic",
    },
    {
        id: 4,
        name: "Thomas Shen",
        subject: "Computer",
        question: "what is Hackathon?",
        description: "I'm so excited for my hackathon tomorrow what should I do for preparation??",
    },
];

const subjects = ["Math", "Biology", "Physics", "Chemistry", "Computer"];

const HomePage = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="relative flex gap-4 items-center mb-10">
                    <input
                        type="text"
                        placeholder="let’s drop the complex question"
                        className="flex-1 border px-4 py-2 rounded-[5px] shadow-sm"
                    />
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown((prev) => !prev)}
                            className="bg-[#FFAD00] text-white px-4 py-2 rounded-md hover:bg-orange-500 transition"
                        >
                            Subject {showDropdown ? "▲" : "▼"}
                        </button>
                        {showDropdown && (
                            <div className="absolute mt-1 bg-[#FFAD00] text-white rounded-md shadow-md w-full z-10">
                                {subjects.map((subject) => (
                                    <div
                                        key={subject}
                                        className="px-4 py-2 hover:bg-orange-500 cursor-pointer"
                                        onClick={() => {
                                            setShowDropdown(false);
                                            console.log("Selected subject:", subject);
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
                    {questions.map((q) => (
                        <div key={q.id} className="bg-white shadow-md rounded-lg p-4 space-y-2">
                            <div className="text-sm text-gray-700 flex justify-between">
                                <span>{q.name}</span>
                                <span className="bg-[#FFAD00] text-white px-2 py-0.5 rounded text-xs">
                  {q.subject}
                </span>
                            </div>
                            <h2 className="text-lg font-semibold">{q.question}</h2>
                            <p className="text-sm text-gray-600">{q.description}</p>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-10">
                    <div className="flex gap-2 items-center">
                        <button className="w-6 h-6 rounded-full bg-[#FFAD00] text-white text-sm">
                            1
                        </button>
                        <span className="text-xl">{">"}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;