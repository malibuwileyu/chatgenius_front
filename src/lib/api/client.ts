import { useUserStore } from '../../stores/user-store';

const API_BASE = 'http://localhost:8080/api';

interface RequestConfig extends Omit<RequestInit, 'headers'> {
  requiresAuth?: boolean;
  headers?: Record<string, string>;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient = {
  request: async <T>(endpoint: string, config: RequestConfig = {}): Promise<T> => {
    const { requiresAuth = true, headers: customHeaders = {}, ...customConfig } = config;
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      ...customHeaders,
    };

    if (customConfig.body) {
      headers['Content-Type'] = 'application/json';
    }

    // Skip auth header for refresh token endpoint
    const isRefreshRequest = endpoint === '/auth/refresh';
    if (requiresAuth && !isRefreshRequest) {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new ApiError('No authentication token found', 401);
      }
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...customConfig,
      headers,
      credentials: 'include',
    });

    // Only handle 401 for non-refresh requests
    if (response.status === 401 && !isRefreshRequest) {
      try {
        const store = useUserStore.getState();
        await store.refreshToken();
        
        const newToken = localStorage.getItem('token');
        if (!newToken) {
          throw new ApiError('Token refresh failed - no new token', 401);
        }

        headers['Authorization'] = `Bearer ${newToken}`;
        
        const retryResponse = await fetch(`${API_BASE}${endpoint}`, {
          ...customConfig,
          headers,
          credentials: 'include',
        });

        if (!retryResponse.ok) {
          throw new ApiError(
            'Request failed after token refresh',
            retryResponse.status,
            await retryResponse.text()
          );
        }

        const text = await retryResponse.text();
        return text ? JSON.parse(text) : null;
      } catch (error) {
        // If refresh fails, clear auth state and throw error
        const store = useUserStore.getState();
        store.logout();
        throw error instanceof ApiError ? error : new ApiError('Authentication failed', 401);
      }
    }

    // Handle other errors
    if (!response.ok) {
      const text = await response.text();
      throw new ApiError(text, response.status);
    }

    // Parse and return response
    try {
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    } catch (error) {
      console.error('Failed to parse response:', error);
      throw new ApiError('Invalid response format', response.status);
    }
  },

  get: <T>(endpoint: string, config: RequestConfig = {}) => {
    return apiClient.request<T>(endpoint, { ...config, method: 'GET' });
  },

  post: <T>(endpoint: string, data: any, config: RequestConfig = {}) => {
    return apiClient.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put: <T>(endpoint: string, data: any, config: RequestConfig = {}) => {
    return apiClient.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: <T>(endpoint: string, config: RequestConfig = {}) => {
    return apiClient.request<T>(endpoint, { ...config, method: 'DELETE' });
  },
}; 