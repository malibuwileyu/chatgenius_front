import React, { useState } from 'react';
import Dialog from '../ui/dialog';
import { useUserStore } from '../../stores/user-store';

interface RegisterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({ isOpen, onClose, onLoginClick }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, isLoading, error } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      onClose();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Create Account">
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
          <button
            type="button"
            onClick={onLoginClick}
            className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50"
          >
            Back to Login
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default RegisterDialog; 