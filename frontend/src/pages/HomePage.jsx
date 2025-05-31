import React, { useEffect, useState, useRef } from "react";
import Navbar from "./../assets/Navbar.jsx";
import CreatePostPopup from "./../popup/CreatePostPopup";
import PostInformationPopup from "./../popup/PostInformation";
import EditPopup from "./../popup/EditPopup";
import DeletePopup from "./../popup/DeletePopup";

const subjectEnum = ["Math", "Biology", "Physics", "Chemistry", "Computer"];

const HomePage = () => {
    const [currentUserId, setCurrentUserId] = useState(1); // Mock current user ID

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

        // Add truncate-2-lines CSS
        const style = document.createElement('style');
        style.textContent = `
            .truncate-2-lines {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);

        return () => {
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
            document.head.removeChild(style);
        };
    }, []);

    const [posts, setPosts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
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
                userId: 1,
                subject: "Computer",
                title: "what is Hackathon?",
                description:
                    "I'm so excited for my hackathon tomorrow what should I do for preparation??",
            },
            {
                id: 2,
                name: "Natalee Chua",
                author: "Natalee Chua",
                userId: 2,
                subject: "Math",
                title: "what is SQL?",
                description:
                    "next week I have the exam but i still don't understand about this topic",
            },
            {
                id: 3,
                name: "Thomas Shen",
                author: "Thomas Shen",
                userId: 1,
                subject: "Physics",
                title: "what is velocity?",
                description: "Can someone help me understand velocity in simple terms?",
            },
            { id: 4, name: "A", author: "A", userId: 3, subject: "Biology", title: "Q1", description: "D1" },
            { id: 5, name: "B", author: "B", userId: 4, subject: "Math", title: "Q2", description: "D2" },
            { id: 6, name: "C", author: "C", userId: 5, subject: "Physics", title: "Q3", description: "D3" },
            { id: 7, name: "D", author: "D", userId: 6, subject: "Chemistry", title: "Q4", description: "D4" },
            { id: 8, name: "E", author: "E", userId: 7, subject: "Math", title: "Q5", description: "D5" },
            { id: 9, name: "F", author: "F", userId: 8, subject: "Computer", title: "Q6", description: "D6" },
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
                                className="bg-white rounded-xl shadow-md p-6 py-10 relative hover:bg-[#FFF1DC] hover:shadow-lg transition min-h-[200px]"
                                onClick={(e) => {
                                    if (!e.target.closest('.menu-button')) {
                                        setSelectedPost(q);
                                    }
                                }}
                            >
                                {/* แสดงปุ่มสามจุดเฉพาะ post ของ user ที่ login */}
                                {currentUserId && q.userId === currentUserId && (
                                    <div
                                        className="absolute top-4 right-4 text-xl text-gray-500 cursor-pointer menu-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId(openMenuId === q.id ? null : q.id);
                                        }}
                                    >
                                        ⋯
                                    </div>
                                )}

                                {openMenuId === q.id && (
                                    <div className="absolute top-10 right-1 bg-[#FAB12F] text-white rounded-md shadow-md flex flex-col items-center text-sm z-10 overflow-hidden">
                                        <button
                                            className="px-4 py-2 w-full text-center hover:bg-white hover:text-[#FA812F] transition"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(q);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-4 py-2 w-full text-center hover:bg-white hover:text-[#FA812F] transition"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(q);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 text-sm mb-2">
                                    <span className="text-gray-600">{q.author}</span>
                                    <span className="bg-[#FA812F] text-white px-2 py-0.5 text-xs rounded">
                                        {q.subject}
                                    </span>
                                </div>
                                <h2 className="font-bold text-lg mb-1">{q.title}</h2>
                                <p className="text-sm text-gray-700 truncate-2-lines">
                                    {q.description}
                                </p>
                            </div>
                        ))
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="mt-10 flex justify-center items-center gap-3">
                        {currentPage > 1 && (
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="text-xl text-[#FA812F] hover:text-[#FA4032]"
                            >
                                &lt;
                            </button>
                        )}
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
                )}
            </div>

            {showCreatePopup && (
                <CreatePostPopup
                    onClose={() => setShowCreatePopup(false)}
                    onCreate={(newPost) => {
                        setPosts((prev) => [{ ...newPost, id: prev.length + 1, userId: currentUserId, author: "Current User" }, ...prev]);
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