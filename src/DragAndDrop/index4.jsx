import { useState } from "react";

// file upload with drag and drop
const DragAndDrop = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    console.log(e.dataTransfer)
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  console.log(files)

  return (
    <div>
      <div
        className={`p-8 border-2 border-dashed rounded-xl transition-all ${
          dragActive
            ? "border-blue-400 bg-blue-50 scale-105 shadow-2xl"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {dragActive ? (
          <p className="text-blue-600 font-semibold">📁 Drop images here!</p>
        ) : (
          <p className="text-gray-500">Drag images here or click to browse</p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {files.map((file, idx) => (
          <img
            key={idx}
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-24 h-24 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
};
export default DragAndDrop

