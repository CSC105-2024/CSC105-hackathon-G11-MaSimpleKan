import React, { useState } from "react";

const subjects = ["Computer", "Math", "Biology", "Physics", "Chemistry"];

const CreatePostPopup = ({ onClose }) => {
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState(subjects[0]);
    const [description, setDescription] = useState("");
    const [success, setSuccess] = useState(false);

    return (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-[#FFF1DC] rounded-xl w-full max-w-3xl p-8 relative shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl text-black hover:text-[#FA812F]"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-6">Create post</h2>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Please help me with Java"
                            className="w-full px-4 py-2 rounded-md shadow text-black bg-white"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Subject</label>
                        <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-4 py-2 rounded-md shadow text-black bg-white"
                        >
                            {subjects.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="I want to pass my exam..."
                        rows={4}
                        className="w-full px-4 py-2 rounded-md shadow resize-none text-black bg-white"
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => {
                            setSuccess(true);
                            setTimeout(() => setSuccess(false), 3000); // ซ่อนแจ้งเตือนหลัง 3 วิ
                        }}
                        className="bg-[#FFAD00] hover:bg-[#f59e0b] text-white font-semibold px-6 py-2 rounded-md"
                    >
                        Post
                    </button>
                    <button
                        onClick={onClose}
                        className="border border-[#FFAD00] text-[#FFAD00] font-semibold px-6 py-2 rounded-md hover:bg-[#FFF7E6]"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostPopup;
