import { useEffect, useRef, useState } from "react";

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-5 py-3 text-lg",
};

const directionClasses = {
  down: "top-full left-0 mt-1",
  up: "bottom-full left-0 mb-1",
  right: "left-full top-0 ml-1",
  left: "right-full top-0 mr-1",
};

function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  size = "md",
  direction = "down",
  disabled = false,
  clearable = false,
  fullWidth = true,
  required = false,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const selectRef = useRef(null);

  const widthClass = fullWidth ? "w-full" : "w-fit";

  const dropdownDirection =
    directionClasses[direction] || directionClasses.down;

  const selectedOption = options.find(
    (option) => option.value === value
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target)
      ) {
        setIsOpen(false);

        if (required && !value) {
          setError("This field is required");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [required, value]);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setError("");
  };

  const handleClear = (e) => {
    e.stopPropagation();

    onChange("");
    
    if (required) {
      setError("This field is required");
    }

    setIsOpen(false);
  };

  const handleToggle = () => {
    if (disabled) return;

    setIsOpen((prev) => !prev);

    if (error) {
      setError("");
    }
  };

  return (
    <div
      ref={selectRef}
      className={`relative ${widthClass} ${className}`}
    >
      {/* Select Button */}
      <div
        className={`relative flex w-full items-center rounded-lg border bg-white ${
          sizeClasses[size]
        } ${
          error
            ? "border-red-500"
            : "border-gray-300"
        } ${
          disabled
            ? "cursor-not-allowed bg-gray-100 opacity-60"
            : "hover:border-gray-400"
        }`}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={handleToggle}
          className="flex flex-1 items-center justify-between text-left outline-none"
          aria-required={required}
          aria-invalid={!!error}
        >
          <span
            className={
              selectedOption
                ? "text-gray-900"
                : "text-gray-400"
            }
          >
            {selectedOption?.label || placeholder}
          </span>

          <span
            className={`ml-2 transition-transform ${
              isOpen && direction === "down"
                ? "rotate-180"
                : ""
            }`}
          >
            ▼
          </span>
        </button>

        {clearable && selectedOption && (
          <button
            type="button"
            disabled={disabled}
            onClick={handleClear}
            className="ml-2 mr-2 text-gray-400 hover:text-red-500 disabled:cursor-not-allowed"
          >
            ×
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div
          className={`absolute z-50 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg ${dropdownDirection}`}
        >
          {options.length > 0 ? (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                  option.value === value
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))
          ) : (
            <p className="px-4 py-2 text-sm text-gray-400">
              No options available
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;