import { usersApi } from './users';

export type ChannelType = 'PUBLIC' | 'PRIVATE' | 'DIRECT_MESSAGE';
export type CreateChannelType = 'PUBLIC' | 'PRIVATE';

interface UserResponse {
  id: string;
  name: string;
  createdAt: string;
}

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  createdAt: string;
  members: UserResponse[];
}

export interface CreateChannelRequest {
  name: string;
  type: CreateChannelType;
  creatorId: string;
}

export interface CreateChannelResponse {
  id: string;
  name: string;
  type: ChannelType;
  createdAt: string;
  members: UserResponse[];
}

export interface ListChannelsResponse {
  channels: Channel[];
}

const API_BASE = '/api';
const TEST_USER_ID = 'c2abd785-adbb-41ec-baf8-13395be722a2';  // Hardcoded testuser UUID

export const channelsApi = {
  list: async (): Promise<Channel[]> => {
    console.log('Fetching all channels from:', `${API_BASE}/channels`);
    try {
      const response = await fetch(`${API_BASE}/channels`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      console.log('Channel list response status:', response.status);
      const responseText = await response.text();
      console.log('Channel list raw response:', responseText);

      if (!response.ok) {
        throw new Error(`Failed to fetch channels: ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log('Parsed channel list:', data);

      // If the response is an array, use it directly; if it has a channels property, use that
      const channels = Array.isArray(data) ? data : data.channels || [];
      console.log('Final channels list:', channels);
      
      return channels;
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw error;
    }
  },

  create: async (name: string, type: CreateChannelType): Promise<Channel> => {
    const url = `${API_BASE}/channels`;
    const requestBody = { 
      name,
      type,
      creatorId: TEST_USER_ID  // Use hardcoded UUID
    };
    
    console.log('Creating channel:', {
      url,
      body: requestBody,
      method: 'POST'
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Create channel response status:', response.status);
    const responseText = await response.text();
    console.log('Create channel response:', responseText);

    if (!response.ok) {
      throw new Error(`Failed to create channel: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log('Created channel:', data);
    return data;
  },
};
