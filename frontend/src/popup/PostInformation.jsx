import React, { useState } from "react";
import { z } from "zod";

const commentSchema = z.object({
    comment: z.string().trim().min(1, { message: "Comment cannot be empty." }),
});

const mockAnswers = [
    {
        name: "Mariya Mamacita",
        content: `SQL is a language we use to talk to databases...`,
    },
    {
        name: "Doja Fishing",
        content: `SQL is a tool that helps you work with data stored in a database...`,
    },
];

const PostInformationPopup = ({ post, onClose }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]); // เก็บคอมเมนต์ที่ผู้ใช้เพิ่ม
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [clickedCorrects, setClickedCorrects] = useState(Array(mockAnswers.length).fill(false));
    const [clickedSimples, setClickedSimples] = useState(Array(mockAnswers.length).fill(false));

    const toggleCorrect = (index) => {
        const updated = [...clickedCorrects];
        updated[index] = !updated[index];
        setClickedCorrects(updated);
    };

    const toggleSimple = (index) => {
        const updated = [...clickedSimples];
        updated[index] = !updated[index];
        setClickedSimples(updated);
    };

    const handleSubmit = () => {
        const result = commentSchema.safeParse({ comment });
        if (!result.success) {
            setError(result.error.format().comment?._errors[0] || "Invalid comment");
            setSuccess(false);
        } else {
            setError("");
            setSuccess(true);
            setComments((prev) => [...prev, { name: "You", content: comment }]);
            setComment("");
            setTimeout(() => setSuccess(false), 3000);
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 z-50 flex items-center justify-center overflow-auto">
            <div className="bg-[#FFF1DC] rounded-xl w-full max-w-3xl p-6 relative shadow-xl max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl text-black hover:text-[#FA812F]"
                >
                    ✕
                </button>

                <div className="flex items-center gap-2 mb-4">
                    <div className="text-sm font-semibold">{post.name}</div>
                    <span className="bg-[#FA812F] text-white text-xs px-2 py-0.5 rounded font-medium">
            {post.subject}
          </span>
                </div>

                <h2 className="text-lg font-bold mb-1">Title</h2>
                <h3 className="text-[#FFAD00] font-medium text-lg mb-4">
                    {post.title || "No title provided"}
                </h3>

                <h3 className="font-semibold">Description</h3>
                <p className="text-sm mb-4 text-[#FFAD00]">{post.description}</p>

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
                        <button
                            onClick={handleSubmit}
                            className="bg-[#FFAD00] text-white px-4 py-2 rounded-md hover:bg-orange-500 transition"
                        >
                            Submit
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    {success && (
                        <div className="mt-2 flex items-center gap-2 bg-green-100 border border-green-500 text-green-700 text-sm px-4 py-2 rounded-md">
                            ✅ Comment succeed
                        </div>
                    )}
                </div>

                {comments.map((c, idx) => (
                    <div key={idx} className="mb-6 bg-[#fdf8f1] p-4 rounded">
                        <p className="font-semibold mb-1">{c.name}</p>
                        <p className="text-sm text-gray-800">{c.content}</p>
                    </div>
                ))}

                {mockAnswers.map((answer, idx) => (
                    <div key={idx} className="mb-6 bg-[#fdf8f1] p-4 rounded">
                        <p className="font-semibold mb-1">{answer.name}</p>
                        <p className="text-sm text-gray-800 mb-3">{answer.content}</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleCorrect(idx)}
                                className={`px-3 py-1 text-sm font-semibold rounded-md border transition-all ${
                                    clickedCorrects[idx]
                                        ? "bg-green-500 text-white border-none"
                                        : "bg-[#FFF1DC] text-black border-black"
                                }`}
                            >
                                Correct
                            </button>

                            <button
                                onClick={() => toggleSimple(idx)}
                                className={`px-3 py-1 text-sm font-semibold rounded-md border transition-all ${
                                    clickedSimples[idx]
                                        ? "bg-orange-500 text-white border-none"
                                        : "bg-[#FFF1DC] text-black border-black"
                                }`}
                            >
                                Simple
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostInformationPopup;