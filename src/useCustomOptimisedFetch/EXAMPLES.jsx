/**
 * USAGE EXAMPLES - Production-Grade Data Fetching Setup
 * Shows how to use requestManager, useEnhancedFetch, and apiClient together
 */

import { useEnhancedFetch } from './useEnhancedFetch';
import { apiClient } from './apiClient';
import { requestManager } from './requestManager';

// ============================================
// EXAMPLE 1: Basic Usage with useEnhancedFetch
// ============================================
export function UserProfileComponent() {
  const { data: user, loading, error, refetch } = useEnhancedFetch(
    'https://api.example.com/user/123',
    {
      cacheDuration: 10 * 60 * 1000, // Cache for 10 minutes
      retries: 3,
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}

// ============================================
// EXAMPLE 2: Setup API Client with Interceptors
// ============================================
export function setupAPIClient() {
  // Add auth token interceptor
  apiClient.addRequestInterceptor(async (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Add response logging interceptor
  apiClient.addResponseInterceptor(async (response) => {
    console.log('[API Response]', response);
    return response;
  });

  // Add centralized error handling
  apiClient.addErrorInterceptor(async (error) => {
    if (error.status === 401) {
      // Handle unauthorized - redirect to login
      console.log('Unauthorized - redirecting to login');
      // window.location.href = '/login';
    }
    if (error.status === 429) {
      // Handle rate limiting
      console.log('Rate limited - please wait');
    }
    throw error;
  });
}

// ============================================
// EXAMPLE 3: Using API Client Directly
// ============================================
export async function createUser(userData) {
  try {
    const response = await apiClient.post('/users', userData, {
      timeout: 15000,
      retries: 2,
    });
    console.log('User created:', response);
    return response;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
}

// ============================================
// EXAMPLE 4: Conditional Fetching with enabled
// ============================================
export function UserListComponent({ userId }) {
  const { data: user, loading, error } = useEnhancedFetch(
    userId ? `https://api.example.com/users/${userId}` : null,
    {
      enabled: !!userId, // Only fetch if userId exists
      onSuccess: (data) => {
        console.log('User loaded:', data);
      },
      onError: (error) => {
        console.error('Failed to load user:', error);
      },
    }
  );

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {user && <p>{user.name}</p>}
    </div>
  );
}

// ============================================
// EXAMPLE 5: Manual Cache Management
// ============================================
export function DataCacheManager() {
  const handleClearCache = () => {
    // Clear specific cache entry
    requestManager.clearCache('https://api.example.com/users/123', 'GET');

    // Or clear all cache
    requestManager.clearAllCache();
  };

  const handleViewCacheStats = () => {
    const stats = requestManager.getCacheStats();
    console.log('Cache Statistics:', stats);
  }

  return (
    <div>
      <button onClick={handleClearCache}>Clear Cache</button>
      <button onClick={handleViewCacheStats}>View Cache Stats</button>
    </div>
  );
}

// ============================================
// EXAMPLE 6: Advanced Hook - Handling Multiple Resources
// ============================================
export function DashboardComponent() {
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
  } = useEnhancedFetch('https://api.example.com/users', {
    cacheDuration: 5 * 60 * 1000,
  });

  const {
    data: analytics,
    loading: analyticsLoading,
    error: analyticsError,
  } = useEnhancedFetch('https://api.example.com/analytics', {
    cacheDuration: 1 * 60 * 1000, // Analytics change frequently
  });

  const isLoading = usersLoading || analyticsLoading;
  const hasError = usersError || analyticsError;

  if (isLoading) return <div>Loading dashboard...</div>;
  if (hasError) return <div>Error loading dashboard</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div>Users: {users.length}</div>
      <div>Conversions: {analytics.conversions}</div>
    </div>
  );
}

// ============================================
// EXAMPLE 7: Batch Requests with Request Deduplication
// ============================================
export function UserCardlist() {
  // Multiple components requesting the same data will be deduplicated!
  const { data: userData1 } = useEnhancedFetch(
    'https://api.example.com/users/1'
  );
  const { data: userData2 } = useEnhancedFetch(
    'https://api.example.com/users/1' // Same URL - will reuse previous request!
  );
  const { data: userData3 } = useEnhancedFetch(
    'https://api.example.com/users/1' // Same URL - will reuse previous request!
  );

  return (
    <div>
      {/* All three will share the same request and cache */}
    </div>
  );
}

// ============================================
// EXAMPLE 8: Complex Mutation with Custom API Client
// ============================================
export async function complexWorkflow() {
  try {
    // Step 1: Fetch initial data
    const userData = await apiClient.get('/users/123');

    // Step 2: Transform data
    const updatedData = { ...userData, updated: true };

    // Step 3: Send updated data
    const response = await apiClient.put('/users/123', updatedData, {
      timeout: 20000,
      retries: 3,
    });

    // Step 4: Clear cache to reflect changes
    requestManager.clearCache('https://api.example.com/users/123', 'GET');

    return response;
  } catch (error) {
    console.error('Workflow failed:', error);
    throw error;
  }
}

// ============================================
// BEST PRACTICES FOR LARGE APPLICATIONS
// ============================================

/**
 * 1. SETUP API CLIENT ONCE (in main.jsx or App.jsx)
 *    - Add global interceptors
 *    - Add error handling
 *    - Add logging middleware
 */

/**
 * 2. USE CACHE WISELY
 *    - Short cache (1-5 min) for frequently changing data (analytics, feeds)
 *    - Long cache (15-60 min) for static data (user profiles, categories)
 *    - Don't cache sensitive data (passwords, tokens)
 */

/**
 * 3. REQUEST DEDUPLICATION
 *    - Automatic in requestManager
 *    - Multiple components can fetch same data without duplication
 *    - Especially useful in dashboards with many widgets
 */

/**
 * 4. ERROR HANDLING
 *    - Use error interceptors for centralized handling
 *    - Show user-friendly error messages
 *    - Retry automatically for network errors
 *    - Handle 401 (auth) and 429 (rate limit) specially
 */

/**
 * 5. MEMORY MANAGEMENT
 *    - Hook prevents memory leaks with unmount checks
 *    - AbortController cancels requests on unmount
 *    - Clear cache periodically for long-running apps
 */

/**
 * 6. PERFORMANCE
 *    - useMemo prevents unnecessary re-renders
 *    - memoized fetchData prevents infinite loops
 *    - Request deduplication saves bandwidth
 *    - Caching reduces server load
 */

export default {
  setupAPIClient,
  createUser,
  complexWorkflow,
};
