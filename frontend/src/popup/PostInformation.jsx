import React, { useState } from "react";

const mockAnswers = [
    {
        name: "Mariya Mamacita",
        content: `SQL is a language we use to talk to databases. A database is like a big box that stores information — for example, a list of students, books, or products. With SQL, you can ask the database to show you certain information, add new data, change something, or delete it. It’s used in websites and apps to help organize and find information quickly and easily.`,
    },
    {
        name: "Doja Fishing",
        content: `SQL is a tool that helps you work with data stored in a database. Think of a database like a digital notebook that stores lots of information. SQL lets you ask questions like “Who are all the students with an A grade?”, add new information, fix mistakes, or remove things you don’t need. It’s used in many websites and apps to help manage data behind the scenes.`,
    },
];

const PostInformationPopup = ({ post, onClose }) => {
    const [comment, setComment] = useState("");

    return (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 z-50 flex items-center justify-center overflow-auto">
            <div className="bg-[#FFF1DC] rounded-xl w-full max-w-3xl p-6 relative shadow-xl max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl text-black hover:text-[#FA812F]"
                >
                    ✕
                </button>

                <div className="mb-4">
                    <div className="text-sm font-semibold">{post.name}</div>
                    <span className="bg-[#FA812F] text-white text-xs px-2 py-0.5 rounded font-medium ml-2">
            {post.subject}
          </span>
                </div>

                <h2 className="text-lg font-bold mb-1">Title</h2>
                <p className="text-[#FA812F] font-semibold mb-4">{post.title}</p>

                <h3 className="font-semibold">Description</h3>
                <p className="text-sm mb-4 text-gray-700">{post.description}</p>

                <hr className="my-4" />

                <div className="mb-6">
                    <label className="block font-semibold mb-1">Comment</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="let’s help them on your simple ways!"
                            className="flex-1 px-4 py-2 rounded-md shadow bg-white"
                        />
                        <button className="bg-[#FFAD00] text-white px-4 py-2 rounded-md hover:bg-orange-500 transition">
                            Submit
                        </button>
                    </div>
                </div>

                {mockAnswers.map((answer, idx) => (
                    <div key={idx} className="mb-6 bg-[#fdf8f1] p-4 rounded">
                        <p className="font-semibold mb-1">{answer.name}</p>
                        <p className="text-sm text-gray-800 mb-3">{answer.content}</p>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm border rounded-md">Correct</button>
                            <button className="px-3 py-1 text-sm border rounded-md">Simple</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostInformationPopup;
