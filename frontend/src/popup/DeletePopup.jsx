import React from "react";

function DeletePopup({ trigger, onCancel, onConfirm }) {
    if (!trigger) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000033] backdrop-blur-sm z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center relative">
                <div className="flex justify-center mb-4">
                    <div className="text-[#FAB12F] text-4xl">🗑️</div>
                </div>
                <h2 className="text-2xl font-semibold text-[#FA812F] mb-2">
                    Confirm Delete?
                </h2>
                <p className="text-gray-800 mb-6">
                    Are you sure you want to delete this item?
                </p>
                <div className="flex justify-center gap-4">
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
}

export default DeletePopup;