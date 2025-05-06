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
  confirmClassName = "bg-blue-600 text-white hover:bg-blue-500",
  cancelText = "Cancelar",
  cancelClassName = "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300",
  icon,
  iconColorBackground = "bg-blue-100",
  children,
  onClose
}) => {
  if (!open) return null;

  const handleCancel = () => {
    setOpen(false);
    if (onClose) onClose();
    if (onCancel) onCancel();
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    if (onClose) onClose();
    setOpen(false);
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
          <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full ${iconColorBackground}`}>
            {icon || <MessageCircleWarning className="w-8 h-8 text-blue-600"  />}
          </div>
          <div className="w-full">
            {children ? (
              children
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-500">{message}</p>
              </>
            )}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-2">
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded text-white ${confirmClassName}`}
          >
            {confirmText}
          </button>
          <button
            onClick={handleCancel}
            className={`px-4 py-2 rounded ${cancelClassName}`}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
