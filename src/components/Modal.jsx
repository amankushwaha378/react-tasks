import { useEffect } from "react";
function Modal({
  isOpen,
  onClose,
  title = "Modal",
  children,
  footer,
  className = "",
  overlayClassName = "",
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  size = "md",
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && closeOnEscape) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, closeOnEscape]);
  if (!isOpen) return null;
  const handleOverlayClick = (e) => {
    if (closeOnOutsideClick && e.currentTarget === e.target) {
      onClose();
    }
  };
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };
  return (
    <div
      className={` fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 ${overlayClassName} `}
      onClick={handleOverlayClick}
    >
      
      <div
        className={` w-full ${sizeClasses[size] || sizeClasses.md} max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl ${className} `}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          
          <h2 className="text-xl font-semibold text-gray-900">
            
            {title}
          </h2>
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className=" rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
            >
              
              X
            </button>
          )}
        </div>
        {/* Content */}
        <div className="px-5 py-6 text-gray-700"> {children} </div>
        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3 border-t bg-gray-50 px-5 py-4">
            
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
export default Modal;
