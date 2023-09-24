"use client";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "@/context/Context";

const DeleteButton = ({ onDelete }) => {
    const { isConfirmOpen, setIsConfirmOpen} = useContext(Context)


  const handleDeleteClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsConfirmOpen(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleDeleteClick}
        className="bg-red-500 text-white p-2 rounded"
      >
        Delete
      </button>

      {isConfirmOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-end">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white p-2 rounded mr-2"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteButton;
