import { apiClient } from './client';

// Message types from the Java enum
export type MessageType = 'TEXT' | 'SYSTEM' | 'THREAD' | 'REPLY';

interface Message {
  id: string;
  content: string;
  channelId: string;
  userId: string;
  username: string;
  type: MessageType;
  createdAt: string;
  updatedAt?: string;
  threadId?: string;
}

interface CreateMessageRequest {
  content: string;
  type: MessageType;
}

interface MessageResponse {
  id: string;
  content: string;
  type: MessageType;
  createdAt: string;
  updatedAt?: string;
  user: {
    id: string;
    username: string;
  };
}

export const messagesApi = {
  sendMessage: async (channelId: string, content: string, type: MessageType = 'TEXT'): Promise<Message> => {
    console.log('Sending message:', { channelId, content, type });
    const requestBody: CreateMessageRequest = { 
      content,
      type
    };
    
    try {
      const response = await apiClient.post<MessageResponse>(`/channels/${channelId}/messages`, requestBody);
      console.log('Message sent successfully:', response);
      
      // Transform the response to match our Message interface
      return {
        id: response.id,
        content: response.content,
        channelId,
        userId: response.user.id,
        username: response.user.username,
        type: response.type,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt
      };
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  },

  getChannelMessages: async (channelId: string): Promise<Message[]> => {
    if (!channelId) {
      console.error('No channel ID provided to getChannelMessages');
      return [];
    }

    console.log('Fetching messages for channel:', channelId);
    try {
      const response = await apiClient.get<{ content: MessageResponse[] }>(`/channels/${channelId}/messages`);
      console.log('Received messages:', response);
      
      // Transform the response to match our Message interface
      const messages = (response.content || []).map(msg => ({
        id: msg.id,
        content: msg.content,
        channelId,
        userId: msg.user.id,
        username: msg.user.username,
        type: msg.type,
        createdAt: msg.createdAt,
        updatedAt: msg.updatedAt
      })).sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }
};
