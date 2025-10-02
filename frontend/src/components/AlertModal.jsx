import React from "react";

export default function AlertModal({ title, message, onOk, onCancel }) {
  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md bg-opacity-40 flex items-center justify-center z-50">
      {/* Glassy card */}
      <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300/50 rounded-lg hover:bg-gray-400/70 transition"
          >
            Cancel
          </button>
          <button
            onClick={onOk}
            className="px-4 py-2 bg-indigo-600/80 text-white rounded-lg hover:bg-indigo-700/90 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
