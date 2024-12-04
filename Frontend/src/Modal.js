import React from 'react';

function Modal({ movie, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-lg z-50 max-w-md mx-auto">
        {movie.poster && (
            <img src={movie.poster} alt={movie.title} className="w-full h-auto object-cover" />
        )}
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-gray-700">{movie.plot}</p>
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Cerrar
            </button>
        </div>
        </div>
    </div>
  );
}

export default Modal;
