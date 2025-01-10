import { apiClient } from './client';
import { jwtDecode } from 'jwt-decode';

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

interface MessageResponse {
  message: string;
}

interface JwtPayload {
  exp: number;
  iat: number;
  sub: string;
}

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    console.log('Attempting login for user:', credentials.username);
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials, {
        requiresAuth: false
      });
      console.log('Login successful');

      // Validate token expiration
      const decoded = jwtDecode<JwtPayload>(response.token);
      const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      
      if (expirationTime <= currentTime) {
        throw new Error('Received expired token from server');
      }

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  refreshToken: async (token: string): Promise<AuthResponse> => {
    console.log('Attempting token refresh');
    try {
      // Validate current token
      const decoded = jwtDecode<JwtPayload>(token);
      const expirationTime = decoded.exp * 1000;
      const currentTime = Date.now();
      
      // Don't refresh if token is not close to expiring
      if (expirationTime > currentTime + 5 * 60 * 1000) {
        console.log('Token not close to expiration, skipping refresh');
        return { token };
      }

      const response = await apiClient.post<AuthResponse>('/auth/refresh', null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Token refresh successful');

      // Validate new token
      const newDecoded = jwtDecode<JwtPayload>(response.token);
      const newExpirationTime = newDecoded.exp * 1000;
      
      if (newExpirationTime <= currentTime) {
        throw new Error('Received expired token from server');
      }

      return response;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  },

  logout: async (token: string): Promise<void> => {
    console.log('Attempting logout');
    try {
      await apiClient.post('/auth/logout', null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },

  register: async (request: RegisterRequest): Promise<void> => {
    console.log('Attempting registration for user:', request.username);
    try {
      await apiClient.post('/auth/register', request, {
        requiresAuth: false
      });
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }
}; 