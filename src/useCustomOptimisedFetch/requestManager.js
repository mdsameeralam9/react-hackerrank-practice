/**
 * Request Manager - Handles caching, deduplication, retry logic, and cancellation
 * This is the core service layer for all API requests
 */

class RequestManager {
  constructor() {
    this.cache = new Map(); // Store cached responses
    this.pendingRequests = new Map(); // Avoid duplicate requests
    this.cacheTimeout = new Map(); // Track cache expiration
  }

  /**
   * Fetch data with caching, deduplication, and retry
   * @param {string} url - The API endpoint
   * @param {Object} options - Configuration options
   * @returns {Promise}
   */
  async request(url, options = {}) {
    const {
      method = 'GET',
      body = null,
      headers = {},
      timeout = 10000,
      retries = 3,
      retryDelay = 1000,
      cacheDuration = 5 * 60 * 1000, // 5 minutes default
      skipCache = false,
    } = options;

    // Create cache key from URL and method
    const cacheKey = this._generateCacheKey(url, method, body);

    // Check if data exists in cache and hasn't expired
    if (!skipCache && this._isCacheValid(cacheKey)) {
      console.log(`[Cache Hit] ${url}`);
      return { data: this.cache.get(cacheKey), fromCache: true };
    }

    // Check if request is already pending (deduplication)
    if (this.pendingRequests.has(cacheKey)) {
      console.log(`[Dedup] ${url} - Reusing pending request`);
      return this.pendingRequests.get(cacheKey);
    }

    // Create new request promise
    const requestPromise = this._performRequest(
      url,
      {
        method,
        body,
        headers,
        timeout,
        retries,
        retryDelay,
      },
      cacheKey,
      cacheDuration
    );

    // Store pending request for deduplication
    this.pendingRequests.set(cacheKey, requestPromise);

    try {
      const result = await requestPromise;
      return { data: result, fromCache: false };
    } finally {
      // Remove from pending requests after completion
      this.pendingRequests.delete(cacheKey);
    }
  }

  /**
   * Perform the actual fetch with retry logic
   */
  async _performRequest(url, options, cacheKey, cacheDuration) {
    const { retries, retryDelay } = options;
    let lastError;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const data = await this._fetchWithTimeout(url, options);

        // Cache successful response
        this.cache.set(cacheKey, data);
        this.cacheTimeout.set(
          cacheKey,
          Date.now() + cacheDuration
        );

        console.log(`[Success] ${url} (Attempt ${attempt + 1})`);
        return data;
      } catch (error) {
        lastError = error;
        console.warn(
          `[Attempt ${attempt + 1}/${retries + 1}] ${url} - ${error.message}`
        );

        // Don't retry on last attempt or on non-retriable errors
        if (attempt < retries && this._isRetriable(error)) {
          // Exponential backoff
          const delay = retryDelay * Math.pow(2, attempt);
          await this._sleep(delay);
        } else if (attempt === retries) {
          break;
        }
      }
    }

    throw lastError;
  }

  /**
   * Fetch with timeout support
   */
  _fetchWithTimeout(url, options) {
    const { timeout, method, body, headers } = options;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const fetchOptions = {
      method,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    return fetch(url, fetchOptions)
      .then(async (response) => {
        clearTimeout(timeoutId);

        if (!response.ok) {
          const error = new Error(
            `HTTP ${response.status}: ${response.statusText}`
          );
          error.status = response.status;
          error.retriable = response.status >= 500 || response.status === 408; // Retry on 5xx or 408
          throw error;
        }

        return response.json();
      })
      .catch((error) => {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
          const timeoutError = new Error('Request timeout');
          timeoutError.retriable = true;
          throw timeoutError;
        }

        throw error;
      });
  }

  /**
   * Determine if an error is retriable
   */
  _isRetriable(error) {
    if (error.retriable !== undefined) return error.retriable;

    // Retry on network errors
    if (
      error.message.includes('timeout') ||
      error.message.includes('Network')
    ) {
      return true;
    }

    return false;
  }

  /**
   * Check if cache is still valid
   */
  _isCacheValid(cacheKey) {
    if (!this.cache.has(cacheKey)) return false;

    const expirationTime = this.cacheTimeout.get(cacheKey);
    if (!expirationTime) return false;

    return Date.now() < expirationTime;
  }

  /**
   * Generate a unique cache key
   */
  _generateCacheKey(url, method, body) {
    const bodyStr = body ? JSON.stringify(body) : '';
    return `${method}:${url}:${bodyStr}`;
  }

  /**
   * Sleep utility for retry delays
   */
  _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Clear specific cache entry
   */
  clearCache(url, method = 'GET', body = null) {
    const cacheKey = this._generateCacheKey(url, method, body);
    this.cache.delete(cacheKey);
    this.cacheTimeout.delete(cacheKey);
    console.log(`[Cache Cleared] ${cacheKey}`);
  }

  /**
   * Clear all cache
   */
  clearAllCache() {
    this.cache.clear();
    this.cacheTimeout.clear();
    console.log('[All Cache Cleared]');
  }

  /**
   * Get cache stats for debugging
   */
  getCacheStats() {
    return {
      cacheSize: this.cache.size,
      pendingRequests: this.pendingRequests.size,
      cacheEntries: Array.from(this.cache.keys()),
    };
  }
}

// Singleton instance
export const requestManager = new RequestManager();

export default RequestManager;
