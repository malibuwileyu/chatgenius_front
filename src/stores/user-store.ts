import { create } from 'zustand';
import { authApi } from '../lib/api/auth';
import Cookies from 'js-cookie';

interface User {
  username: string;
  email?: string;
}

interface UserStore {
  currentUser: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => {
  // Initialize token from cookie if available
  const storedToken = typeof window !== 'undefined' ? Cookies.get('token') : null;
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  // Helper function to clear auth state
  const clearAuthState = () => {
    console.log('Clearing auth state');
    // Clear cookie first
    Cookies.remove('token', {
      path: '/',
      secure: true,
      sameSite: 'strict'
    });
    
    // Then clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Finally update store
    set({
      token: null,
      currentUser: null,
      isAuthenticated: false,
    });
  };

  // Helper function to set auth state
  const setAuthState = (token: string, userData: User) => {
    console.log('Setting auth state:', { token: token ? 'present' : 'missing', userData });
    
    // Set cookie first
    Cookies.set('token', token, {
      secure: true,
      sameSite: 'strict',
      expires: 1 // 1 day
    });
    
    // Then localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Finally update the store
    set({
      token,
      currentUser: userData,
      isAuthenticated: true,
      error: null,
    });
  };

  return {
    currentUser: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isAuthenticated: !!storedToken,
    isLoading: false,
    error: null,

    login: async (username: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        console.log('Attempting login for user:', username);
        const response = await authApi.login({ username, password });
        console.log('Login successful, storing token and user data');
        
        // Extract token and ensure it's properly formatted
        const token = response.token;
        if (!token) {
          throw new Error('No token received from server');
        }

        // Store auth state
        const userData = { username };
        setAuthState(token, userData);

        console.log('Auth state updated:', {
          token: token ? 'present' : 'missing',
          user: userData,
          isAuthenticated: true
        });
      } catch (error) {
        console.error('Login error:', error);
        clearAuthState();
        set({ error: (error as Error).message });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    register: async (username: string, email: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        console.log('Attempting registration for user:', username);
        await authApi.register({ username, email, password });
        console.log('Registration successful, proceeding to login');
        
        // After registration, automatically log in
        await get().login(username, password);
      } catch (error) {
        console.error('Registration error:', error);
        set({ error: (error as Error).message });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    logout: async () => {
      set({ isLoading: true, error: null });
      try {
        const token = get().token;
        if (token) {
          console.log('Attempting logout');
          await authApi.logout(token);
          console.log('Logout successful');
        }
        clearAuthState();
      } catch (error) {
        console.error('Logout error:', error);
        // Clear auth state even if logout fails
        clearAuthState();
        set({ error: (error as Error).message });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    refreshToken: async () => {
      const token = get().token;
      if (!token) {
        console.log('No token available for refresh');
        clearAuthState();
        return;
      }

      try {
        console.log('Attempting token refresh');
        const response = await authApi.refreshToken(token);
        console.log('Token refresh successful');
        
        // Store the new token
        const newToken = response.token;
        if (!newToken) {
          throw new Error('No token received from refresh');
        }

        // Keep the same user data but update the token
        const currentUser = get().currentUser;
        if (!currentUser) {
          throw new Error('No user data found');
        }
        setAuthState(newToken, currentUser);
      } catch (error) {
        console.error('Token refresh error:', error);
        // If token refresh fails, log out the user
        clearAuthState();
        throw error;
      }
    },
  };
}); 