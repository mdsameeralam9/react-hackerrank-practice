import React, { useState, useCallback, useMemo } from "react";
import Input from "./Input";
import PostDisplay from "./PostDisplay";

function Home() {
  const [blogData, setBlogData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Stable ID generator: avoids Math.random collisions across fast creates
  const createPost = useCallback((title, description) => {
    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title,
      description,
    };
  }, []);

  const isCreateDisabled = useMemo(() => {
    return !(title.trim() && description.trim());
  }, [title, description]);

  const saveBlog = useCallback(() => {
    if (isCreateDisabled) return;
    setBlogData(prev => [...prev, createPost(title.trim(), description.trim())]);
    setTitle("");
    setDescription("");
  }, [isCreateDisabled, createPost, title, description]);

  const handleDelete = useCallback((id) => {
    setBlogData(prev => prev.filter(blog => blog.id !== id));
  }, []);

  return (
    <div className="text-center ma-20">
      <div className="mb-20">
        <Input
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          onSubmit={saveBlog}
        />
        <button
          data-testid="create-button"
          className="mt-10"
          onClick={saveBlog}
          disabled={isCreateDisabled}
          aria-disabled={isCreateDisabled}
        >
          Create Post
        </button>
      </div>

      <div className="posts-section">
        <div data-testid="posts-container" className="flex wrap gap-10">
          <PostDisplay blogData={blogData} handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default Home;
