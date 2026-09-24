import { useState } from "react";

function TagsInput({
  value = [],
  onChange,
  placeholder = "Add a tag...",
  className = "",
}) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const tag = inputValue.trim();

    if (!tag) return;

    const alreadyExists = value.some(
      (existingTag) => existingTag.toLowerCase() === tag.toLowerCase()
    );

    if (alreadyExists) {
      setError("Tag already exists");
      setInputValue("");
      return;
    }

    setError("");
    onChange([...value, tag]);
    setInputValue("");
  };

  const handleRemove = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div
      className={`flex min-h-11 flex-wrap items-center gap-2 rounded-lg border border-gray-300 p-2 focus-within:border-blue-500 ${className}`}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-700"
        >
          {tag}

          <button
            type="button"
            onClick={() => handleRemove(tag)}
            className="text-blue-700 hover:text-red-600"
          >
            ×
          </button>
        </span>
      ))}

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="min-w-32 flex-1 outline-none"
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default TagsInput;
