import React from "react";
import useEnhancedFetch from "./useEnhancedFetch";

/**
 * ListResponse Component
 * Displays a list of posts with caching, retry logic, and better error handling
 * 
 * Improvements over old useFetch:
 * - Automatic caching (5 min default)
 * - Retry on failure with exponential backoff
 * - Configurable timeout
 * - Request deduplication
 * - Callback support
 */
const ListResponse = () => {
  const { loading, data, error, fromCache, refetch } = useEnhancedFetch(
    "https://jsonplaceholder.typicode.com/posts",
    {
      cacheDuration: 5 * 60 * 1000,    // Cache for 5 minutes
      retries: 3,                       // Retry 3 times on failure
      timeout: 15000,                   // 15 second timeout
      onSuccess: (posts) => {
        console.log(`✅ Posts loaded: ${posts.length} items`);
      },
      onError: (error) => {
        console.error("❌ Failed to load posts:", error.message);
      },
    }
  );

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <div>⏳ Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        <div>❌ Error: {error}</div>
        <button
          onClick={refetch}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Posts</h1>
      <div style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "#666" }}>
        {fromCache && (
          <span>📦 (From cache - click refresh to get latest)</span>
        )}
      </div>
      <button
        onClick={refetch}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          backgroundColor: "#0066cc",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        🔄 Refresh
      </button>
      <ul style={{ margin: "1rem", listStyle: "none", padding: 0 }}>
        {data?.map((post) => (
          <div
            className="item"
            key={post.id}
            style={{
              padding: "1rem",
              marginBottom: "0.5rem",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
              borderLeft: "4px solid #0066cc",
            }}
          >
            <span style={{ fontWeight: "bold", color: "#0066cc" }}>
              {post.id}.
            </span>
            <span style={{ marginLeft: "0.5rem" }}>{post.title}</span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ListResponse;
