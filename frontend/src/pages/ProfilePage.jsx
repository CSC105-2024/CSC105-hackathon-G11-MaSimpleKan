import React, { useState, useEffect, useRef } from "react";
import Navbar from "../assets/Navbar.jsx";
import EditPopup from "../popup/EditPopup";
import DeletePopup from "../popup/DeletePopup";
import "../index.css";
import CreatePostPopup from "../popup/CreatePostPopup.jsx";
import PostInformationPopup from "../popup/PostInformation.jsx";
import { getAllPostFromUser } from "../api/getAllPostFromUser.js";
import { getUserLoggedIn } from "../api/getUserLoggin.js";
import { deletePost } from '../api/deletePost.js';

function Profile() {
  const subjectEnum = ["Math", "Biology", "Physics", "Chemistry", "Computer"];
  const [postsData, setPostsData] = useState([]);
  const [user, setUser] = useState(null);

  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [indexToDelete, setIndexToDelete] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const cardRefs = useRef([]);

  const postsPerPage = 8;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openMenuIndex !== null &&
        cardRefs.current[openMenuIndex] &&
        !cardRefs.current[openMenuIndex].contains(e.target)
      ) {
        setOpenMenuIndex(null);
      }
    };
    const getPostUser = async () => {
      const data = await getAllPostFromUser();
      setPostsData(() => data.data);
    };
    getPostUser();

    const getUserData = async () => {
      const res = await getUserLoggedIn();
      setUser(() => res.data);
      localStorage.setItem("userId", res.data.data);
    };
    getUserData();

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuIndex]);

  const filteredPosts = selectedSubject
    ? postsData.filter((p) => p.subject === selectedSubject)
    : postsData;

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        {showSuccess && (
          <div className="mb-6 p-3 rounded border border-green-400 bg-green-100 text-green-800 flex items-center justify-center">
            <span className="text-xl mr-2">✅</span>
            <strong>Edit succeed</strong>
          </div>
        )}

        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mb-6">
          <div
            onClick={() => setShowCreatePopup(true)}
            className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-md focus:outline-none cursor-text bg-white text-gray-500"
          >
            let’s drop the complex question
          </div>

          <div className="relative md:self-end">
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
              onClick={(e) => {
                const isMenuButton = e.target.closest(".menu-button");
                const isMenuDropdown = e.target.closest(".menu-dropdown");
                if (!isMenuButton && !isMenuDropdown) {
                  setSelectedPost(post);
                }
              }}
            >
              <div
                className="absolute top-4 right-4 text-xl text-gray-500 cursor-pointer menu-button"
                onClick={() => setOpenMenuIndex(openMenuIndex === i ? null : i)}
              >
                ⋯
              </div>

              {openMenuIndex === i && (
                <div className="menu-dropdown absolute top-10 right-1 bg-[#FAB12F] text-white rounded-md shadow-md flex flex-col items-center text-sm z-10 overflow-hidden">
                  {" "}
                  <button
                    className="px-4 py-2 w-full text-center hover:bg-white hover:text-[#FA812F] transition"
                    onClick={() => {
                      setSelectedItem({
                        ...post,
                        index: i + (currentPage - 1) * postsPerPage,
                      });
                      setShowEdit(true);
                      setOpenMenuIndex(null);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 w-full text-center hover:bg-white hover:text-[#FA812F] transition"
                    onClick={() => {
                      setIndexToDelete(i + (currentPage - 1) * postsPerPage);
                      setShowConfirm(true);
                      setOpenMenuIndex(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm mb-2">
                <span className="text-gray-600">
                  {user?.fName} {user?.sName}
                </span>
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
        {showCreatePopup && (
          <CreatePostPopup onClose={() => setShowCreatePopup(false)} />
        )}

        {selectedPost && (
          <PostInformationPopup
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}

        <EditPopup
          trigger={showEdit}
          item={selectedItem}
          onCancel={() => setShowEdit(false)}
          onSave={(updatedItem) => {
            const updated = [...postsData];
            updated[updatedItem.index] = updatedItem;
            setPostsData(updated);
            setShowEdit(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
          }}
        />

        <DeletePopup
          trigger={showConfirm}
          onCancel={() => setShowConfirm(false)}
          onConfirm={async () => {
            const itemToDelete = postsData[indexToDelete];
            const id = itemToDelete.id;

            const updated = [...postsData];
            updated.splice(indexToDelete, 1);
            setPostsData(updated);
            setShowConfirm(false);

            const res = await deletePost(id);

            if (res.success) {
              location.reload();
            } else {
              alert("Error deleting a post! Try Again!");
            }
          }}
        />
      </div>
    </div>
  );
}

export default Profile;
