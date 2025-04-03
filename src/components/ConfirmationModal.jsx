import React from "react";
import Button from "./Button";

export default function ConfirmationModal({
  show,
  message,
  onConfirm,
  onCancel,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-96 rounded-lg bg-white p-6 text-center shadow-lg">
        <p className="text-black-cat mb-4 text-lg">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="text-black-cat cursor-pointer rounded-md bg-gray-100 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-gray-300"
            onClick={onCancel}
          >
            No
          </button>
          <button
            className="text-mitten-white bg-accent hover:bg-accent-dark cursor-pointer rounded-md px-4 py-2 transition-all duration-200 hover:scale-105"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
