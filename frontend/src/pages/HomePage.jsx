import React, { useEffect, useState } from "react";
import Navbar from "./../assets/Navbar.jsx";
import CreatePostPopup from "./../popup/CreatePostPopup";
import PostInformationPopup from "./../popup/PostInformation";

// EditPopup Component
const EditPopup = ({ trigger, item, onCancel, onSave }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("Math");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (item) {
            setTitle(item.title || "");
            setDescription(item.description || "");
            setSubject(item.subject || "Math");
        }
    }, [item]);

    const handleSave = () => {
        const updatedItem = {
            ...item,
            title,
            description,
            subject,
        };
        onSave(updatedItem);
    };

    if (!trigger) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000033] backdrop-blur-sm z-50 px-4">
            <div className="bg-[#FFF1DC] p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xl relative">
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-gray-700 text-xl hover:text-red-500"
                >
                    ×
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
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="bg-[#FAB12F] text-white w-full px-4 py-2 rounded-md flex justify-between items-center"
                            >
                                {subject}
                                <span className="ml-2">{dropdownOpen ? "▲" : "▼"}</span>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute mt-1 w-full bg-[#FAB12F] rounded-md shadow-lg z-50">
                                    {["Math", "Biology", "Physics", "Chemistry", "Computer"].map((s) => (
                                        <div
                                            key={s}
                                            className={`px-4 py-2 cursor-pointer hover:bg-white hover:text-[#FA812F] ${
                                                subject === s ? "bg-white text-[#FA812F]" : "text-white"
                                            }`}
                                            onClick={() => {
                                                setSubject(s);
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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

                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4">
                    <button
                        onClick={handleSave}
                        className="bg-[#FAB12F] text-white px-5 py-2 rounded-md hover:bg-[#f89f1d]"
                    >
                        Save
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
};

// DeletePopup Component
const DeletePopup = ({ trigger, onCancel, onConfirm }) => {
    if (!trigger) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000033] backdrop-blur-sm z-50 px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md text-center relative">
                <div className="flex justify-center mb-4">
                    <div className="text-[#FAB12F] text-4xl">🗑️</div>
                </div>
                <h2 className="text-2xl font-semibold text-[#FA812F] mb-2">
                    Confirm Delete?
                </h2>
                <p className="text-gray-800 mb-6 text-sm sm:text-base">
                    Are you sure you want to delete this post?
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2 border border-[#FAB12F] text-[#FAB12F] rounded-md hover:bg-[#fff3e3] transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const subjectEnum = ["Math", "Biology", "Physics", "Chemistry", "Computer"];

const HomePage = () => {
    // Reset body styles to remove default margin/padding
    useEffect(() => {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';
        document.body.style.height = '100vh';
        document.documentElement.style.height = '100vh';
        document.getElementById('root').style.height = '100vh';
        document.getElementById('root').style.margin = '0';
        document.getElementById('root').style.padding = '0';

        return () => {
            // Cleanup when component unmounts
            document.body.style.margin = '';
            document.body.style.padding = '';
            document.documentElement.style.margin = '';
            document.documentElement.style.padding = '';
            document.body.style.height = '';
            document.documentElement.style.height = '';
            if (document.getElementById('root')) {
                document.getElementById('root').style.height = '';
                document.getElementById('root').style.margin = '';
                document.getElementById('root').style.padding = '';
            }
        };
    }, []);
    const [posts, setPosts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // States สำหรับ Edit และ Delete popups
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [deletingPost, setDeletingPost] = useState(null);

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

    // Functions สำหรับจัดการ Edit และ Delete
    const handleEdit = (post) => {
        setEditingPost(post);
        setShowEditPopup(true);
        setOpenMenuId(null);
    };

    const handleDelete = (post) => {
        setDeletingPost(post);
        setShowDeletePopup(true);
        setOpenMenuId(null);
    };

    const handleSaveEdit = (updatedPost) => {
        setPosts(prev => prev.map(post =>
            post.id === updatedPost.id ? updatedPost : post
        ));
        setShowEditPopup(false);
        setEditingPost(null);
    };

    const handleConfirmDelete = () => {
        if (deletingPost) {
            setPosts(prev => prev.filter(post => post.id !== deletingPost.id));
            setShowDeletePopup(false);
            setDeletingPost(null);
        }
    };

    const handleCancelEdit = () => {
        setShowEditPopup(false);
        setEditingPost(null);
    };

    const handleCancelDelete = () => {
        setShowDeletePopup(false);
        setDeletingPost(null);
    };

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
        <div className="absolute inset-0 bg-[#F5F5F5] overflow-auto">
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
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(q);
                                            }}
                                        >
                                            Edit
                                        </div>
                                        <div
                                            className="px-4 py-2 hover:bg-white hover:text-[#FFAD00] cursor-pointer transition rounded-md"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(q);
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

            {showEditPopup && editingPost && (
                <EditPopup
                    trigger={showEditPopup}
                    item={editingPost}
                    onCancel={handleCancelEdit}
                    onSave={handleSaveEdit}
                />
            )}

            {showDeletePopup && deletingPost && (
                <DeletePopup
                    trigger={showDeletePopup}
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default HomePage;