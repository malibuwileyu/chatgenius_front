'use client';
import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../stores/user-store';
import LoginDialog from './login-dialog';
import RegisterDialog from './register-dialog';

const UserMenu: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useUserStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
      window.location.href = '/login';  // Force redirect to login
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  console.log('UserMenu render state:', { isAuthenticated, currentUser });

  if (!isAuthenticated || !currentUser) {
    return (
      <>
        <button
          onClick={() => setIsLoginOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Login
        </button>
        <LoginDialog
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onRegisterClick={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
        />
        <RegisterDialog
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onLoginClick={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        <span>{currentUser.username}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl z-50">
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 