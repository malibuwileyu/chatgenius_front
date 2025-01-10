import { apiClient } from './client';

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

const TEST_USER_ID = 'c2abd785-adbb-41ec-baf8-13395be722a2';  // Hardcoded testuser UUID

export const channelsApi = {
  list: async (): Promise<Channel[]> => {
    console.log('Fetching all channels');
    try {
      const response = await apiClient.get<Channel[]>('/channels');
      console.log('Received channels:', response);
      return response;
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw error;
    }
  },

  create: async (name: string, type: CreateChannelType): Promise<Channel> => {
    console.log('Creating channel:', { name, type });
    const requestBody = { 
      name,
      type,
      creatorId: TEST_USER_ID  // Use hardcoded UUID
    };
    
    try {
      const response = await apiClient.post<Channel>('/channels', requestBody);
      console.log('Created channel:', response);
      return response;
    } catch (error) {
      console.error('Error creating channel:', error);
      throw error;
    }
  },
};
