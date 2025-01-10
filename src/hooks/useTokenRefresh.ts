import { useEffect, useCallback } from 'react';
import { useUserStore } from '../stores/user-store';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  iat: number;
  sub: string;
}

// Time before token expiration to trigger refresh (5 minutes)
const REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useTokenRefresh = () => {
  const { refreshToken, isAuthenticated } = useUserStore();

  const shouldRefreshToken = useCallback((token: string | null): boolean => {
    if (!token) return false;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const expirationTime = decoded.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;
      const tokenAge = currentTime - (decoded.iat * 1000);

      // Don't refresh if token is newly issued (within last minute)
      if (tokenAge < 60000) {
        console.log('Token is too new to refresh');
        return false;
      }

      // Only refresh if token is close to expiring but not expired
      const shouldRefresh = timeUntilExpiration > 0 && timeUntilExpiration <= REFRESH_THRESHOLD;
      if (shouldRefresh) {
        console.log('Token needs refresh:', {
          timeUntilExpiration: Math.floor(timeUntilExpiration / 1000),
          tokenAge: Math.floor(tokenAge / 1000),
        });
      }
      return shouldRefresh;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return false;
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token || !shouldRefreshToken(token)) return;

    try {
      console.log('Token close to expiration, refreshing...');
      await refreshToken();
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
  }, [refreshToken, shouldRefreshToken]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Don't do initial check immediately, wait a bit
    const initialCheckTimeout = setTimeout(handleRefresh, 1000);

    // Set up periodic checks
    const checkInterval = setInterval(handleRefresh, REFRESH_THRESHOLD / 2);

    return () => {
      clearTimeout(initialCheckTimeout);
      clearInterval(checkInterval);
    };
  }, [isAuthenticated, handleRefresh]);
}; 