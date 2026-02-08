/**
 * IMPLEMENTATION PATTERNS - Real-World Scenarios
 * Copy-paste ready patterns for common use cases
 */

import useEnhancedFetch from './useEnhancedFetch';
import { apiClient, requestManager } from './apiClient';

// ============================================
// PATTERN 1: Pagination with Caching
// ============================================
export function UserTableComponent() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);

  const { data: users, loading, error } = useEnhancedFetch(
    `https://api.example.com/users?page=${page}&pageSize=${pageSize}`,
    {
      cacheDuration: 5 * 60 * 1000,
      retries: 3,
      onError: (err) => {
        console.error('Failed to load users:', err);
      },
    }
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <UserTable users={users.data} />
      <Pagination
        page={page}
        totalPages={users.pages}
        onPageChange={setPage}
      />
    </div>
  );
}

// ============================================
// PATTERN 2: Search with Debouncing & Caching
// ============================================
export function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Only fetch when debounced term changes
  const { data: results, loading, error } = useEnhancedFetch(
    debouncedTerm ? `https://api.example.com/search?q=${debouncedTerm}` : null,
    {
      enabled: !!debouncedTerm,
      cacheDuration: 10 * 60 * 1000, // Cache search results for 10 min
      timeout: 5000,
    }
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <div>Searching...</div>}
      {error && <div>Search error: {error}</div>}
      {results && (
        <ResultsList results={results} />
      )}
    </div>
  );
}

// ============================================
// PATTERN 3: Form with Auto-Save
// ============================================
export function FormWithAutoSave() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-save on interval
  useEffect(() => {
    const saveInterval = setInterval(async () => {
      if (formData.name && formData.email) {
        try {
          setIsSaving(true);
          await apiClient.put('/data/save', formData);
          setLastSaved(new Date());
          console.log('Auto-saved at', new Date().toLocaleTimeString());
        } catch (error) {
          console.error('Auto-save failed:', error);
        } finally {
          setIsSaving(false);
        }
      }
    }, 30000); // Save every 30 seconds

    return () => clearInterval(saveInterval);
  }, [formData]);

  return (
    <form>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <div>
        {isSaving && <span>Saving...</span>}
        {lastSaved && (
          <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
        )}
      </div>
    </form>
  );
}

// ============================================
// PATTERN 4: Infinite Scroll with Deduplication
// ============================================
export function InfiniteScrollList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Each page uses cache - deduplication handles multiple requests
  const { data: pageData, loading } = useEnhancedFetch(
    `https://api.example.com/items?page=${page}`,
    {
      cacheDuration: 60 * 1000,
      enabled: hasMore,
    }
  );

  useEffect(() => {
    if (pageData) {
      if (page === 1) {
        setItems(pageData.items);
      } else {
        setItems((prev) => [...prev, ...pageData.items]);
      }
      setHasMore(pageData.hasMore);
    }
  }, [pageData]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
      >
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

// ============================================
// PATTERN 5: Dependent Requests (Sequential)
// ============================================
export function DependentRequestsComponent({ userId }) {
  // First, fetch user
  const { data: user, loading: userLoading } = useEnhancedFetch(
    userId ? `https://api.example.com/users/${userId}` : null,
    { enabled: !!userId }
  );

  // Then, fetch user's posts (only when user is loaded)
  const { data: posts, loading: postsLoading } = useEnhancedFetch(
    user ? `https://api.example.com/users/${user.id}/posts` : null,
    { enabled: !!user }
  );

  // Then, fetch comments on first post (only when posts are loaded)
  const { data: comments, loading: commentsLoading } = useEnhancedFetch(
    posts && posts.length > 0
      ? `https://api.example.com/posts/${posts[0].id}/comments`
      : null,
    { enabled: !!(posts && posts.length > 0) }
  );

  if (userLoading) return <div>Loading user...</div>;
  if (postsLoading) return <div>Loading posts...</div>;
  if (commentsLoading) return <div>Loading comments...</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <Posts posts={posts} />
      <Comments comments={comments} />
    </div>
  );
}

// ============================================
// PATTERN 6: Error Recovery & Retry
// ============================================
export function ErrorRecoveryComponent() {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const { data, loading, error, refetch } = useEnhancedFetch(
    `https://api.example.com/unreliable-endpoint`,
    {
      retries: 3,
      retryDelay: 1000,
      onSuccess: () => {
        setRetryCount(0);
      },
      onError: (err) => {
        console.error(`Request failed. Retry count: ${retryCount}`);
      },
    }
  );

  const handleManualRetry = () => {
    if (retryCount < maxRetries) {
      setRetryCount((prev) => prev + 1);
      refetch();
    }
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && (
        <div>
          <p>Error: {error}</p>
          <button
            onClick={handleManualRetry}
            disabled={retryCount >= maxRetries}
          >
            Manual Retry ({retryCount}/{maxRetries})
          </button>
        </div>
      )}
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
}

// ============================================
// PATTERN 7: Poll for Updates
// ============================================
export function PollingComponent() {
  const [pollingInterval, setPollingInterval] = useState(5000);
  const [shouldPoll, setShouldPoll] = useState(true);
  const pollIntervalRef = useRef(null);

  // Custom polling hook
  const { data, refetch } = useEnhancedFetch(
    'https://api.example.com/status',
    { skipCache: true } // Don't cache polling data
  );

  useEffect(() => {
    if (shouldPoll) {
      pollIntervalRef.current = setInterval(() => {
        refetch();
      }, pollingInterval);
    }

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [shouldPoll, pollingInterval, refetch]);

  return (
    <div>
      <div>Status: {data?.status}</div>
      <label>
        <input
          type="checkbox"
          checked={shouldPoll}
          onChange={(e) => setShouldPoll(e.target.checked)}
        />
        Enable Polling
      </label>
      <input
        type="number"
        value={pollingInterval}
        onChange={(e) => setPollingInterval(parseInt(e.target.value))}
        min="1000"
        step="1000"
      />
      ms
    </div>
  );
}

// ============================================
// PATTERN 8: Multi-Select Operations
// ============================================
export function MultiSelectOperations() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBulkDelete = async () => {
    setIsProcessing(true);
    try {
      // Send batch delete request
      await apiClient.post('/items/batch-delete', {
        ids: selectedItems,
      });

      // Clear cache after successful operation
      requestManager.clearAllCache();

      // Refetch the list
      setSelectedItems([]);

      showNotification('Items deleted successfully');
    } catch (error) {
      showNotification('Deletion failed: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      {/* Render items with checkboxes */}
      <button
        onClick={handleBulkDelete}
        disabled={selectedItems.length === 0 || isProcessing}
      >
        Delete Selected ({selectedItems.length})
      </button>
    </div>
  );
}

// ============================================
// PATTERN 9: Real-time Updates with Polling
// ============================================
export function RealTimeNotifications() {
  const { data: notifications, refetch } = useEnhancedFetch(
    'https://api.example.com/notifications',
    { skipCache: true }
  );

  // Poll every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div>
      {notifications?.map((notif) => (
        <Notification key={notif.id} notification={notif} />
      ))}
    </div>
  );
}

// ============================================
// PATTERN 10: Upload with Progress
// ============================================
export async function uploadFileWithProgress(file, onProgress) {
  const formData = new FormData();
  formData.append('file', file);

  // XMLHttpRequest for progress tracking (not available in requestManager)
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        onProgress?.(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Upload error'));
    });

    xhr.open('POST', 'https://api.example.com/upload');
    xhr.send(formData);
  });
}

// ============================================
// PATTERN 11: Cache-First Strategy
// ============================================
export function CacheFirstComponent() {
  const [staleData, setStaleData] = useState(null);

  const { data, loading, error, fromCache } = useEnhancedFetch(
    'https://api.example.com/data',
    {
      cacheDuration: 60 * 60 * 1000, // Cache for 1 hour
      retries: 5,
      timeout: 15000,
    }
  );

  // Keep stale data for fallback
  useEffect(() => {
    if (data) {
      setStaleData(data);
    }
  }, [data]);

  const displayData = data || staleData;

  return (
    <div>
      {loading && !fromCache && <div>Loading fresh data...</div>}
      {fromCache && <div className="stale-indicator">Using cached data</div>}
      {error && <div>Error: {error}</div>}
      {displayData && <DataDisplay data={displayData} />}
    </div>
  );
}

// ============================================
// PATTERN 12: Global Error Boundary Setup
// ============================================
export function setupGlobalErrorHandling() {
  // Setup API client error handling
  apiClient.addErrorInterceptor(async (error) => {
    // Log error
    logErrorToSentry(error);

    // Handle specific status codes
    switch (error.status) {
      case 401:
        // Redirect to login
        window.location.href = '/login';
        break;

      case 403:
        // Show permission denied
        showNotification('You do not have permission to perform this action');
        break;

      case 429:
        // Rate limited - implement backoff
        console.warn('Rate limited - implementing backoff');
        break;

      case 500:
      case 502:
      case 503:
      case 504:
        // Server error - show friendly message
        showNotification(
          'Server error. Please try again later.'
        );
        break;

      default:
        if (error.message.includes('timeout')) {
          showNotification('Request timed out. Please try again.');
        } else if (error.message.includes('Network')) {
          showNotification('Network error. Check your connection.');
        }
    }

    throw error;
  });

  // Log all requests
  apiClient.addRequestInterceptor(async (config) => {
    console.log(`[Request] ${config.method} ${config.url}`);
    return config;
  });

  // Log all responses
  apiClient.addResponseInterceptor(async (response) => {
    console.log(`[Response] ${response.status}`);
    return response;
  });
}

export default {
  setupGlobalErrorHandling,
  uploadFileWithProgress,
};
