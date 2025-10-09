import React, { useCallback } from "react";

function Input({ title, description, setTitle, setDescription, onSubmit }) {
  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, [setTitle]);

  const handleDescriptionChange = useCallback((e) => {
    setDescription(e.target.value);
  }, [setDescription]);

  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "enter") {
      onSubmit?.();
    }
  }, [onSubmit]);

  return (
    <div className="layout-column justify-content-center align-items-center">
      <input
        className="w-100"
        type="text"
        name="title"
        placeholder="Enter Title"
        value={title}
        onChange={handleTitleChange}
        onKeyDown={handleKeyDown}
        data-testid="title-input"
        aria-label="Title"
      />
      <textarea
        className="mt-10 w-100"
        name="description"
        placeholder="Enter Description"
        value={description}
        onChange={handleDescriptionChange}
        onKeyDown={handleKeyDown}
        data-testid="description-input"
        aria-label="Description"
        rows={4}
      />
    </div>
  );
}

export default Input;
