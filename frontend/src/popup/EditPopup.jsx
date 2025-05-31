import React, { useState, useEffect } from "react";

function EditPopup({ trigger, item, onCancel, onSave }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("Math");

    useEffect(() => {
        if (item) {
            setTitle(item.title);
            setDescription(item.description);
            setSubject(item.subject || "Math");
        }
    }, [item]);

    const handleEdit = () => {
        const updatedItem = {
            ...item,
            title,
            description,
            subject,
            index: item.index,
        };
        onSave(updatedItem);
    };

    if (!trigger) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-[#FFF1DC] p-8 rounded-lg shadow-lg w-full max-w-xl relative">
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-gray-700 text-xl hover:text-red-500"
                >
                    &times;
                </button>

                <h2 className="text-xl font-semibold mb-6">Edit post</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Subject</label>
                        <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
                        >
                            <option>Math</option>
                            <option>Computer</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>

                <div className="mt-6">
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
                        rows={4}
                    />
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={handleEdit}
                        className="bg-[#FAB12F] text-white px-5 py-2 rounded-md hover:bg-[#f89f1d]"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onCancel}
                        className="border border-[#FAB12F] text-[#FAB12F] px-5 py-2 rounded-md hover:bg-[#fff8ef]"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditPopup;
