import React, { useState } from 'react';
import { type CreateChannelType } from '../../../lib/api/channels';

interface CreateChannelProps {
  onSubmit: (channelName: string, type: CreateChannelType) => Promise<void>;
  onCancel: () => void;
}

const CreateChannel: React.FC<CreateChannelProps> = ({ onSubmit, onCancel }) => {
  const [channelName, setChannelName] = useState('');
  const [channelType, setChannelType] = useState<CreateChannelType>('PUBLIC');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelName.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit(channelName, channelType);
      setChannelName('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="channelName" className="block text-sm font-medium text-gray-700">
          Channel Name
        </label>
        <input
          type="text"
          id="channelName"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="e.g. general"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Channel Type
        </label>
        <div className="mt-1 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              checked={channelType === 'PUBLIC'}
              onChange={() => setChannelType('PUBLIC')}
              disabled={isLoading}
            />
            <span className="ml-2">Public</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              checked={channelType === 'PRIVATE'}
              onChange={() => setChannelType('PRIVATE')}
              disabled={isLoading}
            />
            <span className="ml-2">Private</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          disabled={isLoading || !channelName.trim()}
        >
          {isLoading ? 'Creating...' : 'Create Channel'}
        </button>
      </div>
    </form>
  );
};

export default CreateChannel; 