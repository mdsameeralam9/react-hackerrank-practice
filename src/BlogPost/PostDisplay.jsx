import React, { memo, useCallback } from "react";

function PostDisplayBase({ blogData, handleDelete }) {
  const onDelete = useCallback((id) => () => handleDelete(id), [handleDelete]);

  if (!blogData || blogData.length === 0) {
    return (
      <div className="w-100 text-muted" data-testid="empty-state">
        No posts yet. Create the first one!
      </div>
    );
  }

  return (
    <>
      {blogData.map((blog) => (
        <div className="post-box" key={blog.id} data-testid="post-item">
          <h3 data-testid="post-title">{blog.title}</h3>
          <p data-testid="post-description">{blog.description}</p>
          <button
            onClick={onDelete(blog.id)}
            data-testid={`delete-${blog.id}`}
            aria-label={`Delete ${blog.title}`}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

// Memoize to prevent re-renders when blogData/handleDelete are referentially stable
const PostDisplay = memo(PostDisplayBase);
export default PostDisplay;
