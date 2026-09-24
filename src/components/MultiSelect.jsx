import { useEffect, useRef, useState } from "react";
const sizeClasses = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-base",
  lg: "px-5 py-4 text-lg",
};

function MultiSelect({
  options = [],
  value = [],
  onChange,
  placeholder = "Select options",
  className = "",
  size = "md",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const allSelected = options.length > 0 && value.length === options.length;

  const handleSelect = (optionValue) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      onChange([]);
    } else {
      onChange(options.map((option) => option.value));
    }
  };

  return (
    <div ref={selectRef} className={`relative w-72 ${className}`}>
      {/* Selector button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setIsOpen(true);
          }

          if (e.key === "Escape") {
            setIsOpen(false);
          }
        }}
        className={`flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left ${sizeClasses[size]}`}
      >
        <span>
          {value.length > 0 ? `${value.length} selected` : placeholder}
        </span>

        <span
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {/* Options */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {/* Select / Deselect all */}
          <label className="flex cursor-pointer items-center gap-3 border-b px-4 py-3 font-medium hover:bg-gray-100">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAll}
            />

            <span>Select All</span>
          </label>

          {/* Individual options */}
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={value.includes(option.value)}
                  onChange={() => handleSelect(option.value)}
                />

                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiSelect;
