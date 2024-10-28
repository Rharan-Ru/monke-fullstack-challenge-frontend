import React, { useEffect, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  confirmationMessage: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  confirmationMessage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(onClose, 200); // Aguardar a animação terminar antes de fechar
  };

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    onCancel();
    closeModal();
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50 transition-opacity duration-200"
            onClick={closeModal}
          ></div>
          <div className="relative bg-white rounded-lg p-6 shadow-lg transform transition-all duration-200 ease-out scale-100 sm:scale-95">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <p className="text-gray-700">{confirmationMessage}</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none transition-colors duration-200"
                onClick={handleConfirm}
              >
                Confirmar
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none transition-colors duration-200"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
