import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { requestManager } from './requestManager';

/**
 * Enhanced useFetch Hook - Production-grade data fetching
 * Features: Caching, Request Deduplication, Retry Logic, Cancellation, Timeout
 */
const useEnhancedFetch = (url, options = {}) => {
  const [loading, setLoading] = useState(!requestManager.cache.has(url));
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);
  const mountedRef = useRef(true);

  const {
    method = 'GET',
    body = null,
    headers = {},
    timeout = 10000,
    retries = 3,
    retryDelay = 1000,
    cacheDuration = 5 * 60 * 1000,
    skipCache = false,
    enabled = true, // Conditionally enable/disable the hook
    onSuccess = null, // Callback on success
    onError = null, // Callback on error
  } = options;

  // Track if component is still mounted to prevent state updates on unmounted components
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchData = useCallback(async () => {
    if (!enabled || !url) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await requestManager.request(url, {
        method,
        body,
        headers,
        timeout,
        retries,
        retryDelay,
        cacheDuration,
        skipCache,
      });

      // Only update state if component is still mounted
      if (mountedRef.current) {
        setData(result.data);
        setFromCache(result.fromCache);
        setError(null);

        // Call success callback
        if (onSuccess) {
          onSuccess(result.data);
        }
      }
    } catch (err) {
      if (mountedRef.current) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch data';
        setError(errorMessage);
        setData(null);

        // Call error callback
        if (onError) {
          onError(err);
        }
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [url, method, body, headers, timeout, retries, retryDelay, cacheDuration, skipCache, enabled, onSuccess, onError]);

  // Fetch data on mount and when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Manually refresh data
  const refetch = useCallback(() => {
    requestManager.clearCache(url, method, body);
    fetchData();
  }, [url, method, body, fetchData]);

  // Memoize return object
  return useMemo(
    () => ({
      data,
      loading,
      error,
      fromCache,
      refetch,
      cacheStats: requestManager.getCacheStats(),
    }),
    [data, loading, error, fromCache]
  );
};

export default useEnhancedFetch;
