import React, { useState, useEffect } from "react";
import { editPost } from "../api/editPost";

function EditPopup({ trigger, item, onCancel, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("math");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setSubject(item.subject || "");
    }
  }, [item]);

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append(
      "json",
      JSON.stringify({
        title: title,
        description: description,
        subject: subject,
      })
    );

    // console.log(title);
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }

    const res = await editPost(item.id, formData);
    if (res.success) {
      location.reload();
    } else {
      alert("Failed to EDIT");
    }
  };

  if (!trigger) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#00000033] backdrop-blur-sm z-50 px-4">
      <div className="bg-[#FFF1DC] p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xl relative">
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
              className="w-full px-4 py-2 rounded-md border bg-white border-gray-300 focus:outline-none"
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
                  {["Math", "Biology", "Physics", "Chemistry", "Computer"].map(
                    (s) => (
                      <div
                        key={s}
                        className={`px-4 py-2 cursor-pointer hover:bg-white hover:text-[#FA812F] ${
                          subject === s
                            ? "bg-white text-[#FA812F]"
                            : "text-white"
                        }`}
                        onClick={() => {
                          setSubject(s);
                          setDropdownOpen(false);
                        }}
                      >
                        {s}
                      </div>
                    )
                  )}
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
            className="w-full px-4 py-2 rounded-md border bg-white border-gray-300 focus:outline-none"
            rows={4}
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4">
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
