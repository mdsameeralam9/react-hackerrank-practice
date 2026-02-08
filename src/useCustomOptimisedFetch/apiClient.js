/**
 * Advanced API Client - Enterprise-grade HTTP client with interceptors
 * Supports: middleware, request/response interceptors, error handling, logging
 */

class APIClient {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
    this.errorInterceptors = [];
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Add request interceptor (for adding auth tokens, logging, etc.)
   */
  addRequestInterceptor(handler) {
    this.requestInterceptors.push(handler);
    return () => {
      this.requestInterceptors = this.requestInterceptors.filter(
        (h) => h !== handler
      );
    };
  }

  /**
   * Add response interceptor (for handling responses, logging, etc.)
   */
  addResponseInterceptor(handler) {
    this.responseInterceptors.push(handler);
    return () => {
      this.responseInterceptors = this.responseInterceptors.filter(
        (h) => h !== handler
      );
    };
  }

  /**
   * Add error interceptor (for centralized error handling)
   */
  addErrorInterceptor(handler) {
    this.errorInterceptors.push(handler);
    return () => {
      this.errorInterceptors = this.errorInterceptors.filter(
        (h) => h !== handler
      );
    };
  }

  /**
   * Execute request interceptors
   */
  async _executeRequestInterceptors(config) {
    let modifiedConfig = { ...config };

    for (const interceptor of this.requestInterceptors) {
      modifiedConfig = await interceptor(modifiedConfig);
    }

    return modifiedConfig;
  }

  /**
   * Execute response interceptors
   */
  async _executeResponseInterceptors(response) {
    let modifiedResponse = response;

    for (const interceptor of this.responseInterceptors) {
      modifiedResponse = await interceptor(modifiedResponse);
    }

    return modifiedResponse;
  }

  /**
   * Execute error interceptors
   */
  async _executeErrorInterceptors(error) {
    let modifiedException = error;

    for (const interceptor of this.errorInterceptors) {
      try {
        modifiedException = await interceptor(modifiedException);
      } catch (err) {
        modifiedException = err;
      }
    }

    throw modifiedException;
  }

  /**
   * Main fetch method
   */
  async fetch(endpoint, options = {}) {
    const url = this.baseURL ? `${this.baseURL}${endpoint}` : endpoint;

    let config = {
      url,
      method: options.method || 'GET',
      headers: { ...this.defaultHeaders, ...options.headers },
      body: options.body,
      timeout: options.timeout || 10000,
      ...options,
    };

    // Execute request interceptors
    config = await this._executeRequestInterceptors(config);

    const {
      method,
      headers,
      body,
      timeout,
      retries = 3,
      retryDelay = 1000,
      ...restConfig
    } = config;

    let lastError;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          method,
          headers,
          body:
            body && typeof body === 'object' ? JSON.stringify(body) : body,
          signal: controller.signal,
          ...restConfig,
        });

        clearTimeout(timeoutId);

        let responseData = await this._parseResponse(response);

        // Execute response interceptors
        responseData = await this._executeResponseInterceptors(responseData);

        if (!response.ok) {
          const error = new Error(
            responseData.message || `HTTP ${response.status}`
          );
          error.status = response.status;
          error.data = responseData;
          error.retriable = response.status >= 500 || response.status === 408;
          throw error;
        }

        return responseData;
      } catch (error) {
        lastError = error;

        if (error.name === 'AbortError') {
          lastError = new Error('Request timeout');
          lastError.retriable = true;
        }

        console.warn(
          `[API Error - Attempt ${attempt + 1}/${retries + 1}] ${url}:`,
          error.message
        );

        if (attempt < retries && this._isRetriable(lastError)) {
          const delay = retryDelay * Math.pow(2, attempt);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else if (attempt === retries) {
          break;
        }
      }
    }

    // Execute error interceptors
    await this._executeErrorInterceptors(lastError);
  }

  /**
   * Parse response based on content-type
   */
  async _parseResponse(response) {
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      return response.json();
    } else if (contentType.includes('text')) {
      return { data: await response.text() };
    } else {
      return { data: response };
    }
  }

  /**
   * Check if error is retriable
   */
  _isRetriable(error) {
    if (error.retriable !== undefined) return error.retriable;
    if (error.message.includes('timeout')) return true;
    if (error.message.includes('Network')) return true;
    return false;
  }

  /**
   * Convenience methods
   */
  get(endpoint, options = {}) {
    return this.fetch(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, body, options = {}) {
    return this.fetch(endpoint, { ...options, method: 'POST', body });
  }

  put(endpoint, body, options = {}) {
    return this.fetch(endpoint, { ...options, method: 'PUT', body });
  }

  patch(endpoint, body, options = {}) {
    return this.fetch(endpoint, { ...options, method: 'PATCH', body });
  }

  delete(endpoint, options = {}) {
    return this.fetch(endpoint, { ...options, method: 'DELETE' });
  }
}

// Create and export a singleton instance
export const apiClient = new APIClient();

export default APIClient;
