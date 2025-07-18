import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { createPost } from "../api/createPost";
import { createPost } from "./../api/createPost";

const subjectEnum = ["Math", "Biology", "Physics", "Chemistry", "Computer"];

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subject: z.enum(subjectEnum),
  description: z.string().min(1, "Description is required"),
});

const CreatePostPopup = ({ onClose, onCreate }) => {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data) => {
    const realFormData = new FormData();
    realFormData.append(
      "json",
      JSON.stringify({
        title: data.title,
        description: data.description,
        subject: data.subject,
      })
    );

    for (let pair of realFormData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const res = await createPost(realFormData);

    if (res.success) {
      location.reload();
    } else {
      alert("Error creating a pet! Try Again!");
    }
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 3000);
  };

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1">Title</label>
              <input
                {...register("title")}
                placeholder="Please help me with Java"
                className="w-full px-4 py-2 rounded-md shadow bg-white text-black"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block font-semibold mb-1">Subject</label>
              <select
                {...register("subject")}
                className="w-full px-4 py-2 rounded-md shadow bg-white text-black"
              >
                {subjectEnum.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              {...register("description")}
              placeholder="I want to pass my exam..."
              rows={4}
              className="w-full px-4 py-2 rounded-md shadow resize-none bg-white text-black"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="bg-[#FFAD00] hover:bg-[#f59e0b] text-white font-semibold px-6 py-2 rounded-md"
            >
              Post
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-[#FFAD00] text-[#FFAD00] font-semibold px-6 py-2 rounded-md hover:bg-[#FFF7E6]"
            >
              Cancel
            </button>
          </div>
        </form>

        {success && (
          <div className="mt-6 text-center bg-white text-green-600 border border-green-400 px-4 py-2 rounded-md shadow">
            ✅ Create success!
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePostPopup;
