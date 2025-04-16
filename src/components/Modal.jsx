import { MessageCircleWarning, X } from "lucide-react";
import React from "react";

const Modal = ({
  open = true,
  setOpen,
  title = "¿Estás seguro?",
  message = "Esta acción no se puede deshacer.",
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  icon,
}) => {
  if (!open) return null;

  const handleCancel = () => {
    setOpen(false);
    if (onCancel) onCancel();
  };

  const handleConfirm = () => {
    setOpen(false);
    if (onConfirm) onConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleCancel}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-6 flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-red-100">
            {icon || <MessageCircleWarning className="w-8 h-8 text-red-600" />}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-500">{message}</p>
          </div>
        </div>

        {/* Botones */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-2">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
          >
            {confirmText}
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
