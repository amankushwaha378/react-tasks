import { useRef, useState } from "react";

function ImageUpload({ multiple = true, maxImages = 5, maxSize = 5 }) {
  const inputRef = useRef(null);

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (!selectedFiles.length) {
      return;
    }

    const validationErrors = [];
    const validFiles = [];

    const maxSizeInBytes = maxSize * 1024 * 1024;

    for (const file of selectedFiles) {
      if (!allowedTypes.includes(file.type)) {
        validationErrors.push(
          `${file.name}: Only JPG, PNG and WEBP images are allowed.`
        );

        continue;
      }

      if (file.size > maxSizeInBytes) {
        validationErrors.push(
          `${file.name}: Image size must be ${maxSize} MB or less.`
        );

        continue;
      }

      validFiles.push(file);
    }

    if (!multiple) {
      if (validFiles.length === 0) {
        setErrors(validationErrors);
        e.target.value = "";
        return;
      }

      if (images.length > 0) {
        URL.revokeObjectURL(images[0].preview);
      }

      const file = validFiles[0];

      const newImage = {
        file,
        preview: URL.createObjectURL(file),
      };

      setImages([newImage]);
      setErrors(validationErrors);

      e.target.value = "";

      return;
    }

    const uniqueFiles = validFiles.filter((file) => {
      const alreadyExists = images.some(
        (image) =>
          image.file.name === file.name &&
          image.file.size === file.size &&
          image.file.lastModified === file.lastModified
      );

      return !alreadyExists;
    });

    const remainingSlots = maxImages - images.length;

    if (remainingSlots <= 0) {
      validationErrors.push(`You can upload a maximum of ${maxImages} images.`);

      setErrors(validationErrors);

      e.target.value = "";

      return;
    }

    const filesToAdd = uniqueFiles.slice(0, remainingSlots);

    if (uniqueFiles.length > remainingSlots) {
      validationErrors.push(`You can upload a maximum of ${maxImages} images.`);
    }

    const newImages = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    setErrors(validationErrors);

    e.target.value = "";
  };

  const handleRemove = (index) => {
    setImages((prev) => {
      const imageToRemove = prev[index];

      URL.revokeObjectURL(imageToRemove.preview);

      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="w-full max-w-3xl">
      {/* File Input */}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Button */}

      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="w-full rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-blue-500 hover:bg-blue-50"
      >
        <p className="font-semibold text-gray-700">
          Click to upload {multiple ? "images" : "an image"}
        </p>

        <p className="mt-2 text-sm text-gray-500">JPG, PNG or WEBP</p>

        <p className="mt-1 text-xs text-gray-400">
          Maximum {maxSize} MB per image
          {multiple && ` • Maximum ${maxImages} images`}
        </p>
      </button>

      {/* Errors */}

      {errors.length > 0 && (
        <div className="mt-4 space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={image.preview}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md"
            >
              <img
                src={image.preview}
                alt={`Preview ${index + 1}`}
                className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />

              {/* Remove Button */}

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-sm text-white opacity-0 transition group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
