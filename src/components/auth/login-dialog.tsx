import React, { useState } from 'react';
import Dialog from '../ui/dialog';
import { useUserStore } from '../../stores/user-store';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose, onRegisterClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      onClose();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Login">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <button
            type="button"
            onClick={onRegisterClick}
            className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50"
          >
            Create Account
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default LoginDialog; 